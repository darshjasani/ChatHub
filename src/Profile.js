import React, { useState } from 'react'
import './Profile.css'
import { Link} from 'react-router-dom'
import { useStateValue } from './StateProvider';
import {useNavigate} from "react-router-dom"; 
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import db from './firebase.js';

function Profile() {
    const [{user,userId}] = useStateValue();
    const [details, setDetails] = useState({email:user, password:''});
    
    const changeData = (e)=>{
      setDetails({...details,[e.target.name]:e.target.value})
    }
    const updateDetails = ()=>{
      console.log(details)
      try{
        db.collection('login')
        .doc(userId)
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
              <Link to="/home">Home</Link><span style={{paddingTop:'3px'}}>/</span><Link to="/profile">Profile</Link>
            </div>

            <div className='profileDetails'>
                <div className='profileDetailsLeft'>
                  {user && <img src={ user.photoURL == null ? 'https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg=' : user.photoURL }/>}
                </div>
                <div className='profileDetailsRight'>
                  <div className='userName'>
                    Username : &nbsp;
                    <input
                    name='email'
                    type='text'
                    placeholder='Enter the name'
                    value={details.email}
                    onChange={changeData}
                    />
                  </div>

                  <div className='userName'>
                    Password : &nbsp;
                    <input
                    name='password'
                    type='text'
                    placeholder='Enter the password'
                    value={details.password}
                    onChange={changeData}
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