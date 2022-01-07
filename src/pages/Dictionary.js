import React, {useState, useEffect} from 'react'
import bookmark from '../bookmark.svg'
import {useParams} from 'react-router-dom'
import audio from '../audio.svg'
//page switch
import history from '../history';

const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/'


export default function Dictionary() {
    const {word} = useParams()
    const [content, setContent] = useState({title: '', 
                                            synonyms: [],
                                            text: '',
                                            audio: '',
                                            meanings: []})

    useEffect(()=> {
        //console.log(word)
        const fetchResults = async () => {
            try {
                const response = await fetch(`${url}${word}`)
                const data= await response.json()
    
                //combine text phoenetics into one string
                let combinedText = ''
                data[0]['phonetics'].map((item)=>{
                    if (combinedText == '') {
                        combinedText = combinedText + item['text']
                    } else {
                        combinedText = combinedText + ","+ item['text']
                    }
                })


               //grab each synonym and put into one array
                const synonymArray = []
                data[0]['meanings'].map((item)=> {
                   item['definitions'][0]['synonyms'].map((item)=>{
                        synonymArray.push(item)
                    })
                })

                setContent({title: data[0]['word'], 
                    text: '/' + combinedText + "/",
                    audio: data[0]['phonetics'][0]['audio'],
                    meanings: data[0]['meanings'],
                    synonyms: synonymArray,
                })

            } catch (error) {
                console.log(error)
            }
        }
        fetchResults()
    }, [word])

    //audio pronunciation of word
    const playAudio = () => {
        let audio = new Audio(content.audio)
        audio.play()
    }

    const handleSynonym = (synonym) => {
          history.push(`/define/${synonym}`)
          window.location.reload()
    }
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
                        <img src={bookmark} alt='bookmark'/>
                        <span style={{fontSize: '40px'}}>{content.title}</span>
                    </div>
                    <div className='phonetics'>
                        <p className='pronunciation'>{content.text}</p>
                        <img src={audio} style={{marginTop: '20px'}} alt='audio' onClick={playAudio}/>
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