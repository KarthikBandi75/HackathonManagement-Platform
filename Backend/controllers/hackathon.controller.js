
import Hackathon from "../models/Hackathon.js";
import Organizer from "../models/Organizers.js";
import { v2 as cloudinary } from 'cloudinary'

export const createHackathon = async (req, res) => {
    try {
        const { organizerId, title, description, problemStatement, teamSize, startDate, endDate,location } = req.body;

        // Check if organizer exists
        const organizer = await Organizer.findById(organizerId);
        if (!organizer) {
            return res.status(404).json({ message: 'Organizer not found' });
        }

        // Create hackathon
        const newHackathon = new Hackathon({
            title,
            description,
            problemStatement,
            teamSize,
            startDate,
            endDate,
            location
        });

        await newHackathon.save();

        // Link hackathon to organizer
        organizer.hackathons.push(newHackathon._id);
        await organizer.save();

        res.status(201).json({ message: 'Hackathon created and linked to organizer', hackathon: newHackathon });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getHackathonsByOrganizer = async (req, res) => {
    try {
        const { organizerId } = req.params;
        const organizer = await Organizer.findById(organizerId).populate('hackathons');
        
        if (!organizer) {
            return res.status(404).json({ message: 'Organizer not found' });
        }
        
        res.status(200).json(organizer.hackathons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getHackathons = async (req, res) => {
    try {
        const hackathons = await Hackathon.find();
        res.status(200).json(hackathons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getHackathonById = async (req, res) => {
    try {
        const { id } = req.params;
        const hackathon = await Hackathon.findById(id);
        if (!hackathon) {
            return res.status(404).json({ message: 'Hackathon not found' });
        }
        res.status(200).json(hackathon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateHackathon = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedHackathon = await Hackathon.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedHackathon) {
            return res.status(404).json({ message: 'Hackathon not found' });
        }
        res.status(200).json({ message: 'Hackathon updated successfully', hackathon: updatedHackathon });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const deleteHackathon = async (req, res) => {
    try {
        const { id } = req.params;
        const hackathon = await Hackathon.findByIdAndDelete(id);
        if (!hackathon) {
            return res.status(404).json({ message: 'Hackathon not found' });
        }

        
        await Organizer.updateMany(
            { hackathons: id },
            { $pull: { hackathons: id } }
        );

        res.status(200).json({ message: 'Hackathon deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};