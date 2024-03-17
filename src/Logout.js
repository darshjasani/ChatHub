import React from 'react'
import { actionTypes } from './Reducer';
import { useStateValue } from './StateProvider';

import './Logout.css'
function Logout() {
    const [{user},dispatch] = useStateValue();
    const logout = ()=>{
        dispatch({
            type: actionTypes.SET_USER,
            user:null,
        })
    }
  return (
    <>
        <div className='logoutBody'>
            <div className='logoutCard'>
                <p>Do you wish to logout?</p>
                <div className='buttons'>
                    <button onClick={logout}>Yes</button>
                    <button>No</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Logout;