// import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import {supabase} from "../db/dbConnect.js"
export const verifyUser=async(req,res)=>{
    const token=req.cookies.token;
    // const email="";
    const email=jwt.verify(token, process.env.PUBLIC_KEY, async(err, decoded)=> {
            if(err){
                // console.log("User not verified");
                // res.status(401).json({message:"User not verified"});
                
                return {'status':401, 'data':err};
            }
            else{
                // console.log(decoded.email);
                
                const response = await supabase.from('users').select('email').eq('email',decoded.email);
                // console.log(response.data.length);
                if(response.data.length!=1)
                    return {'status':401, 'data':err};
                else
                    return {'data':decoded.email, 'status':200};
            }
    });
    return email;
    
}