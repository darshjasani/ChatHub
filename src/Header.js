import { Avatar } from '@material-ui/core';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import React from 'react'
import './Header.css';
const Header = ()=>{
    return(
        <div className='header'>

            <div className='header_left'>
                {/* Avatar for user */}
                <Avatar 
                    className='avatar'
                    alt="DJ"
                    src=""
                />
                {/* Time icon */}
                <AccessTimeIcon/>
            </div>

            <div className='header_search'>
                {/* Search Icon */}
                <SearchIcon/>
                {/** Input */}
                <input placeholder='Search Anything'></input>
            </div>

            <div className='header_right'>
                {/** Help Icon */}
                <HelpOutlineIcon/>
            </div>

        </div>
    );
}

export default Header;