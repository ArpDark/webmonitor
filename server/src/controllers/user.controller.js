import bcrypt from "bcryptjs";
import { supabase } from "../db/dbConnect.js";
import { generateToken } from "../utils/jwt.util.js";
import { verifyUser } from "../middlewares/auth.js";

export const registerUser=(req,res)=>{
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
                    if(data.status===201){
                        const token=await generateToken({ email: email });
                        console.log(token);
                        res.cookie('token', token, {
                            httpOnly: true, 
                            secure: false, // Use `true` in production (requires HTTPS)
                            sameSite: 'Strict', 
                            maxAge:7 * 24 * 60 * 60 * 1000,
                        });
                        res.json({message:"User created"});
                    }
                    else{
                        res.status(data.status).json({message:data.statusText});
                    }
                    // console.log("New user created");
                    // res.status(data.status).send("data.statusText");
                }
            });
        }
    });
};

export const loginUser=async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const response = await supabase.from('users').select().eq('email',email);
    bcrypt.compare(password,response.data[0].password,async(err,data)=>{
        if(err){
            res.status(500).json({message:"Server Error"});
        }
        else{
            if(data==true){
                const token=await generateToken({ email: email });
                console.log(token);
                res.cookie('token', token, {
                    httpOnly: true, 
                    secure: false, // Use `true` in production (requires HTTPS)
                    sameSite: 'Strict', 
                    maxAge:7 * 24 * 60 * 60 * 1000,
                });
                res.status(200).json({message:"password matched"});
            }
            else{
                res.status(401).json({message:"Wrong Password"});
            }
        }
    });
}

export const authUser=async(req,res)=>{
    const data=await verifyUser(req,res);
    if(data.status===200)
    {
        res.status(200).json({message:"User verified"});
    }
    else
    {
        res.status(data.status).json({message:"User not verified"});
    }
}
export const logoutUser=(req,res)=>{
    res.clearCookie('token', { httpOnly: true, secure: false });
    res.status(200).send("Logged out");
}