import { Button } from '@material-ui/core';
import React from 'react';
import './Login.css'
import {auth,provider} from './firebase.js';
import { useStateValue } from './StateProvider';
import { actionTypes } from './Reducer';

const Login = ()=>{
    const [state,dispatch] = useStateValue();
    const signIn = (e)=>{
        e.preventDefault();
        auth
            .signInWithPopup(provider)
            .then(result=>{
                //console.log(result);
                dispatch({
                    type: actionTypes.SET_USER,
                    user:result.user,
                })
            })
            .catch(error=>{
                alert(error.message);
            })
    }
    return(
        <div className='login'>
            <div className='login_container'>
                <img 
                src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
                alt=""
                />
                <h1>Sign in to DJ's Slack version</h1>
                <p>Welcome</p>
                <Button onClick={signIn}>Sign In with Google</Button>
            </div>
        </div>
    )
}

export default Login;