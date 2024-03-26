import React, { Component, useEffect } from 'react'
import Header from './Header.js';
import Sidebar from './Sidebar.js';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from './StateProvider.js';
function Home({component}) {
    const [{user}] = useStateValue();
    const history = useNavigate();
    
    useEffect(()=>{
        if(user == null){
            history('/login');
        }
    },[user])
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