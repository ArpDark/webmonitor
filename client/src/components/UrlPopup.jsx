import { useState, useContext } from "react";
import { PopupContext } from "./MyContext";
import { RxCross1 } from "react-icons/rx";

const UrlPopup=()=>{
    const {open,setOpen}=useContext(PopupContext);
    const [userInput,setUserInput]=useState("");
    const [interval,setInterval]=useState(5);
    const backendUri=import.meta.env.VITE_API_URI;

    const handleSubmit= async()=>{
        const dataToSend={
            website:userInput,
            interval:interval
        }
        const res=await fetch(backendUri+"/addwebsite", {
            method:"POST",
            body:JSON.stringify(dataToSend),
            headers:{"Content-Type":"application/json"},
            credentials:"include"
        });
        console.log(interval);
        console.log(userInput);
        const data=await res.json();
        console.log(res.status);
        console.log(data);
        
        setOpen(0);
        
    }

    return(
        <div className={`flex justify-center items-center w-screen h-screen fixed  ${open? '' : 'hidden'} `}>
            <div className="flex border-2 border-gray-500 bg-white items-start justify-between pl-4 pr-1 pt-1 pb-2 w-1/4">
                <form className="flex flex-col w-full" onSubmit={handleSubmit}>
                    <label htmlFor="">Enter the url</label>
                    <input type="text" className=" border border-black " onChange={(event)=>{setUserInput(event.target.value)}}  required  />
                    <label htmlFor="">Interval</label>
                    <select name="" id="" onChange={(event)=>{setInterval(event.target.value)}}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                        <option value="60">60</option>
                    </select>
                    <button type="submit" className="border border-green-400 w-fit" >Add</button>
                </form>
                <button onClick={()=>{setOpen(0)}} className=" ml-2 shadow-sm shadow-slate-500 hover:shadow-none">
                    <RxCross1/>
                </button>
            </div>
        </div>
    );
}

export default UrlPopup;