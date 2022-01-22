import React , {useState} from 'react'
import history from '../history';
import trash from '../trash.svg'

export default function SavedWords() {
    const storedWords = JSON.parse(localStorage.getItem('savedWords'));
    const [displayList, setDisplayList] = useState(storedWords === null? ['emptyList']: storedWords)

    //display definition of synonym clicked
    const handleWord = (word) => {
        history.push(`/define/${word}`)
        window.location.reload()
    }

    //delete item from list 
    const handleDelete = (word) => {

        for (let i = 0; i < storedWords.length; i++) {
            console.log(storedWords[i])
        }
        
        //create new list without target word to remove
        const newList = storedWords.filter(item => item !== word)
        localStorage.setItem('savedWords', JSON.stringify(newList))
        setDisplayList(newList)
       
        if (newList.length < 1) {
            setDisplayList(['emptyList'])
        }
    }

    return (
        <>
            <div className='save-container'>
                <p className='vocab-list-title'>Your Vocabulary List</p>
                <div className='vocab-underline'></div>
                <div className='saved-words'>
                    {
                    displayList.map((item, index)=> {
                        return (item === 'emptyList'? <p>Your list is empty. Search for a word and click on the bookmark icon to save it!</p>:
                        <div className='word-delete'>
                            <p key={index+23} onClick={()=>{handleWord(item)}} className='click-word'>{item}</p>
                            <img src={trash} alt='delete' className='delete' onClick={()=>handleDelete(item)}/>
                        </div>)
                    })}
                </div>
            </div>
        </>
    )
}