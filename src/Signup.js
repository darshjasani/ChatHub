import { Button } from '@material-ui/core';
import React,{useState, useEffect} from 'react';
import './Signup.css'
import {auth,provider} from './firebase.js';
import { useStateValue } from './StateProvider';
import { actionTypes } from './Reducer';
import db from './firebase';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import gImg from './images/google.jpeg'
import firebase  from 'firebase/compat/app';


const Signup = ()=>{

    const [state,dispatch] = useStateValue();
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [cpwd, setCpwd] = useState('');
    const [spwdt, setspwdT] = useState('password')
    const [scpwdt, setscpwdT] = useState('password')
    const [showq, setShowq] = useState('none');
    const history = useNavigate();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    useEffect(()=>{
        if(state.user != null){
            history('/home');
        }
    },[state.user])

    const showPwd = ()=>{
        let spwd = document.getElementsByClassName('spwd')[0].type;
        setspwdT(spwd !== "password" ? "password" : "text")
    }

    const showCpwd = ()=>{
        let scpwd = document.getElementsByClassName('scpwd')[0].type;
        setscpwdT(scpwd !== "password" ? "password" : "text")
    }

    const generateName = ()=>{
        let result = ''
        for (let i = 0; i < 8; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        } 
        return result
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
                    if(!snapshot.empty){
                        alert("Email already exists!!")
                    }
                    else{
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

                            db.collection('userRooms').add({
                                userRef:data.id,
                                roomRef:"R9UVPYozljhskyR4gavU",
                                roomName:"general",
                                timeStamp:firebase.firestore.FieldValue.serverTimestamp(),
                            })
                        })

                        
                    }
                })
            })
            .catch(error=>{
                alert(error.message);
            })
    }

    const validate = ()=>{
        if(email === '' || pwd === '' || cpwd === ''){
            alert('Please enter the details!!');
        }
        else if(pwd !== cpwd){
            alert("Password doesn't match!!");
        }
        else if(!emailRegex.test(email)){
            alert('Invalid email id!!')
        }
        else if(pwd.length < 8 || pwd.length > 16){
            alert('Password should be 8 to 16 character only!!')
        }
        else{
            insertIntoDB();
        }
    }

    const insertIntoDB = async ()=>{
        try{
            const dbRef = db.collection("login");

            const snapshot = dbRef.where("email","==",email)
            .get()

            if(!( await snapshot).empty){
                alert("Email already exists!!");
            }
            else{
                let a = generateName()
                const query = dbRef.add({
                    email : email,
                    password : pwd,
                    imgUrl : 'https://firebasestorage.googleapis.com/v0/b/slack-cone-c0ca8.appspot.com/o/profileImages%2Fprofile_image.jpeg?alt=media&token=dbb32feb-6b60-430f-84c2-897f19e424df',
                    username : 'Guest ' + a
                });

                query.then((snapshot)=>{
                    dispatch({
                        type: actionTypes.SET_USER,
                        user: 'Guest' + a,
                        userId:snapshot.id,
                        profileUrl:'https://firebasestorage.googleapis.com/v0/b/slack-cone-c0ca8.appspot.com/o/profileImages%2Fprofile_image.jpeg?alt=media&token=dbb32feb-6b60-430f-84c2-897f19e424df'
                    })

                    db.collection('userRooms').add({
                        userRef:snapshot.id,
                        roomRef:"R9UVPYozljhskyR4gavU",
                        roomName:"general",
                        timeStamp:firebase.firestore.FieldValue.serverTimestamp(),
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
                            Email :<br/>
                            <input
                            className='email' 
                            type='text' 
                            placeholder='Enter email id'
                            onChange={(e)=> setEmail(e.target.value)}
                            />
                        </div>

                        <div className='passWord'>
                            <div>
                                Password :<br/>
                                <input 
                                className='spwd' 
                                type={spwdt} 
                                placeholder='Enter password'
                                onChange={(e) => setCpwd(e.target.value)}
                            />
                            </div>
                            <button onClick={showPwd}>{spwdt === "password" ? <VisibilityIcon/> : <VisibilityOffIcon/>}</button>
                            <span className='qIcon'onMouseEnter={()=>setShowq('block')} onMouseLeave={()=>setShowq('none')} ><QuestionMarkIcon/></span>
                            <span className='pDetails' style={{display:showq}}>Password should be 8 to 16 character long.</span>
                        </div>

                        <div className='passWord'>
                            <div>
                                Confirm Password :<br/>
                                <input 
                                className='scpwd' 
                                type={scpwdt} 
                                placeholder='Enter confirm password'
                                onChange={(e) => setPwd(e.target.value)}
                            />
                            </div>
                            <button onClick={showCpwd}>{scpwdt === "password" ? <VisibilityIcon/> : <VisibilityOffIcon/>}</button>
                        </div>
                        
                        <div className='signupButton'>
                            <button onClick={validate}>Sign Up</button>
                        </div>
                        <hr/>
                        <div className='ssocialButtons' onClick={signIn}>
                            <img src={gImg} />
                            <span>Sign In with Google</span>
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