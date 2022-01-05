import React from 'react'
import logo from '../logo.svg'
import bookmark from '../bookmark.svg'
import search from '../search.svg'

export default function Navbar() {
    return (
        <nav className='nav-header'>
            <div className='nav-left'>
                <img src={logo} alt='logo' className='logo'/>
                <ul>
                    <li className='dict-text'>Dictionary</li>
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
                    <li>Saved Words</li>
                </ul>
            </div>

        </nav>
    )
}