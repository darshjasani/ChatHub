import { Button } from '@material-ui/core';
import React,{useState, useEffect} from 'react';
import './Forgetpwd.css'
import {auth,provider} from './firebase.js';
import { useStateValue } from './StateProvider';
import { actionTypes } from './Reducer';
import db from './firebase';
import { useNavigate } from 'react-router-dom';


const Forgetpwd = ()=>{
    
    const [state,dispatch] = useStateValue();
    const [hide, setHide] = useState(true);
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [cpwd, setCpwd] = useState('');
    const history = useNavigate();
    
    useEffect(()=>{
        if(state.user != null){
            history('/home');
        }
    },[state.user])

    const validate = () =>{
        if(email == '')
            alert('Please enter details!!')
        else if(!hide && (pwd == '' || cpwd == '' || pwd != cpwd)){
            alert("Password doesn't match!!")
        }
        else
            validateCredentials();
    }

    const validateCredentials = async ()=>{
        try{
            const dbRef = db.collection("login");

            dbRef.where('email','==', email)
            .get()
            .then((snapshot)=>{
                if(!snapshot.empty){
                    if(!hide){
                        dbRef
                        .doc(snapshot.id)
                        .set({
                            email:email,
                            password:pwd,
                        })
                        dispatch({
                            type: actionTypes.SET_USER,
                            user:email,
                            userId:snapshot.id
                        });
                    }
                    else{
                        setHide(false);
                    }
                }
                else{
                    alert("Email doesn't exist!!");
                }
            })   
        }catch(error){
            console.log(error);
        }
    }
    return (
        <>
            <div className='forgetBody'>
                <div className='card'>
                    <div className='forget'>
                        <div className='logo'>
                            <></>
                            <>ChatHub</>
                        </div>
                        <div>
                            Enter Username :<br/>
                            <input 
                            className='email' 
                            type='text' 
                            placeholder='Enter username'
                            onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>
                        {!hide && 
                        <>
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
                        </>}
                        <div className='forgetButton'>
                            <button onClick={validate}>{hide ? 'Submit' : 'Change Password'}</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
      )
}

export default Forgetpwd;