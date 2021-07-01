import React from "react";
import './../../assets/css/SideIcon.css'

function SideIcon({icon, description ,handler}) {
   
  return (
    <div className="sideIcon" onClick={handler} >
        <div className='icon__hover'>
          {icon }
          </div>
        
        <span className="sideDescription" >{description}</span>
     
    
    </div>
  );
}

export default SideIcon;
