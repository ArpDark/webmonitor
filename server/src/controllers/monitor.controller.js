import { supabase } from "../db/dbConnect.js";
import { verifyUser } from "../middlewares/auth.js";
import { siteCheck } from "../services/siteCheck.js";

export const monitorWebsite=async(req,res)=>{
    const data=await verifyUser(req,res);
    const id=req.body.id;
    const ismonitored=req.body.ismonitored;
    const site=req.body.website;
    const interval=req.body.interval;
    const lastChecked=req.body.last_checked;
    console.log(lastChecked);
    console.log(typeof(lastChecked));
    if(data.status===200){
        const response = await supabase.from('websites').update({being_monitored:ismonitored?false:true}).eq('id',id);
        const beingMonitored=ismonitored?false:true;
        if(beingMonitored)
            siteCheck(id,site,interval);

        res.status(200).send(response);
    }
    else{
        res.status(data.status).json({message:"data not deleted"});
    }
}