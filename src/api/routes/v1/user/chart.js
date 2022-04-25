import express from "express";
import { chart } from "../../../controllers/chart.js";

const chartRouter = express.Router();

chartRouter.post("/" ,chart);

export default chartRouter;
