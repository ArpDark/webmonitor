import AddingArea from "./AddingArea";
import WebsiteList from "./WebsiteList";
import AddUrlPopup from "./AddUrlPopup";
import { UrlPopupContext, SiteLogPopupContext } from "./MyContext";
import { useNavigate } from "react-router";
import { useContext, useState, useEffect } from "react";
import SiteLogPopup from "./SiteLogPopup";
const HomePage=()=>{
    const backend_uri=import.meta.env.VITE_API_URI;
    let navigate=useNavigate();
    const [open,setOpen]=useState(0);
    const [openLog,setOpenLog]=useState(0);
    useEffect(()=>{
        const verifyUser=async()=>{
            const res=await fetch(backend_uri+"/api/auth/authenticate",{
                method:"GET",
                credentials:"include"
            });
            if(res.ok){
                const data=await res.json();
                console.log(data);
                console.log(res.status);
            }
            else{
                navigate("/");
            }
            
        }
        verifyUser();

    },[]);

    return(
        <div className=" flex flex-col z-0 min-h-screen h-dvh">
            <h1 className="flex justify-center text-5xl pt-6 pb-12">Welcome Back! Aritra</h1>
            <UrlPopupContext.Provider value={{open,setOpen}}>
                <AddingArea/>
                <AddUrlPopup/>
            </UrlPopupContext.Provider>
            <SiteLogPopupContext.Provider value={{openLog,setOpenLog}}>
                <WebsiteList/>
                <SiteLogPopup/>
            </SiteLogPopupContext.Provider>
        </div>
    );
}
export default HomePage;