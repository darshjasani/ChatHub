import React, {useEffect, useState} from "react";
import SidebarOption from "./SidebarOption";
import db from './firebase.js';
import './Sidebar.css'

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CreateIcon from '@mui/icons-material/Create';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppsIcon from '@mui/icons-material/Apps';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useStateValue } from "./StateProvider.js";

const Sidebar = ()=>{
    const [open, setOpen] = useState(true);
    const [channels, setChannels] = useState([]);
    const [{userId}] = useStateValue();
    
    const toggleOpen = ()=>{
        setOpen(!open);
    }
    useEffect(()=>{

        // Run this part when Sidebar is loaded
        
        db.collection('userRooms')
        .where("userRef","==",userId)
        .onSnapshot((snapshot)=>{
            setChannels(
                snapshot.docs.map((doc)=>({
                    id:doc.data().roomRef,
                    name:doc.data().roomName
                }))
            )
        })
    },[]);
    return (
        <div className="sidebar" style={{width : open ? 'max-content' : '22px'}}>
            {/* <div className="sidebar_header">
                {open && 
                <>
                <div className="sidebar_info">
                    <h2>{user?.displayName}</h2>
                    <h3> <FiberManualRecordIcon/>{user?.displayName}</h3>
                </div>
                <CreateIcon/>
                </>}
            </div> */}
            
            <div>    
                <button className='toggle' onClick={toggleOpen}>
                    {open ? <KeyboardDoubleArrowLeftIcon/> : <KeyboardDoubleArrowRightIcon/> }
                </button>    
                <SidebarOption Icon = {InsertCommentIcon} Title="Therads"/>
                <SidebarOption Icon = {InboxIcon} Title="Mentions & Reactions"/>
                <SidebarOption Icon = {DraftsIcon} Title="Saved Items"/>
                <SidebarOption Icon = {BookmarkBorderIcon} Title="Channel Browser"/>
                <SidebarOption Icon = {PeopleAltIcon} Title="People & User Groups"/>
                <SidebarOption Icon = {AppsIcon} Title="Apps"/>
                <SidebarOption Icon = {FileCopyIcon} Title="File Browser"/>
            </div>
            {open && 
            <>
                <hr/>
                <SidebarOption Icon = {AddIcon} Title="Add Channel" addChannelOption="true"/>
                <hr/>
                
                <SidebarOption Icon ={ExpandLessIcon} Title="Channels" addChannelOption="true"/>
                {/** Connect to Firebase DB */}
                
                <div className="addChannel">
                    {
                        channels.map(channel=>(
                            <SidebarOption Title={channel?.name} Id = {channel?.id}/>
                        ))
                    }
                </div>
            </>
            }        
        </div>
    );
}

export default Sidebar