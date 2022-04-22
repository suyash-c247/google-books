import { Router } from "express";
import userRouter from "./user/index.js";

const router = Router();

router.use("/", userRouter);

export default router;
