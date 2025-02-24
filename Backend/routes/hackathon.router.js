import express from "express";
import { 
    createHackathon, 
    getHackathons, 
    getHackathonById, 
    updateHackathon, 
    deleteHackathon, 
    getHackathonsByOrganizer 
} from "../controllers/hackathon.controller.js";
import { hackathonValidation } from "../utils/validations.js";
import { validationResultHandler } from "../utils/validationResultHandler.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// Create a new hackathon - Protected Route
router.post('/', verifyToken, hackathonValidation, validationResultHandler, createHackathon);

// Get all hackathons
router.get('/', getHackathons);

// Get all hackathons by an organizer - Protected Route
router.get('/organizer/:organizerId', verifyToken, getHackathonsByOrganizer);

// Get a single hackathon by ID
router.get('/:id', getHackathonById);

// Update a hackathon - Protected Route
router.put('/:id', verifyToken, hackathonValidation, validationResultHandler, updateHackathon);

// Delete a hackathon - Protected Route
router.delete('/:id', verifyToken, deleteHackathon);

export default router;