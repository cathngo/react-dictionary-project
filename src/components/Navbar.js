import React, {useState, useContext} from 'react'
import logo from '../logo.svg'
import bookmark from '../bookmark.svg'
import search from '../search.svg'
//link
import { Link } from "react-router-dom";

//page switch
import history from '../history';

export default function Navbar() {
    const [searchTerm, setSearchTerm] = useState('')

    const handleSubmit = (e) => {
        //redirect to definition page
        history.push(`/define/${searchTerm}`)
    }
    
    return (
        <nav className='nav-header'>
            <div className='nav-left'>
                <Link to='/' className='link'>
                    <img src={logo} alt='logo' className='logo'/>
                </Link>
                <ul>
                    <li className='dict-text'>
                          <Link to='/' className='link'>Home</Link>
                    </li>
                </ul>
            </div>
            <form className='search' onSubmit={handleSubmit}>
                <div className='language'>English</div>
                <input type='text' 
                placeholder='Search for a word' 
                className='search-bar' 
                value={searchTerm} 
                onChange={(e)=>{setSearchTerm(e.target.value)}}
                />
                <button className='search-button' onClick={handleSubmit} style={{cursor:'pointer'}}><img src={search} alt='search'></img></button>
            </form>
            <div className='nav-right'>
                 <Link to='/save' className='link'>
                    <img src={bookmark} alt='bookmark' className='bookmark'/>
                </Link>
                <ul>
                    <li>
                    <Link to='/save' className='link'>Saved Words</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}