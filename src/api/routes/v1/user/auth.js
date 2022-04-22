import express from "express";
import authController from "../../../controllers/auth.js";
import { handleValidationErrors } from "../../../middlewares/validation.js";
import { userCheckout } from "../../../validators/checkout.js";
import {
  loginValidation,
} from "../../../validators/user.auth.js";

const authRouter = express.Router();

authRouter.post(
  "/login",
  loginValidation,
  handleValidationErrors,
  authController.loginAction
);

export default authRouter;
