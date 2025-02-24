import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/Mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import authRouter from './routes/AuthRoutes.js';
import cookieParser from 'cookie-parser';
import organizerRoutes from "./routes/organizer.router.js";
import hackathonRoutes from "./routes/hackathon.router.js";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import userRouter from './routes/userRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.use(express.json());
app.use(cookieParser());


const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, 
  })
);


app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/organizers', organizerRoutes);
app.use('/hackathons', hackathonRoutes);


app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});


app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});


const startServer = async () => {
  try {
    await connectDB();
    await connectCloudinary();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
};

startServer();
