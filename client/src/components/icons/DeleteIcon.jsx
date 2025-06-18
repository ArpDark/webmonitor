import { IconContext } from "react-icons";
import { MdDelete } from "react-icons/md";


const DeleteIcon=()=>{
    
    return(
        <IconContext.Provider value={{ color: "#000000", size:"1em",  }}>
          <div>
            <MdDelete/>
          </div>
        </IconContext.Provider>
    );
}

export default DeleteIcon;