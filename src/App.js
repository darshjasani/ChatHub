import './App.css';
import Header from './Header.js';
import Sidebar from './Sidebar.js';
function App() {
  return (
    <div className="App">
      <h1>Hello DJ</h1>

      {/* Header */}
      <Header />
      <div className='app_body'>
          {/* Sidebar */}
          <Sidebar/>

          {/* React Router -> Chat Screen */}
      </div>
      
    </div>
  );
}

export default App;
