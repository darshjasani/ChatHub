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

                <p> Work in Progress</p>
                {/* <img src='././images/coding.svg' alt='Coding'/> */}
            </div>
            
            
            
        </>
    )
}

export default Progress;