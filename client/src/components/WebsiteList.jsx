import { useState,useEffect } from "react";

const WebsiteList=()=>{
    const backend_uri=import.meta.env.VITE_API_URI;
    const [websiteList,setWebsiteList]=useState([]);
    useEffect(()=>{
        const fetchUserData=(async()=>{
            const res=await fetch(backend_uri+"/api/getwebsites",{
                method:"GET",
                credentials:"include",
            })
            const data=await res.json();
            // console.log(data);
            setWebsiteList(data);
        });
        fetchUserData();
        
    },[]);

    const changeDateFormat=(date)=>{
        const newDate=new Date(date);
        // console.log(newDate.toLocaleDateString()+" "+newDate.toTimeString());
        const str=newDate.toLocaleDateString()+" "+newDate.toLocaleTimeString().substring(0,5);
        console.log(str);
        return str;
    }

    return(
        <div className="flex flex-col h-fit text-xl border-2 border-gray-500 rounded-md mx-4">
            <div className=" flex justify-around border-2 border-red-200">
                <div>Name</div>
                    <div>Interval(in Mins)</div>
                    <div>Created At</div>
                    <div>Last Checked</div>
            </div>
            {websiteList.map((website)=>(
                <div key={website.website} className="flex justify-around border-2 border-red-200">
                    <div>{website.website}</div>
                    <div>{website.interval}</div>
                    <div>{changeDateFormat(website.created_at)}</div>
                    <div>{changeDateFormat(website.last_checked)}</div>
                </div>
            ))}
        </div>
    );
}

export default WebsiteList;