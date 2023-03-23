import './App.css';
import Header from './Header.js';
import Sidebar from './Sidebar.js';
import Chat from './Chat.js';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
function App() {
  return (
    <div className="App">
    <Router>
        {/* Header */}
        <Header />
        <div className='app_body'>
            {/* Sidebar */}
            <Sidebar/>


            {/* React Router -> Chat Screen */}

            <Routes>
              <Route path='/' element={<h1>Welcome</h1>} />
              <Route path='/room/:roomID' element={<Chat/>}/>
            </Routes>

        </div>
    </Router>
      
      
    </div>
  );
}

export default App;
