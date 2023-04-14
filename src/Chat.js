import React, { useRef, useEffect } from 'react';
import './Chat.css';
import { useParams } from 'react-router-dom';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import db from './firebase.js';
import { useState } from 'react';
import Message from './Message.js';
import ChatInput from './ChatInput';

const Chat = ()=>{
    const {roomID} = useParams();
    const [roomDetails,setRoomDetails] = useState(null);
    const [roomMessages,setRoomMessages] = useState([])
    const containerRef = useRef(null);

    useEffect(()=>{
        //console.log(roomID);
        const container = containerRef.current;
        container.scrollTop = container.scrollHeight - container.clientHeight;
        if(roomID){
            db.collection('rooms').doc(roomID)
            .onSnapshot(snapshot => (
                setRoomDetails(snapshot.data())
            ))
        }
        else{
            {<h1>Weclome</h1>}
        }

        db.collection('rooms')
        .doc(roomID)
        .collection('messages')
        .orderBy('timestamp','asc')
        .onSnapshot(
            (snapshot) => setRoomMessages(
                snapshot.docs.map(doc => doc.data())
            )
        );
    },[roomID]);
    return (
        <div className='chat' ref={containerRef}>
        <div className='chat_screen' >
            <div className='chat_header'>
                <div className='chat_headerLeft'>
                    <h4 className='chat_channelName'>
                        <strong>#{roomDetails?.name}</strong>
                        <StarBorderIcon/>
                    </h4>
                </div>
                <div className='chat_headerRight'>
                    <p>
                        <InfoOutlinedIcon/> Details
                    </p>
                </div>
            </div>

            <div className='chat_messages'>
                {roomMessages.map(({message,timestamp,user,userImage}) => (
                    <Message 
                        message={message}
                        timestamp={timestamp}
                        user={user}
                        userImage={userImage}
                    />
                ))}
            </div>
        </div>
            <div className='chat_input'>
                <ChatInput channelName={roomDetails?.name} channelID={roomID}/>
            </div>
        </div>

    );
}

export default Chat;