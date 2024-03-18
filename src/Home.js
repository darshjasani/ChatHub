import React, { Component } from 'react'
import Header from './Header.js';
import Sidebar from './Sidebar.js';

import { useStateValue } from './StateProvider.js';
function Home({component}) {
    const [{user}] = useStateValue();
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