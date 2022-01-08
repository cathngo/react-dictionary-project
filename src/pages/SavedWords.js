import React from 'react'

export default function SavedWords() {
    
    const storedWords = JSON.parse(localStorage.getItem('savedWords'));

    var displayList = ['no words']
    if (storedWords !== null) {
        displayList = storedWords
    }

    return (
        <>
            <div className='save-container'>
                <p className='vocab-list-title'>Your Vocabulary List</p>
                <div className='vocab-underline'></div>
                <div className='saved-words'>
                    {displayList.map((item, index)=> {
                        return <p key={index+23}>{item}</p>
                    })}
                </div>

            </div>
        </>
    )
}