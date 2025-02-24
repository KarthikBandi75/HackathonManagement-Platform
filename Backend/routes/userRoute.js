import express from 'express';
import { getProfile,hackathondetails,hackathonslist,isAlreadyRegistered,myregistrations,register,submit,updateProfile  } from '../controllers/userController.js';
import {authUser} from '../middlewares/authUser.js';
import upload from '../middlewares/Multer.js';

const userRouter=express.Router();

userRouter.get('/get-profile',authUser,getProfile);
userRouter.get('/isAlreadyRegistered', authUser, isAlreadyRegistered);
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile);
userRouter.get('/all-hackathons',authUser,hackathonslist);
userRouter.get("/view-hackathon/:id",hackathondetails);
userRouter.post("/register",authUser,register);
userRouter.post("/submit" ,authUser,submit);
userRouter.get("/my-registrations",authUser,myregistrations);

export default userRouter;