import React,{useState} from 'react';
import './App.css';


import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './Login.js';
import Signup  from './Signup.js';

import Forget from './Forgetpwd.js';
import { useStateValue } from './StateProvider';
import Profile from './Profile.js';
import Home from './Home.js';
function App() {
  //const [user,setUser] = useState(null);
  const [{user},dispatch] = useStateValue();
  
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/forgetpwd' element={<Forget/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
        {/* Header */}
        {!user ? 
        (
            <Login/>
        ) :
        (
          <Home/>
        )}
        
    </Router>
      
      
    </div>
  );
}

export default App;
