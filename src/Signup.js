import { Button } from '@material-ui/core';
import React,{useState, useEffect} from 'react';
import './Signup.css'
import {auth,provider} from './firebase.js';
import { useStateValue } from './StateProvider';
import { actionTypes } from './Reducer';
import db from './firebase';
import { useNavigate } from 'react-router-dom';

const Signup = ()=>{
    const [display, setDisplay] = useState('login');
    const [state,dispatch] = useStateValue();
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [cpwd, setCpwd] = useState('');
    const history = useNavigate();

    useEffect(()=>{
        if(state.user != null){
            history('/home');
        }
    },[state.user])

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

    const validate = ()=>{
        if(email == '' || pwd == '' || cpwd == ''){
            alert('Please enter the details!!');
        }
        else if(pwd != cpwd){
            alert("Password doesn't match!!");
        }
        else{
            insertIntoDB();
        }
    }

    const insertIntoDB = async ()=>{
        try{
            const dbRef = db.collection("login");

            const snapshot = dbRef.where('email','==', email)
            .get()

            if(!( await snapshot).empty){
                alert("Email already exists!!");
            }
            else{
                const query = dbRef.add({
                    email : email,
                    password : pwd,
                });

                query.then((snapshot)=>{
                    dispatch({
                        type: actionTypes.SET_USER,
                        user:email,
                        userId:snapshot.id
                    })
                })
            }   
        }catch(error){
            console.log(error);
        }
    }

    return (
        <>
            <div className='signupBody'>
                <div className='signupCard'>
                    <div className='signup'>
                        <div className='logo'>
                            <></>
                            <>ChatHub</>
                        </div>

                        <p>Create your account</p>
                        <div>
                            Username :<br/>
                            <input
                            className='email' 
                            type='text' 
                            placeholder='Enter username'
                            onChange={(e)=> setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            Password :<br/>
                            <input 
                            className='pwd' 
                            type='password' 
                            placeholder='Enter password'
                            onChange={(e)=> setPwd(e.target.value)}
                            />
                        </div>
                        <div>
                            Confirm Password :<br/>
                            <input 
                            className='cpwd' 
                            type='password' 
                            placeholder='Confirm password'
                            onChange={(e)=> setCpwd(e.target.value)}
                            />
                        </div>
                        <div className='signupButton'>
                            <button onClick={validate}>Sign Up</button>
                        </div>
                        <hr/>
                        <div className='socialButtons'>
                            <button className='google' onClick={signIn}></button>
                            <button className='facebook' onClick={signIn}></button>
                            <button className='linkedin' onClick={signIn}></button>
                        </div>
                        <div className='loginLink'>
                            Already have an account? <a href='/login'>Log In</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
      )
}

export default Signup;