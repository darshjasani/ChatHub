import React from 'react';
import './Progress.css';
import Home from './Home';
import Header from './Header';
import Sidebar from './Sidebar';

const Progress = (props)=>{
    return(
        <>
                    <div className='progress'>
                <div className='progress_title'>Welcome to {props.name} Page</div>

                {props.name === 'Home' ? <>
                    <p>You can click on 'Add Channel' to create a channel and start chatting wih other users</p>
                </> : <p>Work is Progress!</p>}
                
            </div>
            
            
            
        </>
    )
}

export default Progress;