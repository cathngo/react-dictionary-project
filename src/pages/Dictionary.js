import React, {useState, useEffect} from 'react'
import {ReactComponent as Bookmark} from '../bookmark.svg'
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
                                            meanings: []
                                        })
    const prevState = localStorage.getItem(`${word}`)

    const [isSaved, setIsSaved] = useState(prevState === null || prevState === 'false'? false: true)


    useEffect(()=> {
        
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
                
                //set content with information from dictionary api
                setContent({title: data[0]['word'], 
                    text: '/' + combinedText + "/",
                    audio: data[0]['phonetics'][0]['audio'],
                    meanings: data[0]['meanings'],
                    synonyms: synonymArray,
                })

                console.log(content)

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

    //display definition of synonym clicked
    const handleSynonym = (synonym) => {
        history.push(`/define/${synonym}`)
        window.location.reload()
    }


    const favouriteWord = () => {
        setIsSaved(!isSaved)
     
    }
    /*
    //if previously saved, set value to saved
    useEffect(()=>{
        const prevState = localStorage.getItem(`${word}`)
        //save state of curr word in local storage
        if (prevState === null) {
            console.log('not previosult saved')
        } else {
            setIsSaved(prevState)
            console.log(isSaved)
        }

    },[])
    */
    function checkIsStored() {
        const stored = localStorage.getItem(`${word}Stored`)
        if (stored === 'true') {
            return true
        } else if (stored === null){
            return false
        }
    }

    useEffect(()=>{
        //check if any words saved in local storage
        const storedWords = JSON.parse(localStorage.getItem('savedWords'));

        //save state of curr word in local storage
        if (isSaved === true) {
            localStorage.setItem(`${word}`, 'true')
        } else {
            localStorage.setItem(`${word}`, 'false')
        }
  
   
        //save word if they clicked true and not already saved
        if (isSaved === true && !checkIsStored()) {
            //mark word as stored
            localStorage.setItem(`${word}Stored`, 'true')

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
            //remove word
           
            //localStorage.removeItem(`${word}`)
            //create new list without target word to remove
            const newList = storedWords.filter(item => item !== word)
            localStorage.setItem('savedWords', JSON.stringify(newList))
        }
    },[isSaved])


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
                        { isSaved == true ?  <Bookmark fill='#F4B6B6' onClick={favouriteWord}/> :
                            <Bookmark onClick={favouriteWord}/>
                        }
                        {/*<img src={bookmark} alt='bookmark' onClick={favouriteWord} ref={bookmarkRef}/>*/}
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