import jwt from "jsonwebtoken";

export const generateToken=async(payload)=>{
    return jwt.sign(payload,process.env.PRIVATE_KEY, { algorithm: 'RS256', expiresIn:"7d" });
}