import React from "react";
import './SidebarOption.css'

const SidebarOption = ({Icon, Title})=>{
    return (
        <div className="sidebarOption">
        {Icon && <Icon className="sidebarOption_icon"/>}
        {Icon ? (
            <h3>{Title}</h3>
            ) : (
            <h3 className="sidebarOption_channel">
                <span className="sidebarOption_hash">#</span>{Title}</h3>
            )}
        </div>
    );
}

export default  SidebarOption;