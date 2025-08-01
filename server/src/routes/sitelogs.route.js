import express from "express";
import { siteLogs } from "../controllers/sitelogs.controller.js";
const  router=express.Router();

router.get("/sitelogs/:id",siteLogs);

export default router;