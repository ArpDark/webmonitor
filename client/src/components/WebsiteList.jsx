import { useState,useEffect } from "react";
import PlayIcon from "./icons/PlayIcon";
import PauseIcon from "./icons/PauseIcon";
import DeleteIcon from "./icons/DeleteIcon";


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
            console.log(data);
            setWebsiteList(data);
        });
        fetchUserData();
        
    },[]);

    const changeDateFormat=(date)=>{
        const newDate=new Date(date);
        // console.log(newDate.toLocaleDateString()+" "+newDate.toTimeString());
        const str=newDate.toLocaleDateString()+" "+newDate.toLocaleTimeString().substring(0,5);
        // console.log(str);
        return str;
    }

    const handleClick=async(website)=>{
        console.log(website);
        const res=await fetch(backend_uri+"/api/monitorwebsite",{
            method:"POST",
            body:JSON.stringify({id:website.id, ismonitored:website.being_monitored}),
            headers:{"Content-Type":"application/json"},
            credentials:"include"
        });
        if(res.ok)
        {
            window.location.reload();
        }
        
        
    }

    const handleDelete=async(website)=>{
        const res=await fetch(backend_uri+"/api/deletewebsite",{
            method:"DELETE",
            body:JSON.stringify({id:website.id}),
            headers:{"Content-Type":"application/json"},
            credentials:"include"
        });
        // const data=await res.json();
        if(res.ok)
        {
            const data=await res.json();
            setWebsiteList(data);
            console.log("data deleted successfully");
            
        }
        
    }

    return(
        <div className="flex flex-col h-fit text-xl border-2 border-gray-500 rounded-md mx-4">
            <div className=" flex justify-around border-2 border-red-200">
                <div>Website</div>
                {/* <div>Link</div> */}
                <div>Interval(in Mins)</div>
                <div>Created At</div>
                <div>Last Checked</div>
                <div>Monitor</div>
            </div>
            {websiteList.map((website)=>(
                <div key={website.website} className="flex justify-around border-2 border-red-200">
                    <div>
                        {website.website_name}
                        <a href={website.website} target="_blank" className=" text-blue-400 underline hover:no-underline">
                            (Link)
                        </a>
                    </div>
                    <div>{website.interval}</div>
                    <div>{changeDateFormat(website.created_at)}</div>
                    <div>{changeDateFormat(website.last_checked)}</div>
                    <button className="bg-white border-2 border-black" onClick={()=>handleClick(website)}>
                        {website.being_monitored?<PauseIcon/>:<PlayIcon/>}
                    </button>
                    <button  onClick={()=>handleDelete(website)}>
                        <DeleteIcon/>
                    </button>
                </div>
            ))}
        </div>
    );
}

export default WebsiteList;