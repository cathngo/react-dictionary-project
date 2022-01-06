import React, {useState, useContext} from 'react'
import logo from '../logo.svg'
import bookmark from '../bookmark.svg'
import search from '../search.svg'
//link
import { Link } from "react-router-dom";
//context api
import { useGlobalContext } from '../context';
//page switch
import history from '../history';

import Dictionary from '../pages/Dictionary';
export default function Navbar() {
    const {searchTerm, setSearchTerm} = useGlobalContext()

    const handleSubmit = (e) => {
        //redirect to definition page
        history.push(`/define/${searchTerm}`)
        //setSearchTerm('')
    }
    
    return (
        <nav className='nav-header'>
            <div className='nav-left'>
                <img src={logo} alt='logo' className='logo'/>
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