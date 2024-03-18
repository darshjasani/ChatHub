import React from 'react'
import Header from './Header.js';
import Sidebar from './Sidebar.js';
import { Router, Routes, Route, useLocation } from 'react-router-dom';
import Chat from './Chat.js';
import Progress from './Progress'
import Logout from './Logout.js';
function Home() {
    const loc = useLocation().pathname;
  return (
        <>
        {loc != '/profile' && (
            <>
                <Header />
                <div className='app_body'>
                    {/* Sidebar */}
                    <Sidebar />
                    {/* React Router -> Chat Screen */}
                    <Routes>
                        <Route path='/Therads' element={<Progress name="Threads"/>} />
                        <Route path='/Mentions & Reactions' element={<Progress name="Mentions & Reactions"/>} />
                        <Route path='/Saved Items' element={<Progress name="Saved Items"/>} />
                        <Route path='/Channel Browser' element={<Progress name="Channel Browser"/>} />
                        <Route path='/People & User Groups' element={<Progress name="People & User Groups"/>} />
                        <Route path='/Apps' element={<Progress name="Apps"/>} />
                        <Route path='/File Browser' element={<Progress name="File Browser"/>} />
                        <Route path='/Log Out' element={<Logout/>} />
                        <Route path='/room/:roomID' element={<Chat />} />
                    </Routes>
                </div>
            </>
        )}
          </>
  )
}

export default Home