import React from 'react'
import './NavbarPage.css';
import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import { FiSearch } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";


const NavbarPage = () => {
  const loginPageRedirect = useNavigate();

  const onClickLogout = () => {
    Cookies.remove('jwt_token');
    loginPageRedirect('/login')
  }

  return (
    <div className='nav-bar'>
        <div className='nav-bar-right'>
            <Link to="/" className='styled-link'><h1 className='website-name'>THE MOVIE STORE</h1></Link>
            <div className='list'>
            <Link to="/homevideos" className='styled-link'><li className='list-item'>Home</li></Link>
            <Link to="/trending" className='styled-link'><li className='list-item'>Trending</li> </Link>
            <Link to="/gaming" className='styled-link'><li className='list-item'>Gaming</li></Link>
            </div>
        </div>
        <div className='nav-bar-left'>
            <div className='input-search-icon'>
              <input type="search" placeholder='Search...' className='search-input' />
            <button className='navbar-icon search'> <FiSearch /></button>
            </div>
            <button className='navbar-icon'> <IoMdNotificationsOutline /></button>
            <button className='logout-btn' onClick={onClickLogout}>LOG OUT</button>
        </div>
    </div>
  )
}

export default NavbarPage