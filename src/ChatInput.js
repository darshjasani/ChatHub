import { Button } from '@mui/material';
import React, { useState } from 'react';
import './ChatInput.css';
import db from './firebase';
import firebase  from 'firebase/compat/app';
import {useStateValue} from './StateProvider';
const ChatInput = ({channelName,channelID})=>{
    const [input, setInput] = useState('');
    const [{user}] = useStateValue();
    const sendMessage = (e) =>{
        e.preventDefault();
        if(channelID){
            db.collection("rooms")
            .doc(channelID)
            .collection("messages").add({
                message:input,
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                user:user?.displayName,
                userImage:user?.photoURL,
            });
        }
        setInput("");
    }
    return(
        <div className='chatInput'>
            <form>
                <input 
                value={input} 
                onChange={(e)=>setInput(e.target.value)}
                placeholder={`Message #${channelName?.toLowerCase()}`}/>
                <Button type='submit' onClick={sendMessage}>Send</Button>
            </form>
        </div>
    )
}

export default ChatInput;