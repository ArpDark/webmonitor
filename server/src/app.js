import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import jwt from "jsonwebtoken";
// import {supabase} from "./db/dbConnect.js";
// import bcrypt from "bcryptjs";
import { verifyUser } from "./middlewares/auth.js";
import authRoute from "./routes/auth.route.js";
import addWebsiteRoute from "./routes/addwebsite.route.js";
import getWebsiteRoute from "./routes/getwebsite.route.js";

const app=express();
console.log(process.env.CORS_ORIGIN);

const corsOptions ={
    origin:process.env.CORS_ORIGIN, 
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true , limit:"16kb"}));
app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.send("Welcome to backend");
})

app.use("/api/auth", authRoute);
app.use("/api", addWebsiteRoute);
app.use("/api", getWebsiteRoute);


export { app };