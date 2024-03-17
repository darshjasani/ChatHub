import React,{useState} from 'react';
import './App.css';
import Header from './Header.js';
import Sidebar from './Sidebar.js';
import Chat from './Chat.js';
import Progress from './Progress'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './Login.js';
import Signup  from './Signup.js';
import Logout from './Logout.js';
import Forget from './Forgetpwd.js';
import { useStateValue } from './StateProvider';
function App() {
  //const [user,setUser] = useState(null);
  const [{user},dispatch] = useStateValue();

  return (
    <div className="App">
    <Router>
        {/* Header */}
        {!user ? 
        (
          <>
            <Login/>
            <Routes>
              <Route path='/login' element={<Login/>}/>
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/forgetpwd' element={<Forget/>} />
            </Routes>
          </>
        ) :
        (
          <>
        
          <Header />
          <div className='app_body'>
              {/* Sidebar */}
              <Sidebar />


              {/* React Router -> Chat Screen */}

              <Routes>
                <Route path='/' element={<>Welcome</>} />
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
        
    </Router>
      
      
    </div>
  );
}

export default App;
