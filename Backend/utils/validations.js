
import { body } from 'express-validator';

//Registration Validation
export const registerValidation = [
    body('username')
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    
    body('name')
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
    
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

// Login Validation
export const loginValidation = [
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
    
    body('password')
        .notEmpty().withMessage('Password is required')
];


// Hackathon Validations
export const hackathonValidation = [
    body('organizerId').notEmpty().withMessage('organizerId is required'),
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('problemStatement').notEmpty().withMessage('Problem statement is required'),
    body('teamSize').isInt({ min: 1 }).withMessage('Team size must be at least 1'),
    body('startDate').notEmpty().withMessage('Start date is required').isISO8601().toDate().withMessage('Invalid date format'),
    body('endDate').notEmpty().withMessage('End date is required').isISO8601().toDate().withMessage('Invalid date format'),
    body('location').notEmpty().withMessage('Location is required'),
];