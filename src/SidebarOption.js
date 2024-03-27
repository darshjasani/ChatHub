import React, { useState } from "react";
import './SidebarOption.css';
import {useNavigate} from "react-router-dom"; 
import db from './firebase.js';
import firebase  from 'firebase/compat/app';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useScrollTrigger } from "@mui/material";
import { useStateValue } from "./StateProvider.js";

const SidebarOption = ({Icon, Title, Id, addChannelOption})=>{

    const [expand,setExpand] = useState(true);
    const history = useNavigate();
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const [{userId}] = useStateValue();
    const generateName = ()=>{
        let result = ''
        for (let i = 0; i < 5; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        } 
        return result
    }

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
            let rand = generateName();
            if(channelName != null && channelName.trim() !== ''){
                const snapshot = db.collection('rooms').add({
                    name:channelName +" "+ rand,
                    timeStamp:firebase.firestore.FieldValue.serverTimestamp(),
                });
                
                snapshot.then((data)=>{
                    db.collection('userRooms').add({
                        userRef:userId,
                        roomRef:data.id,
                        roomName:channelName +" "+ rand,
                        timeStamp:firebase.firestore.FieldValue.serverTimestamp(),
                    })
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