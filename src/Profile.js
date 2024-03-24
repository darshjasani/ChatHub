import React, { useEffect, useState } from 'react'
import './Profile.css'
import { Link} from 'react-router-dom'
import { useStateValue } from './StateProvider';
import {useNavigate} from "react-router-dom"; 
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import db from './firebase.js';
import firebase from 'firebase/compat/app';
import {imageDB} from './firebase.js'
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import {v4} from 'uuid'
import { actionTypes } from './Reducer.js';
import BackupIcon from '@mui/icons-material/Backup';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Profile() {
    const [state,dispatch] = useStateValue();
    const [details,setDetails] = useState({});
    const [pwd, setPwd] = useState('');
    const [pwdt, setpwdT] = useState('password')
    const [upload, setUpload] = useState(false);
    const [img, setImg] = useState('');
    const [imgurl, setImgurl] = useState(null);
    const history = useNavigate();
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];


    useEffect(()=>{
      const dbRef = db.collection('login');

      dbRef.doc(state.userId).get()
      .then((snapshot)=>{
          setDetails(snapshot.data());
      })

      console.log(details)
    },[])

    // const changeData = (e)=>{
    //   setDetails({...details,[e.target.name]:e.target.value})
    // }
    const updateImg = (e)=>{
      setImg(e.target.files[0])
      setUpload(false)
    }

    const showPwd = ()=>{
      let pwd = document.getElementsByClassName('pwd')[0].type;
      setpwdT(pwd === "password" ? "text" : "password")
  }
    const uploadImg = async ()=>{
      if(img !== '' && allowedTypes.includes(img.type)){
        const imgRef = ref(imageDB, `profileImages/${v4()}`)
        const uploadTask = await uploadBytes(imgRef, img)
        const snapshot = await uploadTask
        const url = await getDownloadURL(snapshot.ref)
        setImgurl(url)
        setDetails({...details, imgUrl:url})
        setUpload(true)
      }
      else
        alert('Please select an image file only!!')
      
    }

    const updateDetails = async ()=>{
      try{
        db.collection('login').doc(state.userId).set(details)
        
        dispatch({
          type:actionTypes.SET_USER,
          userId:state.userId,
          user:details.username,
          profileUrl:details.imgUrl
        })

        alert("Saved Sucessfully!!")

      }catch(error){
        console.log(error);
      }

      
    }
  return (
    <>
      <div className = 'profileBody'>
        <div className = 'profileCard'>
            <div className='profilePath'>
              <FolderOpenIcon/>&nbsp;
              <Link to="/home">Home</Link><span style={{paddingTop:'3px'}}>/</span><Link to="/profile">Profile</Link>
            </div>

            <div className='profileDetails'>
                <div className='profileDetailsLeft'>
                  {state.user && <img src={ details?.imgUrl == null ? 'https://firebasestorage.googleapis.com/v0/b/slack-cone-c0ca8.appspot.com/o/profileImages%2Fprofile_image.jpeg?alt=media&token=dbb32feb-6b60-430f-84c2-897f19e424df' : details.imgUrl }/>}
                </div>
                <div className='profileDetailsRight'>
                  <div className='details'>

                    <div className='username'>
                      Username : &nbsp; 
                      <input 
                      type='text'
                      placeholder='Enter username'
                      value={details?.username}
                      onChange={(e)=>setDetails({...details, username:e.target.value})}></input>
                    </div>
                    
                    <div className='email'>
                      Email : &nbsp;
                      <input
                      name='email'
                      type='text'
                      value={details.email}
                      />
                    </div>

                    <div className='ppassWord'>
                        <div>
                            Password :
                            <input 
                            className='pwd' 
                            type={pwdt} 
                            placeholder='Enter password'
                            value={details?.password}
                            onChange={(e)=>(setDetails({...details, password:e.target.value}))}
                        />
                        </div>
                        <button onClick={showPwd}>{pwdt === "password" ? <VisibilityIcon/> : <VisibilityOffIcon/>}</button>
                    </div>

                    <div className='image'>
                      <span>Image :</span>
                      <input className='imageFile' type='file' onChange={updateImg}></input>
                      <button onClick={uploadImg}>{upload ? <CloudDoneIcon style={{color:'green'}}/> : <BackupIcon/>}</button>
                    </div>
                    <button onClick={updateDetails}>Save</button>
                    <button onClick={()=>history('/home')}>Cancel</button>
                  </div>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Profile