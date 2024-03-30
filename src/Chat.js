import React, { useRef, useEffect } from 'react';
import './Chat.css';
import { useNavigate, useParams } from 'react-router-dom';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import db from './firebase.js';
import { useState } from 'react';
import Message from './Message.js';
import ChatInput from './ChatInput';
import Home from './Home.js';
import { useStateValue } from './StateProvider.js';
import { queries } from '@testing-library/react';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import firebase  from 'firebase/compat/app';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const Chat = ()=>{
    const chatScreen = useRef(null);
    const [showLoader, setShowLoader] = useState(false);
    const[{user}] = useStateValue();
    const history = useNavigate();
    const {roomID} = useParams();
    const [userList, setuserList] = useState([]);
    const [roomDetails,setRoomDetails] = useState(null);
    const [roomMessages,setRoomMessages] = useState([])
    const [lastVisibleMessage, setLastVisibleMessage] = useState(null);
    const [roomUsers, setroomUsers] = useState(false);
    
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
        
        
        db.collection('userRooms')
        .where("roomRef","==",roomID)
        .get()
        .then((snapshot)=>{
            let promises = []

            snapshot.forEach((doc)=>{
                let userid = doc.data().userRef;

                const promise = db.collection('login')
                .doc(userid)
                .get()
                .then((doc)=>{
                    return {name:doc.data().username}
                });

                promises.push(promise);
            });

            Promise.all(promises)
            .then((userData)=>{
                setuserList(userData);
            })

        });
        
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

    const addUser = ()=>{
        const name = prompt("Enter username :");
        if(name != null && name.trim() !== ''){
            db.collection('login')
            .where("username","==",name)
            .get()
            .then((snapshot)=>{
                if(snapshot.size != 1){
                    alert("Invalid username")
                }
                else{
                    const id = snapshot.docs[0].id;

                    db.collection('userRooms')
                    .where("userRef","==",id)
                    .where("roomRef","==",roomID)
                    .get()
                    .then((details)=>{
                        if(details.size != 1){
                            db.collection('userRooms')
                            .add({
                                userRef:id,
                                roomRef:roomID,
                                roomName:roomDetails?.name,
                                timestamp:firebase.firestore.FieldValue.serverTimestamp()
                            })

                            alert("User " + name + " add successfully!!");

                            setuserList(preUsers => [...preUsers, {name:name}])
                        }
                        else{
                            alert("User is already inside the room!!");
                        }
                    })
                }
            })
        }
        else{
            alert('Try Again!!');
        }
    }

    const userSDetails = ()=>{
        setroomUsers(true);
    }

    const userHDetails = ()=>{
        setroomUsers(false); 
    }
    return (
        <>
        <div className='chat' >
        <div className='chat_screen' ref={chatScreen} onScroll={handleScroll} >
            <div className='chat_header'>
                <div className='chat_headerLeft'>
                    <h4 className='chat_channelName'>
                        <strong>#{roomDetails?.name}</strong>
                        <span onMouseEnter={userSDetails} onMouseLeave={userHDetails}><InfoOutlinedIcon/></span>
                        
                            <div className='roomUsers' style={{display: roomUsers ? 'block' : 'none'}} onMouseEnter={userSDetails} onMouseLeave={userHDetails}>
                                <div className='cardRoomUsers'>
                                    <h3>List of users inside rooms :</h3>
                                    <ol>
                                        {userList.map(({name})=>(
                                            
                                            <li>{name}</li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                    </h4>
                </div>
                <div>{showLoader && 'Loading....' }</div>
                <div className='chat_headerRight'>
                    <button onClick={addUser}>
                        <PersonAddAltIcon/> Add User
                    </button>
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
                <ChatInput channelName={roomDetails?.name} channelID={roomID} />
            </div>
        </div>
    </>
    );
}

export default Chat;