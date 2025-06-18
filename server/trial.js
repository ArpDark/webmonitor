import https from "https";
import http from "http";
import { parse } from "url";

var q = parse("https://awr8934uursd.com/", true);
// var q = parse("https://eventforgebackend.onrender.com", true);
// var q = parse("https://www.hackerrank.com/dashboard", true);
// var q = parse("https://codeforces.com", true);
console.log(q.protocol);
console.log(q.hostname);
console.log(q.pathname);
let protocol=(q.protocol==="https:")?https:http;
const options={
    hostname:q.hostname,
    path:q.pathname,
    method:"HEAD",
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
                      "AppleWebKit/537.36 (KHTML, like Gecko) " +
                      "Chrome/91.0.4472.124 Safari/537.36"
    }
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
    req.on("error",(err)=>{
        console.log(err);
    });
    req.end();
}
checkSite();
setInterval(checkSite, 5*1000);
// setInterval(checkSite, interval*1000);
// setInterval(checkSite, interval*60000);