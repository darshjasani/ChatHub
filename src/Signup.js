import { Button } from '@material-ui/core';
import React,{useState} from 'react';
import './Signup.css'
import {auth,provider} from './firebase.js';
import { useStateValue } from './StateProvider';
import { actionTypes } from './Reducer';
import db from './firebase';
const Signup = ()=>{
    const [display, setDisplay] = useState('login');
    const [state,dispatch] = useStateValue();
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [cpwd, setCpwd] = useState('');
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
    const insertIntoDB = ()=>{
        try{
            const dbRef = db.collection("login");
            dbRef.where('email','==', email)
            .where('password','==', pwd)
            .limit(1)
            .get()
            .then(function(querySnapshot){
                if(querySnapshot.docs.length == 1){
                    alert("Email already exists!!");
                }
                else{
                    dbRef.add({
                        email : email,
                        password : pwd,
                    });
                    dispatch({
                        type: actionTypes.SET_USER,
                        user:email,
                    })
                }
            });    
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