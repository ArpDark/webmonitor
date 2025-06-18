import PlusIcon from "./icons/PlusIcon";
import { useState, useContext } from "react";
import { PopupContext } from "./MyContext";
import { useNavigate } from "react-router";

const AddingArea=()=>{
    const {open,setOpen}=useContext(PopupContext);
    const backend_uri=import.meta.env.VITE_API_URI;
    const navigate=useNavigate();
    const handleClick=()=>{
        setOpen(1);
    }

    const handleLogout=async()=>{
        const res=await fetch(backend_uri+"/api/auth/logout",{
            method:"GET",
            credentials:"include"
        });
        if(res.ok){
            navigate("/");
        }
        else{
            const data=await res.json();
            console.log(data);
        }
    }

    return (
        <section className="flex h-fit text-xl border-2 border-gray-500 rounded-md m-4">
            <button onClick={handleClick} className="flex justify-center items-center  px-2  text-lg rounded-md m-2 bg-gray-500 text-[#f2f2f2] hover:shadow-md ">
                <PlusIcon/>   Add new website
            </button>
            <button onClick={handleLogout} className="border-2 border-red-500">Log Out</button>

        </section>
    );
}
export default AddingArea;