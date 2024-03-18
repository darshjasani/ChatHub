import React, { useEffect, useState } from 'react'
import './Profile.css'
import { Link, useLocation } from 'react-router-dom'
import { useStateValue } from './StateProvider';
import { actionTypes } from './Reducer';
import {useNavigate} from "react-router-dom"; 
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { Avatar } from '@material-ui/core';
import db from './firebase.js';

function Profile() {
    const loc = useLocation();
    const [{user}] = useStateValue();
    const [details, setDetails] = useState([]);
    const history = useNavigate();
    useEffect(()=>{
      db.collection('login')
      .doc('e6uJtdSniVEqvnV44LHq')
      .onSnapshot(snapshot => (
            setDetails(snapshot.data())
      ))     
    },[])

    const updateDetails = ()=>{
      try{
        console.log(details);
        db.collection('login')
        .doc('e6uJtdSniVEqvnV44LHq')
        .update(details)
      }catch(error){
        console.log(error);
      }
    }
  return (
    <>
      <div className = 'profileBody'>
        <div className = 'profileCard'>
            <div className='profilePath'>
              <FolderOpenIcon/>&nbsp;
              <Link to="/Threads">Home</Link><span style={{paddingTop:'3px'}}>/</span><Link to="/profile">Profile</Link>
            </div>

            <div className='profileDetails'>
                <div className='profileDetailsLeft'>
                  <img src={ user.photoURL == null ? 'https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg=' : user.photoURL }/>
                </div>
                <div className='profileDetailsRight'>
                  <div className='userName'>
                    Username : &nbsp;
                    <input
                    type='text'
                    placeholder='Enter the name'
                    value={details.email}
                    onChange={(e)=>setDetails({...details, email:e.target.value})}
                    />
                  </div>

                  <div className='userName'>
                    Username : &nbsp;
                    <input
                    type='text'
                    placeholder='Enter the password'
                    value={details.password}
                    onChange={(e)=>setDetails({...details, password:e.target.value})}
                    />
                  </div>

                  <div className='userName'>
                    Username : &nbsp;
                    <input
                    type='text'
                    placeholder={user}
                    />
                  </div>

                  <div className='userName'>
                    Username : &nbsp;
                    <input
                    type='text'
                    placeholder={user}
                    />
                  </div>

                  <button onClick={updateDetails}>Save</button>
                  <button>Cancel</button>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Profile