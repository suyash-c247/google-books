import express from "express";
import authController from "../../../controllers/auth.js";
import { details, search } from "../../../controllers/search.js";
import { validateToken } from "../../../middlewares/user.auth.js";

const searchRouter = express.Router();

searchRouter.get("/search", search);
searchRouter.get("/details/:id", details);

export default searchRouter;
