import express from "express";
import { monitorWebsite } from "../controllers/monitor.controller.js";
const  router=express.Router();

router.post("/monitorwebsite",monitorWebsite);

export default router;