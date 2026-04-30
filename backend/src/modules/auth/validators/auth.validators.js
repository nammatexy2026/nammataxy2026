import { body } from 'express-validator';

export const adminLoginValidator = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

export const requestOtpValidator = [
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
];

export const verifyOtpValidator = [
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required'),
  body('code')
    .trim()
    .notEmpty()
    .withMessage('OTP code is required')
];

export const driverLoginValidator = [
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('password').notEmpty().withMessage('Password/PIN is required'),
];
