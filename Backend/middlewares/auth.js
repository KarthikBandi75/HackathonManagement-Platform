import jwt from "jsonwebtoken";
import Organizer from "../models/Organizers.js";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }
       
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.organizerId = decoded.id;

        
        const organizer = await Organizer.findById(req.organizerId);
        if (!organizer) {
            return res.status(401).json({ message: "Organizer not found, authorization denied" });
        }

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};