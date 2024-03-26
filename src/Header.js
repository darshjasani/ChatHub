import { Avatar } from '@material-ui/core';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import React, { useState, useEffect } from 'react'
import './Header.css';
import {useStateValue} from './StateProvider';
import {useNavigate} from "react-router-dom"; 

const Header = ()=>{
    const [{ user, profileUrl}] = useStateValue();
    const [hide, setHide] = useState(true);
    const history = useNavigate();
    const showProfile = ()=>{
        history('/profile');
    }
    useEffect(()=>{
        if(user == null){
            history('/login');
        }
    },[user])


    const logout = ()=>{
        history('/logout')
    }
    const showCard = ()=>{
        setHide(false);
    }
    const hideCard = ()=>{
        setHide(true);
    }
    return(
        <div className='header'>

            <div className='header_left'>
                <h2>ChatHub</h2>
                <AccessTimeIcon/>
            </div>

            <div className='header_search'>
                {/* Search Icon */}
                <SearchIcon/>
                {/** Input */}
                <input placeholder='Search Anything'></input>
            </div>

            <div className='header_right' >
                {/* Avatar for user */}
                <div className='avatar' onMouseEnter={showCard} onMouseLeave={hideCard}>
                    <Avatar  src={profileUrl}/>
                </div>
                {/* Time icon */}

                <div className='header_card' style={{display : hide ? 'none' : 'block'}} onMouseEnter={showCard} onMouseLeave={hideCard}>
                    <div className='cardBody'>
                        <div>
                            <div className='cardSection' onClick={showProfile}>Your Profile</div>
                            <div className='cardSection'>About</div>
                            <div className='cardSection'>Contact Us</div>
                        </div>
                        <hr/>
                        <div>
                            <div className='cardSection' onClick={logout}>Sign Out</div>
                            <div className='cardSection' onClick={logout}>Sign Out</div>
                            <div className='cardSection' onClick={logout}>Sign Out</div>
                            <div className='cardSection' onClick={logout}>Sign Out</div>
                        </div>
                        <hr/>
                        <div>
                        <div className='cardSection' onClick={logout}>Sign Out</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Header;