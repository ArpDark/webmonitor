import AddingArea from "./AddingArea";
import WebsiteList from "./WebsiteList";
import UrlPopup from "./UrlPopup";
import { PopupContext } from "./MyContext";
import { useNavigate } from "react-router";
import { useContext, useState, useEffect } from "react";
const HomePage=()=>{
    const backend_uri=import.meta.env.VITE_API_URI;
    let navigate=useNavigate();
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
    const [open,setOpen]=useState(0);
    return(
        <div className=" flex flex-col z-0 min-h-screen h-dvh">
            <h1 className="flex justify-center text-5xl pt-6 pb-12">Welcome Back! Aritra</h1>
            <PopupContext.Provider value={{open,setOpen}}>
                <AddingArea/>
                <UrlPopup/>
            </PopupContext.Provider>
            <WebsiteList/>
        </div>
    );
}
export default HomePage;