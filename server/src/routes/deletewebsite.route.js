import express from "express";
import { deleteWebsite } from "../controllers/deletewebsite.controller.js";
const  router=express.Router();

router.delete("/deletewebsite",deleteWebsite);

export default router;