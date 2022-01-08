import React from 'react'
import history from '../history';

export default function SavedWords() {
    
    const storedWords = JSON.parse(localStorage.getItem('savedWords'));

    var displayList = ['no words']
    if (storedWords !== null) {
        displayList = storedWords
    }

    //display definition of synonym clicked
    const handleWord = (word) => {
        history.push(`/define/${word}`)
        window.location.reload()
    }


    return (
        <>
            <div className='save-container'>
                <p className='vocab-list-title'>Your Vocabulary List</p>
                <div className='vocab-underline'></div>
                <div className='saved-words'>
                    {displayList.map((item, index)=> {
                        return <p key={index+23} onClick={()=>{handleWord(item)}}>{item}</p>
                    })}
                </div>

            </div>
        </>
    )
}