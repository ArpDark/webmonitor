import { supabase } from "../db/dbConnect.js";
import { verifyUser } from "../middlewares/auth.js";

export const getWebsite=async(req,res)=>{
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
}