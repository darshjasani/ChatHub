import { Button } from '@material-ui/core';
import React,{useState, useEffect} from 'react';
import './Forgetpwd.css'
import {auth,provider} from './firebase.js';
import { useStateValue } from './StateProvider';
import { actionTypes } from './Reducer';
import db from './firebase';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { LeakAdd } from '@mui/icons-material';

const Forgetpwd = ()=>{
    
    const [state,dispatch] = useStateValue();
    const [hide, setHide] = useState(true);
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [cpwd, setCpwd] = useState('');
    const [spwdt, setspwdT] = useState('password')
    const [scpwdt, setscpwdT] = useState('password')
    const history = useNavigate();
    const [showq, setShowq] = useState('none');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const showPwd = ()=>{
        let spwd = document.getElementsByClassName('spwd')[0].type;
        setspwdT(spwd !== "password" ? "password" : "text")
    }

    const showCpwd = ()=>{
        let scpwd = document.getElementsByClassName('scpwd')[0].type;
        setscpwdT(scpwd !== "password" ? "password" : "text")
    }


    const validate = () =>{
        if(email == '')
            alert('Please enter details!!')
        else if(!hide && (pwd == '' || cpwd == '' || pwd != cpwd)){
            alert("Password doesn't match!!")
        }
        else if(!emailRegex.test(email)){
            alert("Invalid email!!")
        }
        else if(!hide && (pwd.length < 8 || pwd.length > 16))
            alert('Password should be 8 to 16 character long')
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
                            Enter Email :<br/>
                            <input 
                            className='email' 
                            type='text' 
                            placeholder='Enter email id'
                            onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>
                        {!hide && 
                        <>
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
                        
                        </>}
                        <div className='forgetButton'>
                            <button onClick={validate}>{hide ? 'Submit' : 'Change Password'}</button>
                        </div>
                        
                        <div className='backButton'>
                            <button onClick={()=>history('/login')}>Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
      )
}

export default Forgetpwd;