import React from 'react'
import { actionTypes } from './Reducer';
import { useStateValue } from './StateProvider';
import { useNavigate } from 'react-router-dom';
import './Logout.css'
function Logout() {
    const [{user},dispatch] = useStateValue();
    const history = useNavigate();
    const logout = ()=>{
        dispatch({
            type: actionTypes.SET_USER,
            user:null,
        })
        localStorage.setItem('userDetails',null);
        history('/login');
    }

    const gotToHome = ()=>{
        history('/home');
    }
  return (
    <>
        
        <div className='logoutBody'>
            <div className='logoutCard'>
                <p>Do you wish to logout?</p>
                <div className='buttons'>
                    <button onClick={logout}>Yes</button>
                    <button onClick={gotToHome}>No</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Logout;