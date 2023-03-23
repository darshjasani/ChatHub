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

const Sidebar = ()=>{
    const [channels, setChannels] = useState([]);

    useEffect(()=>{
        // Run this part when Sidebar is loaded
        db.collection('rooms').onSnapshot((snapshot)=>
            setChannels(
                snapshot.docs.map((doc)=>(
                    {
                        id:doc.id,
                        name:doc.data().name,
                    }
                ))
            )
        );
    },[]);
    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <div className="sidebar_info">
                    <h2>Darsh Jasani</h2>
                    <h3> <FiberManualRecordIcon/> Dash</h3>
                </div>
                <CreateIcon/>
            </div>
            <SidebarOption Icon = {InsertCommentIcon} Title="Therads"/>
            <SidebarOption Icon = {InboxIcon} Title="Mentions & Reactions"/>
            <SidebarOption Icon = {DraftsIcon} Title="Saved Items"/>
            <SidebarOption Icon = {BookmarkBorderIcon} Title="Channel Browser"/>
            <SidebarOption Icon = {PeopleAltIcon} Title="People & User Groups"/>
            <SidebarOption Icon = {AppsIcon} Title="Apps"/>
            <SidebarOption Icon = {FileCopyIcon} Title="File Browser"/>
            <SidebarOption Icon = {ExpandLessIcon} Title="Show Less"/>

            <hr/>
            <SidebarOption Icon = {ExpandMoreIcon} Title="Channels"/>
            <hr/>
            <SidebarOption Icon = {AddIcon} Title="Add Channel" addChannelOption="true"/>

            {/** Connect to Firebase DB */}
            {
                channels.map(channel=>(
                    <SidebarOption Title={channel.name} Id = {channel.id}/>
                ))
            }
        </div>
    );
}

export default Sidebar