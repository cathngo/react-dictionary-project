import React from 'react'
import {ReactComponent as GreenBlob} from '../green-blob.svg'
import logo from '../logo.svg'
export default function Home() {
    return (
        <>
            <div className='home-container'>
               <GreenBlob className='green-shape'></GreenBlob>
                <article className='word-box'>
                    <p className='home-header'>Welcome to <span className='dictionary-emphasis'>Dictionary</span>. 
                    Search for definitions, find synonyms and save your favourite words.</p>
                </article>
                    <img src={logo} alt='logo' className='logo-home'/>
            </div>
        </>
    )
}