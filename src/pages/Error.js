import React from 'react' 
import errorImg from '../404.svg'
import { useNavigate } from "react-router-dom";

export default function Error({found}) {
    const navigate = useNavigate();

    function handleHome() {
        navigate("/")
    }

    return (
        <>
        <div className='error-container'>
            <div className='error-grid'>
                <div className='error-content'>
                <h1>Oops! Page not found.</h1>
                {!found?<p>Sorry, the page you were looking for could not be found. </p> : <p>Sorry, an error occured trying to find your word. Please try again later. </p>}
                <button className='home-button' onClick={handleHome}>Take me home</button>
                </div>
            </div>
            <img src={errorImg} alt='error' className='error-img'/>
        </div>
        </>
    )
    
}