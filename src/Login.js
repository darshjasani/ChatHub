import { Button } from '@material-ui/core';
import React,{useState} from 'react';
import './Login.css'
import {auth,provider} from './firebase.js';
import { useStateValue } from './StateProvider';
import { actionTypes } from './Reducer';
import db from './firebase';
const Login = ()=>{
    const [state,dispatch] = useStateValue();
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
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
    const validate = () =>{
        if(email == '' || pwd == '')
            alert('Please enter details!!')
        else
            validateCredentials();
    }
    const validateCredentials = ()=>{
        try{
            const dbRef = db.collection("login");
            dbRef.where('email','==', email)
            .where('password','==', pwd)
            .limit(1)
            .get()
            .then(function(querySnapshot){
                if(querySnapshot.docs.length == 1){
                    dispatch({
                        type: actionTypes.SET_USER,
                        user:email,
                    });
                }
                else{
                    alert('Email or Password is incorrect');
                }
            });
            
        }catch(error){
            console.log(error);
        }
    }
    return (
        <>
            <div className='loginBody'>
                <div className='card'>
                    <div className='login'>
                        <div className='logo'>
                            <></>
                            <>ChatHub</>
                        </div>

                        <p>Login into your Account</p>
                        <div>
                            Username :<br/>
                            <input 
                            className='email' 
                            type='text' 
                            placeholder='Enter username'
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            Password :<br/>
                            <input 
                            className='pwd' 
                            type='password' 
                            placeholder='Enter password'
                            onChange={(e) => setPwd(e.target.value)}
                            />
                        </div>
                        <div className='forgetpwd'>
                            <a href='/forgetpwd'>Forget Password?</a>
                        </div>
                        <div className='loginButton'>
                            <button onClick={validate}>Login</button>
                        </div>
                        <hr/>
                        <div className='socialButtons'>
                            <button className='google' onClick={signIn}></button>
                            <button className='facebook' onClick={signIn}></button>
                            <button className='linkedin' onClick={signIn}></button>
                        </div>
                        <div className='signupLink'>
                            Don't have an account? <a href='/signup'>Sign Up</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
      )
}

export default Login;