import { supabase } from "../db/dbConnect.js";

export const siteLogs=async(req,res)=>{
    console.log(req.params.id);
    const {data,error}=await supabase.from("website_monitoring_logs").select().eq("website_id",req.params.id);
    res.json(data);
    
}