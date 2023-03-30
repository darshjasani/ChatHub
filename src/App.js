import React,{useState} from 'react';
import './App.css';
import Header from './Header.js';
import Sidebar from './Sidebar.js';
import Chat from './Chat.js';
import Progress from './Progress'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Login.js';
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
          <Login/>
        ) :
        (
          <>
        
          <Header />
          <div className='app_body'>
              {/* Sidebar */}
              <Sidebar />


              {/* React Router -> Chat Screen */}

              <Routes>
                <Route path='/' element={<h1>Welcome</h1>} />
                <Route path='/Therads' element={<Progress name="Threads"/>} />
                <Route path='/Apps' element={<Progress name="Apps"/>} />
                <Route path='/Mentions & Reactions' element={<Progress name="Mentions & Reactions"/>} />
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
