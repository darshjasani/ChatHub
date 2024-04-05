import { Button } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom'
import React,{useEffect, useState} from 'react';
import './Login.css'
import {auth,provider} from './firebase.js';
import { useStateValue } from './StateProvider';
import { actionTypes } from './Reducer';
import db from './firebase';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import gImg from './images/google.jpeg'
import logo  from './images/logo.jpeg'

const Login = ()=>{

    const [state,dispatch] = useStateValue();
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwdt, setpwdT] = useState('password')
    const history = useNavigate();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    useEffect(()=>{
        if(state.user != null){
            history('/home');
        }
    },[state.user])

    // useEffect(()=>{
    //     handleLinkedInCallback();
    // },[linkedIn])

    const showPwd = ()=>{
        let pwd = document.getElementsByClassName('pwd')[0].type;
        if(pwd === "password"){
            setpwdT('text')
        }
        else{
            setpwdT('password')
        }
    }

    const signIn = (e)=>{
        e.preventDefault();
        auth
            .signInWithPopup(provider)
            .then(result=>{
                
                db.collection('login')
                .where("email","==",result.user.email).
                get()
                .then((snapshot)=>{
                    if(snapshot.empty){
                        db.collection('login')
                        .add({
                            email : result.user.email,
                            password : "qazwsx",
                            imgUrl : result.user.photoURL,
                            username : result.user.displayName
                        })
                        .then((data)=>{
                            dispatch({
                                type: actionTypes.SET_USER,
                                user: result.user.displayName,
                                userId:data.id,
                                profileUrl:result.user.photoURL
                            })
                        })
                    }
                    else{
                        const data = snapshot.docs[0].data();
                        dispatch({
                            type: actionTypes.SET_USER,
                            user: snapshot.docs[0].id,
                            userId:snapshot.docs[0].id,
                            profileUrl:data.imgUrl
                        })
                    }
                })
            })
            .catch(error=>{
                alert(error.message);
            })
    }
    
    const guestLogin = ()=>{
        alert('Work in Progress!! Please use Login for now. Thank you!')
    }
    
    const validate = () =>{
        if(email == '' || pwd == '')
            alert('Please enter details!!')
        else if(!emailRegex.test(email))
            alert('Invalid email!!')
        else if(pwd.length < 8 || pwd.length > 16 )
            alert('Password length should be 8 to 16 only!!')
        else
            validateCredentials();
    }

    const validateCredentials = async () => {
        try{

            db.collection("login")
            .where('email','==', email)
            .where('password','==', pwd)
            .get().
            then((snapshot)=>{
                if(snapshot.size != 1){
                    alert('Email or Password is incorrect!!')
                }
                else{
                    db.collection("login").doc(snapshot.docs[0].id).get()
                    .then((data)=>{

                        dispatch({
                            type: actionTypes.SET_USER,
                            user:data.data().username,
                            userId:snapshot.docs[0].id,
                            isSocial:false,
                            profileUrl:data.data().imgUrl
                        })
                    })
                }
            });
            

            // .onSnapshot((snapshot)=>{
            //     let check = snapshot.empty
            //     if(check){
            //         console.log("Email or Password is incorrect!!!")
            //     }
            //     else{
            //         dispatch({
            //             type: actionTypes.SET_USER,
            //             user:email,
            //             userId:snapshot.docs[0].id,
            //             isSocial:false
            //         })
            //     }       
            // })    
        }catch(error){
            alert(error)
        }
    }
    
    return (
        <>
            <div className='loginBody'>
                <div className='card'>
                    <div className='login'>
                        <div className='logo'>
                            <span>ChatHub</span>
                        </div>

                        <p>Login into your Account</p>
                        <div>
                            Email :<br/>
                            <input 
                            className='email' 
                            type='text' 
                            placeholder='Enter email id'
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className='passWord'>
                            <div>
                                Password :<br/>
                                <input 
                                className='pwd' 
                                type={pwdt} 
                                placeholder='Enter password'
                                onChange={(e) => setPwd(e.target.value)}
                            />
                            </div>
                            <button onClick={showPwd}>{pwdt === "password" ? <VisibilityIcon/> : <VisibilityOffIcon/>}</button>
                        </div>

                        <div className='forgetpwd'>
                            <a href='/forgetpwd'>Forget Password?</a>
                        </div>

                        <div className='loginButton'>
                            <button onClick={validate}>
                                Login
                               
                            </button>
                        </div>

                       
                        <hr/>
                        <div className='socialButtons' onClick={signIn}>
                            <img src={gImg} />
                            <span>Sign In with Google</span>
                        </div>
                        <div className='signupLink'>
                            Don't have an account? <Link to='/signup'>Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
      )
}

export default Login;