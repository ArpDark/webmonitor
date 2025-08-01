import https from "https";
import http from "http";
import { parse } from "url";
import { supabase } from "../db/dbConnect.js";

export const siteCheck=(id,site, interval)=>{
    var q = parse(site, true);
    console.log(q.protocol);
    console.log(q.hostname);
    console.log(q.pathname);
    let protocol=(q.protocol==="https:")?https:http;
    const options={
        hostname:q.hostname,
        path:q.pathname,
        method:"GET"
    };

    const checkSite=async()=>{
        const {data,error}=await supabase.from('websites').select().eq('id',id);
        // console.log(data);
        if(!data[0].being_monitored){
            clearInterval(checkInterval);
            console.log("Stopped");
            return;
        }

        const startTime= process.hrtime.bigint();
        const req=protocol.request(options,async(res)=>{
            console.log(typeof(res.statusCode));
            console.log(res.statusMessage);
            const endTime=process.hrtime.bigint();
            const responseTime=Number(endTime-startTime)/1e6;
            console.log("Response Time: "+ responseTime+" ms");
            const date=new Date().toISOString();//+interval*1000;
            console.log(site+" "+date);
            const {error}=await supabase.from('websites').update({last_checked:date,  response_time_ms:responseTime, status_code:res.statusCode, status_msg:res.statusMessage,site_status:true}).eq('id',id);
            const {error1}=await supabase.from('website_monitoring_logs').insert({website_id:id, checked_at:date,response_time_ms:responseTime, status_code:res.statusCode, status_msg:res.statusMessage,site_status:true});
            // console.log(response);
            
            // response_time_ms:responseTime, status_code:res.statusCode, status_msg:res.statusMessage,site_status:true 
        });
        req.on("error",async(err)=>{
            console.log(err);
            const date=new Date().toISOString();//+interval*1000;
            console.log(site+" "+date);
            const response=await supabase.from('websites').update({last_checked:date, site_status:false}).eq('id',id);
        });
        req.end();
    }
    checkSite();
    const checkInterval=setInterval(checkSite, interval*1000);
    // setInterval(checkSite, interval*60000);
}
