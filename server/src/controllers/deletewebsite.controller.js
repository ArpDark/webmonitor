import { supabase } from "../db/dbConnect.js";
import { verifyUser } from "../middlewares/auth.js";

export const deleteWebsite=async(req,res)=>{
    const data=await verifyUser(req,res);
    const id=req.body.id;
    // console.log(data.data);
    console.log(id);
    if(data.status===200){
        const response = await supabase.from('websites').delete().eq('id',id);
        const response1 = await supabase.from('websites').select().eq('user_email',data.data);
        console.log(response);
        
        res.status(200).send(response1.data);
    }
    else{
        res.status(data.status).json({message:"data not deleted"});
    }
}