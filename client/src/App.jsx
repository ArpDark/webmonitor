import { useState } from "react";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
const App=()=> {
  const [changeTab,setChangeTab]=useState(0);

  return (
    <div className=' flex flex-col justify-center font-mono items-center min-h-screen h-dvh bg-gradient-to-r from-teal-400 to-cyan-400'>
      <h1 className="mb-10 text-6xl font-mono text-transparent drop-shadow-[0_4px_3px_rgba(0,0,0,0.5)] bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 ">
        UpTrack
      </h1>
      <div className="flex flex-col bg-white mb-20 shadow-md shadow-slate-500
       w-2/3 lg:w-1/4">
        <div className="flex  w-full ">
          <button onClick={()=>{setChangeTab(0)}} className={`text-xl w-full p-2  ${changeTab? "bg-slate-200 text-gray-500": "bg-teal-300"}`} >
            Sign Up
          </button>
          <button onClick={()=>{setChangeTab(1)}} className={` w-full text-xl p-2 ${changeTab? "bg-cyan-300": "bg-slate-200 text-gray-500"}`} >
            Log in
          </button>
        </div>
        <div className='flex justify-center h-fit  '>
          <SignUp changeTab={changeTab} />
          <Login changeTab={changeTab} />
        </div>
      </div>
      
    </div>
  )
}
export default App;
