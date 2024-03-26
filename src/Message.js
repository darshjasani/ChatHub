import React, { useEffect, useState } from "react";
import './Message.css';
//import logo from '../public/logo192.png';
import defaultImg from './images/profile.jpeg'
import db from './firebase.js'
import { useStateValue } from "./StateProvider.js";
import { useNavigate } from "react-router-dom";

const Message = (message)=>{
    const [data,setData] = useState([]);
    useEffect(()=>{
        
        db.collection('login').doc(message.userRef).get()
        .then((snapshot)=>{
            setData({
                username:snapshot.data().username,
                imgUrl:snapshot.data().imgUrl
            })
        })
    },[message])

    //console.log(message);
    return(
        <div className="message">
            
            <img src={data.imgUrl}/>
            
            
            <div className="message_info">
                <h4>
                    {data.username} 
                    <span className="message_timestamp">
                        {new Date(message?.timestamp?.toDate()).toUTCString()}
                    </span>
                </h4>
                   
                <p>
                    {message.message}
                </p>
            </div>
        </div>
    )
}

export default Message; 