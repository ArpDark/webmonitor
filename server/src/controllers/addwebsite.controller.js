import { supabase } from "../db/dbConnect.js";
import { verifyUser } from "../middlewares/auth.js";
import { siteCheck } from "../services/siteCheck.js";

export const addWebsite=async(req,res)=>{
    const websiteName=req.body.name;
    const website=req.body.website;
    const interval=req.body.interval;
    // console.log(website+" "+interval);
    const data=await verifyUser(req,res);
    // console.log(data.data);
    const date=new Date().toISOString();
    // console.log(date);
    
    // res.status(200).json({message:"data received successfully"});
    if(data.status===200){
            const checkRes=await supabase.from('websites').select().eq('website',website).eq('user_email', data.data);
            // console.log(checkRes);
            
            if(checkRes.data.length === 0){
                const response = await supabase.from('websites').insert({ website_name:websiteName,website:website ,user_email: data.data, interval:interval, created_at: date, last_checked:date, being_monitored:false });
                // siteCheck(website,interval);
                // console.log(response);
                res.status(200).json("done");
            }
            else{
                res.status(400).json({message:"Data already exists"})
            }

        }
        else{
        res.status(data.status).json({message:"data not added due to error"});
    }
}