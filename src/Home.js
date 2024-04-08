import React, { Component, useEffect } from 'react'
import Header from './Header.js';
import Sidebar from './Sidebar.js';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from './StateProvider.js';
function Home({component}) {
    const [state,dispatch] = useStateValue();
    const history = useNavigate();
    
    useEffect(()=>{
        let u = localStorage.getItem('userDetails');
        if(state.user === null){
            history('/login');
        }
    },[state.user])

    return (
            <>
                <Header/>
                <div className='app_body'>
                    <Sidebar/>
                    <>
                        {component}
                    </>
                </div>
                
            </>
    )
}

export default Home