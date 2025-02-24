
import express from "express";
import { registerOrganizer, loginOrganizer } from "../controllers/organizer.controller.js";
import { registerValidation, loginValidation } from "../utils/validations.js";
import { validationResultHandler } from "../utils/validationResultHandler.js";

const router = express.Router();

router.post('/register', registerValidation, validationResultHandler, registerOrganizer);


router.post('/login', loginValidation, validationResultHandler, loginOrganizer);

export default router;