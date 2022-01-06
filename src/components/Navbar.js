import React from 'react'
import logo from '../logo.svg'
import bookmark from '../bookmark.svg'
import search from '../search.svg'
//link
import { Link } from "react-router-dom";
export default function Navbar() {
    
    return (
        <nav className='nav-header'>
            <div className='nav-left'>
              
                <img src={logo} alt='logo' className='logo'/>
                
                <ul>
                    <li className='dict-text'>
                          <Link to='/' className='link'>Dictionary</Link>
                    </li>
                </ul>
    
            </div>
            <form className='search'>
                <div className='language'>English</div>
                <input type='text' placeholder='Search for a word' className='search-bar'/>
                <button className='search-button'><img src={search} alt='search'></img></button>
            </form>
       
            <div className='nav-right'>
                <img src={bookmark} alt='bookmark' className='bookmark'/>
                <ul>
                    <li>
                    <Link to='/save' className='link'>Saved Words</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}