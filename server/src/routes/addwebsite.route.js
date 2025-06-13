import express from "express";
import { addWebsite } from "../controllers/addwebsite.controller.js";
const  router=express.Router();

router.post("/addwebsite",addWebsite);

export default router;