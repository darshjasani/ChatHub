import React, { useState } from "react";
import './SidebarOption.css';
import {useNavigate} from "react-router-dom"; 
import db from './firebase.js';
import firebase  from 'firebase/compat/app';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useScrollTrigger } from "@mui/material";

const SidebarOption = ({Icon, Title, Id, addChannelOption})=>{

    const [expand,setExpand] = useState(true);
    const history = useNavigate();

    const selectChannel = ()=>{
        if(Id){
            history(`../room/${Id}`);
        }
        else{
            history("../"+Title);
        }
    }

    const addChannel = () =>{
        if(Title == "Channels"){
           setExpand(!expand);
        }
        else{
            const channelName = prompt('Enter Channel Name :');
            if(channelName != ''){
                db.collection('rooms').add({
                    name:channelName,
                    timeStamp:firebase.firestore.FieldValue.serverTimestamp(),
                })
            }
            else{
                alert('Try Again!!');
            }
        }
    }
    <h3 className="sidebarOption_channel">
                        <span className="sidebarOption_hash">#</span>{Title}
                    </h3>
    return (
        <div className="sidebarOption" onClick={addChannelOption ? addChannel : selectChannel}>
        {Icon && (expand ? <Icon className="sidebarOption_icon"/> : <ExpandMoreIcon className="sidebarOption_icon"/>)}
        <h3 className="sidebarOption_channel">
            {Id && <span className="sidebarOption_hash">#</span>}{Title}
        </h3>
        </div>
    );
}

export default SidebarOption;