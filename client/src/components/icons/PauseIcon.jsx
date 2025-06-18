import { IconContext } from "react-icons";
import { FaPause } from "react-icons/fa6";


const PauseIcon=()=>{
    
    return(
        <IconContext.Provider value={{ color: "#000000", size:"1em",  }}>
          <div>
            <FaPause/>
          </div>
        </IconContext.Provider>
    );
}

export default PauseIcon;