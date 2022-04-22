import { body } from "express-validator";
import userModels from "../databsase/models/userModels.js";
import bcrypt from "bcryptjs";
export const loginValidation = [
  body("firstName").not().isEmpty().withMessage("First name is required"),
  body("lastName").not().isEmpty().withMessage("Last name is required"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter valid email address.")
    .trim(),
  body("providerId")
    .not()
    .isEmpty()
    .withMessage("ProviderId is required")
    .isLength({ min: 6 })
    .withMessage("ProviderId must be at least 6 Number long."),
  body("providerType").not().isEmpty().withMessage("ProviderType is required"),
];


