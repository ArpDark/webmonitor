import { useState } from "react";
import { useNavigate } from "react-router";
const SignUp=({changeTab})=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    let navigate=useNavigate();
    const handleSubmit=async(event)=>{
        event.preventDefault();
        console.log(email);
        console.log(password);
        const backend_uri=import.meta.env.VITE_API_URI;
        
        const res=await fetch(backend_uri+"/api/auth/register",{
            method:"POST",
            body:JSON.stringify({email:email,password:password}),
            headers:{"Content-Type":"application/json"},
            credentials:"include"
        });
        const data=await res.json();
        console.log(data);
        if(res.ok){
            navigate("/home");
        }
        else
        {
            navigate("/");
        }
        
        
    }
    return (
        <div className={`flex w-4/5 justify-center ${changeTab?"hidden":""}`}>
            <form action="" onSubmit={handleSubmit} className="flex flex-col items-center my-4 w-full ">
                <div className=" flex flex-col mb-4 w-full">
                    <label htmlFor="Email" className=" text-lg py-1 font-mono ">Email</label>
                    <input type="email" name="Email" className=" border border-black px-1 py-0.5" onChange={(event)=>{setEmail(event.target.value)}} />
                </div>
                <div className="flex flex-col mb-4 w-full">
                    <label htmlFor="Password" className="text-lg py-1 font-mono ">Password</label>
                    <input type="password" name="Password" className="border border-black px-1 py-0.5" autoComplete="on" onChange={(event)=>{setPassword(event.target.value)}} />
                </div>
                <button className=" w-fit shadow-sm shadow-gray-500 hover:shadow-none rounded-sm p-1.5 bg-teal-300">
                    Sign Up
                </button>
            </form>
        </div>
    );
}
export default SignUp;