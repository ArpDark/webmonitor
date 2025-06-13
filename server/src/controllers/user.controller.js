import bcrypt from "bcryptjs";
import { supabase } from "../db/dbConnect.js";
import { generateToken } from "../utils/jwt.util.js";

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
                    if(data.status===201)
                    {

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
};