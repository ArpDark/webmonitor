import { useState,useEffect, useContext } from "react";
import { SiteLogPopupContext } from "./MyContext";
import PlayIcon from "./icons/PlayIcon";
import PauseIcon from "./icons/PauseIcon";
import DeleteIcon from "./icons/DeleteIcon";


const WebsiteList=()=>{
    const backend_uri=import.meta.env.VITE_API_URI;
    const [websiteList,setWebsiteList]=useState([]);
    const {openLog,setOpenLog}=useContext(SiteLogPopupContext);
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


    // const changeDateFormat=(date)=>{
    //     const newDate=new Date(date);
    //     const str=newDate.toLocaleDateString()+" "+newDate.toLocaleTimeString().substring(0,8);
    //     return str;
    // }

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
        if(res.ok){
            const data=await res.json();
            setWebsiteList(data);
            console.log("data deleted successfully");
        }
    }

    const handlePopup=(site)=>{
        setOpenLog(site.id);
    }

    return(
        <div className="flex flex-col w-full overflow-x-auto h-fit text-xl border-2  border-gray-500 rounded-md mx-4">
            <div className=" grid grid-cols-7 place-items-center border-2 border-red-200 min-w-[800px]">
                <div>Website</div>
                <div>Interval(in Mins)</div>
                {/* <div>Last Checked</div> */}
                <div>Response Time(ms)</div>
                <div>Status Code</div>
                <div>Status</div>
                <div>Monitor</div>
            </div>
            {websiteList.map((website)=>(
                <div key={website.website} className="grid grid-cols-7 min-w-[800px] place-items-center border-2 border-red-200">
                    <div className="flex flex-col border-2 border-green-400 overflow-x-scroll">
                        <button className="flex" onClick={()=>{handlePopup(website)}}>{website.website_name}</button>
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
                    

                    <button className="w-fit h-fit bg-white border-2 border-black" onClick={()=>handleClick(website)}>
                        {website.being_monitored?<PauseIcon/>:<PlayIcon/>}
                    </button>
                    <button  className=" w-fit h-fit border-2 border-green-400" onClick={()=>handleDelete(website)}>
                        <DeleteIcon/>
                    </button>
                </div>
            ))}
        </div>
    );
}

export default WebsiteList;