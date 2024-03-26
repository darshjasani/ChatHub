import React, { useRef, useEffect } from 'react';
import './Chat.css';
import { useNavigate, useParams } from 'react-router-dom';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import db from './firebase.js';
import { useState } from 'react';
import Message from './Message.js';
import ChatInput from './ChatInput';
import Home from './Home.js';
import { useStateValue } from './StateProvider.js';
import { queries } from '@testing-library/react';


const Chat = ()=>{
    const chatScreen = useRef(null);
    const [showLoader, setShowLoader] = useState(false);
    const[{user}] = useStateValue();
    const history = useNavigate();
    const {roomID} = useParams();
    const [roomDetails,setRoomDetails] = useState(null);
    const [roomMessages,setRoomMessages] = useState([])
    const [lastVisibleMessage, setLastVisibleMessage] = useState(null);

    const handleScroll = ()=>{
       if(chatScreen.current.scrollTop == 0 && lastVisibleMessage){
            setShowLoader(true); 
            loadNextMessages();
       }
    }
    useEffect(()=>{
        
        if(roomID){
            db.collection('rooms').doc(roomID).get()
            .then((snapshot)=>{
                setRoomDetails(snapshot.data())
            })
        }
        else{
            {<h1>Welcome</h1>}
        }
        db.collection('rooms')
        .doc(roomID)
        .collection('messages')
        .orderBy('timestamp','desc')
        .limit(10)
        .onSnapshot(
            (snapshot) => {
                const message = snapshot.docs.map(doc => doc.data())
                setRoomMessages(message.reverse())
                setLastVisibleMessage(snapshot.docs[snapshot.docs.length - 1]);
            }
        );
        
    },[roomID]);

    const loadNextMessages = async ()=>{
        if (!lastVisibleMessage) return;

        await db.collection('rooms')
        .doc(roomID)
        .collection('messages')
        .orderBy('timestamp','desc')
        .startAfter(lastVisibleMessage)
        .limit(10)
        .onSnapshot(
            (snapshot) => {
                const newMessage = snapshot.docs.map(doc => doc.data())
                const message = newMessage.reverse();
                setRoomMessages(prevMessages => [...message, ...prevMessages])
                setLastVisibleMessage(snapshot.docs[snapshot.docs.length - 1]);
                setShowLoader(false);
            }
        );
    }

    return (
        <>
        <div className='chat' >
        <div className='chat_screen' ref={chatScreen} onScroll={handleScroll}>
            <div className='chat_header'>
                <div className='chat_headerLeft'>
                    <h4 className='chat_channelName'>
                        <strong>#{roomDetails?.name}</strong>
                        <StarBorderIcon/>
                    </h4>
                </div>
                <div>{showLoader && 'Loading....' }</div>
                <div className='chat_headerRight'>
                    <p>
                        <InfoOutlinedIcon/> Details
                    </p>
                </div>
            </div>

            <div className='chat_messages' >
                {roomMessages.map(({message,timestamp,userRef}) => (
                    <Message 
                        message={message}
                        timestamp={timestamp}
                        userRef={userRef}
                    />
                ))}
               
            </div>
            
        </div>
            <div className='chat_input'>
                <ChatInput channelName={roomDetails?.name} channelID={roomID}/>
            </div>
        </div>
    </>
    );
}

export default Chat;