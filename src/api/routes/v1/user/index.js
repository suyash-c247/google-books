import { Router } from "express";
import { validateToken } from "../../../middlewares/user.auth.js";
import authGoogleRouter from "./auth.google.js";
import authRouter from "./auth.js";
import chartRouter from "./chart.js";
import searchRouter from "./search.js";

const userRouter = Router();

userRouter.use('/', authGoogleRouter);
userRouter.use('/user', authRouter);
userRouter.use('/user',validateToken, searchRouter);
userRouter.use('/chart',chartRouter)



export default userRouter;