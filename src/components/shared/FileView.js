import React,{useState} from "react";
import "./../../assets/css/FileView.css";
import PopUp from './../PopUp';

import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import ImageIcon from '@material-ui/icons/Image';
import MovieIcon from '@material-ui/icons/Movie';
import { FormatColorResetRounded } from "@material-ui/icons";


function FileView({id, name,timestamp,fileUrl,size,type}) {
    const [open,setOpen]=useState(false);
    const handlePopUp=()=>{
      setOpen(!open);
     
    }




  return (
    <div className="fileView" >
      <div className="fileView__top" onClick={handlePopUp}>
          {
              type?.includes('image')?(<ImageIcon style={{ fontSize: 50 }} />):(
                type?.includes('video')?(<MovieIcon style={{ fontSize: 50 }} />):(
                    <InsertDriveFileIcon style={{ fontSize: 50 }} />
                  )
              )
          }
          
      </div>

      <div className="fileView__bottom">
        <p>{name}</p>
      </div>
      {open?(<PopUp id={id} fonction={handlePopUp} name={name} timestamp={timestamp} fileUrl={fileUrl} size={size}/>):null}
      
    </div>
  );
}

export default FileView;
