import { useContext, useEffect, useState } from "react";
import { SiteLogPopupContext } from "./MyContext";
import { RxCross1 } from "react-icons/rx";

const SiteLogPopup=()=>{
    const {openLog,setOpenLog}=useContext(SiteLogPopupContext);
    const [logs,setLogs]=useState([]);
    const backend_uri=import.meta.env.VITE_API_URI;
    useEffect(()=>{

        const fetchSiteData=async()=>{    
            const res=await fetch(backend_uri+"/api/sitelogs/"+openLog,{
                method:"GET",
                credentials:"include",
                // body:JSON.stringify({id:openLog})
            });
            const data=await res.json();
            console.log(data);
            setLogs(data);
        }
        if(openLog!==0)
        {
            fetchSiteData();
        }
    },[openLog]);

    const changeDateFormat=(date)=>{
        const newDate=new Date(date);
        const str=newDate.toLocaleDateString()+" "+newDate.toLocaleTimeString().substring(0,8);
        return str;
    }
    
    return(
        <div className={`flex justify-center items-center w-screen bg-transparent h-screen fixed ${openLog? '':'hidden'}`}>
            <div className="flex justify-stretch h-3/5 w-3/4 border-2 border-black bg-white">
                <div className="flex flex-col w-full h-full">
                    <div className="grid grid-cols-5 place-items-center">
                        <div>Checked At</div>
                        <div>Response Time(ms)</div>
                        <div>Status Code</div>
                        <div>Status Message</div>
                        <div>Status</div>
                    </div>
                    <div className=" overflow-y-scroll">
                        {logs.map((log)=>(
                            <div key={log.id} className="grid grid-cols-5 place-items-center">
                                <div >{changeDateFormat(log.checked_at)}</div>
                                <div >{log.response_time_ms}</div>
                                <div >{log.status_code}</div>
                                <div >{log.status_msg}</div>
                                <div >{log.site_status?"Live":"Down" }</div>
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={()=>{setOpenLog(0)}} className=" h-fit w-fit ml-2 shadow-sm shadow-slate-500 hover:shadow-none">
                    <RxCross1/>
                </button>
            </div>

        </div>
    );
}

export default SiteLogPopup;