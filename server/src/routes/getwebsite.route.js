import express from "express";
import { getWebsite } from "../controllers/getwebsite.controller.js";
const  router=express.Router();

router.get("/getwebsites",getWebsite);

export default router;