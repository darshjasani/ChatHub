import { Button } from '@mui/material';
import React, { useState } from 'react';
import './ChatInput.css';
import db from './firebase';
import firebase  from 'firebase/compat/app';
import {useStateValue} from './StateProvider';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SendIcon from '@mui/icons-material/Send';
import Picker from 'emoji-picker-react';

const ChatInput = ({channelName,channelID})=>{
    const [input, setInput] = useState('');
    const [{user}] = useStateValue();
    const [emojiPicker, setEmojiPicker] = useState(false);  
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
    const onEmojiClick = (e)=>{
        setInput(prev => prev + e.emoji)
        setEmojiPicker(false)
    }
    return(
        <div className='chatInput'>
            <form>
                <div className='formEmoji'>
                    <InsertEmoticonIcon
                        onClick={()=>setEmojiPicker(val => !val)}
                    />
                   {emojiPicker &&
                    <Picker
                        
                        className="emoji"
                        onEmojiClick={onEmojiClick}
                    />}
                </div>
                <div className='formInput'>
                    <input 
                    value={input} 
                    onChange={(e)=>setInput(e.target.value)}
                    placeholder={`Message #${channelName?.toLowerCase()}`}/>
                </div>
                <div className='formButton'>
                    <Button type='submit' onClick={sendMessage}><SendIcon/></Button>
                </div>
                
            </form>
        </div>
    )
}

export default ChatInput;