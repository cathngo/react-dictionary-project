import React , {useState} from 'react'
import trash from '../trash.svg'
import { useNavigate } from "react-router-dom";

export default function SavedWords() {
    const storedWords = JSON.parse(localStorage.getItem('savedWords'));
    const [displayList, setDisplayList] = useState(storedWords === null || storedWords.length === 0? ['emptyList']: storedWords)
    const navigate = useNavigate()

    //display definition of synonym clicked
    const handleWord = (word) => {
        navigate(`/define/${word}`)
    }

    //delete item from list 
    const handleDelete = (word) => {
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
                        return (item === 'emptyList'? <p>Your list is empty.</p>:
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