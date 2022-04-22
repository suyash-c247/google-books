import express from "express";
import authController from "../../../controllers/user.auth.js";

const authGoogleRouter = express.Router();

authGoogleRouter.get("/auth/google", authController.loginWithGoogle)
authGoogleRouter.get("/auth/google/callback", authController.loginAction)


export default authGoogleRouter;
