import { supabase } from "../db/dbConnect.js";
import { verifyUser } from "../middlewares/auth.js";

export const monitorWebsite=async(req,res)=>{
    const data=await verifyUser(req,res);
    const id=req.body.id;
    const ismonitored=req.body.ismonitored;
    // console.log(data.data);
    // console.log(id);
    if(data.status===200){
        const response = await supabase.from('websites').update({being_monitored:ismonitored?false:true}).eq('id',id);
        // const response1 = await supabase.from('websites').select().eq('user_email',data.data);
        // console.log(response);
        
        res.status(200).send(response);
    }
    else{
        res.status(data.status).json({message:"data not deleted"});
    }
}