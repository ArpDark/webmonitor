import https from "https";
import http from "http";
import { parse } from "url";

export const siteCheck=(site, interval)=>{
    var q = parse(site, true);
    console.log(q.protocol);
    console.log(q.hostname);
    console.log(q.pathname);
    let protocol=(q.protocol==="https:")?https:http;

    const options={
        hostname:q.hostname,
        path:q.pathname,
        method:"HEAD"
    };

    const checkSite=()=>{
        const startTime= process.hrtime.bigint();
        const req=protocol.request(options,(res)=>{
            // console.log(res.headers);
            console.log(res.statusCode);
            console.log(res.statusMessage);
            const endTime=process.hrtime.bigint();
            const responseTime=Number(endTime-startTime)/1e6;
            console.log("Response Time: "+ responseTime+" ms");

        });
        req.end();
    }
    checkSite();
    setInterval(checkSite, interval*1000);
    // setInterval(checkSite, interval*60000);
}
