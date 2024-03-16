import React from 'react';
import './Progress.css';


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