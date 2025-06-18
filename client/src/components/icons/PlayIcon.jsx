import { IconContext } from "react-icons";
import { FaPlay } from "react-icons/fa6";


const PlayIcon=()=>{
    
    return(
        <IconContext.Provider value={{ color: "#000000",size:"1em",  }}>
          <div>
            <FaPlay/>
          </div>
        </IconContext.Provider>
    );
}

export default PlayIcon;