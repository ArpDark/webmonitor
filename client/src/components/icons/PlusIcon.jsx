import { IconContext } from "react-icons";
import {RiAddBoxLine} from 'react-icons/ri';

const PlusIcon=()=>{
    
    return(
        <IconContext.Provider value={{ color: "#f2f2f2", size:"1em",  }}>
          <div>
            <RiAddBoxLine />
          </div>
        </IconContext.Provider>
    );
}

export default PlusIcon