import React from "react";
import './SidebarOption.css';
import {useNavigate} from "react-router-dom"; 
import db from './firebase.js';
const SidebarOption = ({Icon, Title, Id, addChannelOption})=>{
    const history = useNavigate();
    const selectChannel = ()=>{
        if(Id){
            history(`/room/${Id}`);
        }
        else{
            history(Title);
        }
    }

    const addChannel = ()=>{
        const channelName = prompt('Enter the Channel Name :');
        if(channelName){
            db.collection('rooms').add({
                name:channelName,
            })
        }
    }
    return (
        <div className="sidebarOption" onClick={addChannelOption ? addChannel : selectChannel}>
        {Icon && <Icon className="sidebarOption_icon"/>}
        {Icon ? ( 
            <h3>{Title}</h3>
            ) : (
                
                    <h3 className="sidebarOption_channel">
                    <span className="sidebarOption_hash">#</span>{Title}
                    </h3>
                
            )}
        </div>
    );
}

export default  SidebarOption;