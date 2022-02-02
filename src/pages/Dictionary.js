import React, {useState, useEffect} from 'react'
import {ReactComponent as Bookmark} from '../bookmark.svg'
import {useParams} from 'react-router-dom'
import audio from '../audio.svg'
import Error from './Error'
import { useNavigate } from "react-router-dom";
import Loading from './Loading'

const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

export default function Dictionary() {
    const {word} = useParams()
    const [content, setContent] = useState({title: '', 
                                            synonyms: [],
                                            text: '',
                                            audio: '',
                                            meanings: []
                                        })

    const [isSaved, setIsSaved] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate();

    //saved state of word                                
    useEffect(()=>{
        if (checkIsStored()) {
            setIsSaved(true)
        } else {
            setIsSaved(false)
        }
    }, [word])

    function combinePhonetics(phonetics) {
        let combinedText = ''
        phonetics.map((item)=>{
            if (combinedText == '') {
                combinedText = combinedText + item['text']
            } else {
                combinedText = combinedText + ","+ item['text']
            }
        })

        return combinedText
    }

    useEffect(()=> {
        const fetchResults = async () => {
            try {
                const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
                const data = await response.json()
                const status = await response.status
                console.log(data)
                console.log(status)
                
                if (status !==  200) {
                    setIsLoading(false)
                    setIsError(true)

                }
                
                else  {
                    //combine text phoenetics into one string
                    let combinedText = ''
                    if (data[0]['phonetics'].length !== 0) {
                        data[0]['phonetics'].map((item)=>{
                            if (combinedText == '') {
                                combinedText = combinedText + item['text']
                            } else {
                                combinedText = combinedText + ","+ item['text']
                            }
                        })
                    }
                    
                   //grab each synonym and put into one array
                    const synonymArray = []
                    data[0]['meanings'].map((item)=> {
                    item['definitions'][0]['synonyms'].map((item)=>{
                            synonymArray.push(item)
                        })
                    })
                    
                    //set the data to state
                    setContent({title: data[0]['word'], 
                        text: data[0]['phonetics'].length === 0 ? null : '/' + combinedText + "/",
                        audio: data[0]['phonetics'].length === 0 ? null: data[0]['phonetics'][0]['audio'],
                        meanings: data[0]['meanings'],
                        synonyms: synonymArray,
                    })
                
                    //stop loading
                    setIsLoading(false)
                }
      
            } catch (error) {
                console.log(error)
                setIsLoading(false)
                setIsError(true)
            }
        }
        fetchResults()

    }, [word])

    //audio pronunciation of word
    const playAudio = () => {
        let audio = new Audio(content.audio)
        audio.play()
    }

    //display definition of synonym clicked
    const handleSynonym = (synonym) => {
        setIsLoading(true)
        navigate(`/define/${synonym}`)
    }

    const favouriteWord = () => {
        setIsSaved(!isSaved)
    }

    function checkIsStored() { 
        const storedWords = JSON.parse(localStorage.getItem('savedWords'));

        if (storedWords === null) {
            return false
        }

        for (let i = 0; i < storedWords.length; i++) {
            if (storedWords[i] === word) {
                return true
            }
        }

        return false
    }

    useEffect(()=>{
        const storedWords = JSON.parse(localStorage.getItem('savedWords'));

        //save word if they clicked true and not already saved
        if (isSaved === true && !checkIsStored()) {

            //if no words in local storage saved, save curr word
            if (storedWords == null) {
                localStorage.setItem('savedWords', JSON.stringify([word]))
            } else {
                //get words in storage and save to newlist along with curr word
                const newList = [word]
                storedWords.map((item) => {
                    newList.push(item)
                })
            
                //save new array to localstorage
                localStorage.setItem('savedWords', JSON.stringify(newList))
            }      
        } else if (isSaved == false && storedWords !== null && checkIsStored()) {
            //create new list without target word to remove
            const newList = storedWords.filter(item => item !== word)
            localStorage.setItem('savedWords', JSON.stringify(newList))
        }
    },[isSaved])

    //show error page if could not fetch definition
    if (isError) {
        return <Error found={true}/>
    }
    else if (isLoading) {
        return <Loading/>
    }

    else {
        return (
            <>
                <div className='dict-container'>
                    <div className='synonym-container'>
                        <div>
                            <p className='synonym-title'>Synonyms</p>
                            <div className='synonym-underline'></div>
                        </div>
                        <div className='words-container'>
                            {content.synonyms.map((item,index)=>{
                                return(<span className='synoynm-words' key={index+13} onClick={()=>handleSynonym(item)}>{item}</span>)
                            })}
                        </div>
                    </div>
                    <div>
                        <div className='definition-container'>
                            <p className='definition-title'>Definition</p>
                            <div className='definition-underline'></div>
                            <div className='definition-header'>
                                { isSaved == true ?  <Bookmark fill='#F4B6B6' className='clickable' onClick={favouriteWord}/> :
                                    <Bookmark onClick={favouriteWord} className='clickable'/>
                                }
                                <span style={{fontSize: '40px'}}>{content.title}</span>
                            </div>
                            <div className='phonetics'>
                                <p className='pronunciation'>{content.text}</p>
                                {content.audio !== null && <img src={audio} alt='audio' onClick={playAudio} className='audio'/>}
                            </div>
                            {content.meanings.map((item, index)=>{
                                return(
                                <div key={index}>
                                    <p className='definition' key={index + 5}>{item['partOfSpeech']}</p>
                                    <p className='definition' key={index + 3}>{item['definitions'][0]['definition']}</p>
                                </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}