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
            // console.log(data);
            setWebsiteList(data);
        });
        fetchUserData();
        
    },[]);
    // useEffect(()=>{
    //     const eventSource=new EventSource(`${backend_uri}/api/sitedata`,{withCredentials:true});
    //     eventSource.onmessage=(event)=>{
    //         const data=JSON.parse(event.data);
    //     }
    //     return () => {
    //         eventSource.close();
    //     };
    // },[]);

    const changeDateFormat=(date)=>{
        const newDate=new Date(date);
        const str=newDate.toLocaleDateString()+" "+newDate.toLocaleTimeString().substring(0,8);
        return str;
    }

    const handleClick=async(website)=>{
        // console.log(website);
        // console.log(typeof(website.being_monitored));
        const data={
            id:website.id,
            ismonitored:website.being_monitored,
            last_checked:website.last_checked,
            interval:website.interval,
            website:website.website
        }
        const res=await fetch(backend_uri+"/api/monitorwebsite",{
            method:"POST",
            body:JSON.stringify(data),
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
                <div>Interval(in Mins)</div>
                {/* <div>Last Checked</div> */}
                <div>Response Time(ms)</div>
                <div>Status Code</div>
                <div>Status</div>
                <div>Monitor</div>
            </div>
            {websiteList.map((website)=>(
                <div key={website.website} className="flex justify-around border-2 border-red-200">
                    <div>
                        {website.website_name}
                        <a href={website.website} target="_blank" className=" flex text-blue-400 ">
                            (<p className="underline hover:no-underline">Link</p>)
                        </a>
                    </div>
                    <div>{website.interval}</div>
                    {/* <div>{changeDateFormat(website.created_at)}</div> */}
                    {/* <div>{changeDateFormat(website.last_checked)}</div> */}
                    <div>{website.response_time_ms}</div>
                    <div>{website.status_code}</div>
                    <div>{website.site_status?"Live":"Down" }</div>
                    

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