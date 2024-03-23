import React,{useState} from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Chat from './Chat.js';
import Progress from './Progress'
import Logout from './Logout.js';
import Login from './Login.js';
import Signup  from './Signup.js';
import Forget from './Forgetpwd.js';
import { useStateValue } from './StateProvider';
import Home from './Home.js';
import Profile from './Profile.js';

function App() {
    const [{user}] = useStateValue();
  
  return (
    <div className="App">
        <Router>
          <Routes>
              <Route path='/profile' element={<Profile/>} />
              <Route path='/' element={<Login/>} />
              <Route path='/login' element={<Login/>}/>
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/forgetpwd' element={<Forget/>} />
              <Route path='/home' element={user ? <Home/> : <Login/>}/>
              <Route path='/Therads' element={<Home component={<Progress name="Therads"/>}/>} />
              <Route path='/Mentions & Reactions' element={<Home component={<Progress name="Mentions & Reactions"/>}/>} />
              <Route path='/Saved Items' element={<Home component={<Progress name="Saved Items"/>}/>} />
              <Route path='/Channel Browser' element={<Home component={<Progress name="Channel Browser"/>}/>} />
              <Route path='/People & User Groups' element={<Home component={<Progress name="People & User Groups"/>}/>} />
              <Route path='/Apps' element={<Home component={<Progress name="Apps"/>}/>} />
              <Route path='/File Browser' element={<Home component={<Progress name="File Browser"/>}/>} />
              <Route path='/Log Out' element={<Logout/>} />
              <Route path='/room/:roomID' element={<Home component={<Chat/>} />} />
          </Routes>
        </Router>

        
    </div>
  );
}

export default App;
