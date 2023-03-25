import React from "react";
import './Message.css';
//import logo from '../public/logo192.png';


const Message = (message)=>{
    console.log(message);
    return(
        <div className="message">
            
            <img src={message.userImage}/>
            
            
            <div className="message_info">
                <h4>
                    {message.user} 
                    {new Date(message?.timestamp.toDate()).toUTCString()}
        
                </h4>
                   
                <p>
                    {message.message}
                </p>
            </div>
        </div>
    )
}

export default Message; 