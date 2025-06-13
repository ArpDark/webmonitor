import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import {supabase} from "./db/dbConnect.js";
import bcrypt from "bcryptjs";
import { verifyUser } from "./middlewares/auth.js";
import registerRoute from "./routes/register.route.js";
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

app.use("/api/auth", registerRoute);
app.post("/register",(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            res.status(500).send("Error occured while generating salt for password. Try again!!");
        }
        else{
            bcrypt.hash(password,salt,async(err,hash)=>{
                if(err){
                    res.status(500).send("Error occured while hashing password. Try again!!");
                }
                else{
                    const data = await supabase.from('users').insert({ email:email , password: hash });
                    console.log(data);
                    console.log(data.status);
                    if(data.status===201)
                    {
                        jwt.sign({ email: email },process.env.PRIVATE_KEY, { algorithm: 'RS256', expiresIn:"7d" },(err, token)=> {
                            if(err){
                                console.log(err);
                                res.status(500).send("Error while signing jwt");
                            }
                            else{
                                console.log(token);
                                res.cookie('token', token, {
                                    httpOnly: true, 
                                    secure: false, // Use `true` in production (requires HTTPS)
                                    sameSite: 'Strict', 
                                    maxAge:7 * 24 * 60 * 60 * 1000,
                                });
                                res.json({message:"User created"});
                            }
                        });
                    }
                    else
                    {
                        res.status(data.status).json({message:data.statusText});
                    }
                    // console.log("New user created");
                    // res.status(data.status).send("data.statusText");
                }
            });
        }
    });
});
app.post("/login",async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const response = await supabase.from('users').select().eq('email',email);
    bcrypt.compare(password,response.data[0].password,(err,data)=>{
        if(err){
            res.status(500).json({message:"Server Error"});
        }
        else{
            if(data==true){
                jwt.sign({ email: email },process.env.PRIVATE_KEY, { algorithm: 'RS256', expiresIn:"7d" },(err, token)=> {
                    if(err){
                        console.log(err);
                        res.status(500).send("Error while signing jwt");
                    }
                    else{
                        console.log(token);
                        res.cookie('token', token, {
                            httpOnly: true, 
                            secure: false, // Use `true` in production (requires HTTPS)
                            sameSite: 'Strict', 
                            maxAge:7 * 24 * 60 * 60 * 1000,
                        });
                        res.status(200).json({message:"password matched"});
                    }
                });
            }
            else{
                res.status(401).json({message:"Wrong Password"});
            }
        }
    });
});

app.get("/auth",async(req,res)=>{
    const data=await verifyUser(req,res);
    if(data.status===200)
    {
        res.status(200).json({message:"User verified"});
    }
    else
    {
        res.status(data.status).json({message:"User not verified"});
    }
});

app.post("/addwebsite",async(req,res)=>{
    const website=req.body.website;
    const interval=req.body.interval;
    
    console.log(website+" "+interval);
    const data=await verifyUser(req,res);
    console.log(data.data);
    const date=new Date().toISOString();
    console.log(date);
    
    // res.status(200).json({message:"data received successfully"});
    if(data.status===200){
            const checkRes=await supabase.from('websites').select().eq('website',website).eq('user_email', data.data);
            console.log(checkRes);
            
            if(checkRes.data.length === 0){
                const response = await supabase.from('websites').insert({ website:website ,user_email: data.data, interval:interval, created_at: date, last_checked:date });
                console.log(response);
                res.status(200).json("done");
            }
            else{
                res.status(400).json({message:"Data already exists"})
            }

        }
        else{
        res.status(data.status).json({message:"data not added due to error"});
    }
    
});

app.get("/getwebsites",async(req,res)=>{
    const data=await verifyUser(req,res);
    console.log(data.data);
    if(data.status===200){
        const response = await supabase.from('websites').select().eq('user_email',data.data);
        // console.log(response.data[0].websites);
        // console.log(response.data[1].websites);
        console.log(response);
        
        res.status(200).send(response.data);
    }
    else{
        res.status(data.status).json({message:"data not fetched"});
    }
    
});

app.get("/logout",(req,res)=>{
    // const token=req.cookies.token;
    res.clearCookie('token', { httpOnly: true, secure: false });

    res.status(200).send("Logged out");
});


export { app };