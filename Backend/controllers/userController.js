import validator from 'validator';
import bcrypt from "bcrypt"; 
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import Hackathon from '../models/Hackathon.js';
import { Registration } from '../models/RegistrationModel.js';
import { Submission } from '../models/SubmissionModel.js';



//API for UserProfile

const getProfile = async (req, res) => {
    try {
      const userId = req.userId; 
      const userData = await userModel.findById(userId).select('-password');
  
      if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      res.json({ success: true, userData });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ success: false, message: "Error while fetching user profile" });
    }
  };
  
//API for UserUpdate

const updateProfile = async (req, res) => {
    try {
        const userId = req.userId;  
        const { name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        

        if (!name || !phone || !address || !dob || !gender) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const parsedAddress = JSON.parse(address); 
        await userModel.findByIdAndUpdate(userId, { name, phone, address: parsedAddress, dob, gender });

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
            const imageUrl = imageUpload.secure_url;
            await userModel.findByIdAndUpdate(userId, { image: imageUrl });
        }

        res.json({ success: true, message: "Profile updated successfully" });
    } catch (error) {
        console.error("Error while updating user profile:", error);
        res.status(500).json({ success: false, message: "Error while updating user profile" });
    }
};

const hackathonslist = async (req, res) => {
  try {
      const hackathons = await Hackathon.find();
      res.status(200).json(hackathons);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const hackathondetails = async (req, res) => {
  try {
    const { id } = req.params; 
    const hackathon = await Hackathon.findById(id); 

    if (!hackathon) {
      return res.status(404).json({ error: "Hackathon not found" });
    }

    res.status(200).json(hackathon);
  } catch (error) {
    console.error("Error fetching hackathon details:", error);
    res.status(500).json({ error: "Error while fetching hackathon details" });
  }
};



const register=async (req,res)=>{
  try {
    const { hackathonId, teamName, teamLead, teamMembers } = req.body;
    const userId = req.userId; 
    const registration = new Registration({
      hackathonId,
      teamName,
      teamLead,
      teamMembers,
      userId,
    });

    await registration.save();
    res.status(201).json({ message: "Successfully registered for the hackathon", registration });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const submit= async(req,res)=>{
 
  try {
    const { hackathonId, registrationId, projectDetails } = req.body;
    const userId = req.userId;

    const submission = new Submission({
      hackathonId,
      registrationId,
      projectDetails,
      userId,
    });

    await submission.save();
    res.status(201).json({ message: "Project submitted successfully", submission });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const isAlreadyRegistered = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    // Check if the user is already registered
    const isRegistered = await Registration.findOne({ teamLead: user._id });
    if (isRegistered) {
      return res.status(200).json({ message: "User is already registered", success: true });
    }

    // If no registration found
    res.status(200).json({ message: "User is not registered", success: false });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const myregistrations=async (req,res)=>{
  try 
  {
    const userId = req.userId;
    
    const registrations = await Registration.find({ userId }).populate("hackathonId");
   
    res.status(200).json({ registrations });
  } 
  catch (error) 
  {
    res.status(500).json({ message: error.message });
  }
}

export {getProfile,updateProfile,hackathonslist,hackathondetails,register,submit,myregistrations,isAlreadyRegistered};