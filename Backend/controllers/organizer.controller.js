import Organizer from "../models/Organizers.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const registerOrganizer = async (req, res) => {
    try {
        const { username, name, email, password } = req.body;

        
        const existingOrganizer = await Organizer.findOne({ email });
        if (existingOrganizer) {
            return res.status(400).json({ message: "Email already registered" });
        }

        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

       
        const newOrganizer = new Organizer({
            username,
            name,
            email,
            password: hashedPassword
        });

        await newOrganizer.save();

        // Generate JWT token
        const token = jwt.sign(
            { id: newOrganizer._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({
            message: "Organizer registered successfully",
            token,
            organizer: {
                id: newOrganizer._id,
                username: newOrganizer.username,
                name: newOrganizer.name,
                email: newOrganizer.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const loginOrganizer = async (req, res) => {
    try {
        const { email, password } = req.body;

        
        const organizer = await Organizer.findOne({ email });
        if (!organizer) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        
        const isMatch = await bcrypt.compare(password, organizer.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        
        const token = jwt.sign(
            { id: organizer._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            organizer: {
                id: organizer._id,
                username: organizer.username,
                name: organizer.name,
                email: organizer.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};