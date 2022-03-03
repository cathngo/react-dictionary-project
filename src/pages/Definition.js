import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios';
import {ReactComponent as Bookmark} from '../bookmark.svg'
import { useNavigate } from "react-router-dom";
import Key from '../key';
import Loading from './Loading';
import Error from './Error'

export default function Definition() {
    const {word} = useParams();
    const [synonyms, setSynonyms] = useState([]);
    const [isSaved, setIsSaved] = useState(false);
    const [results, setResults] = useState({});
    const [isError, setIsError] = useState(false);
    const [isDefinitionLoading, setIsDefinitionLoading] = useState(true);
    const [isSynonymLoading, setIsSynonymLoading] = useState(true);
    const [isPronunciationLoading, setIsPronunciationLoading] = useState(true);
    const [pronunciation, setPronunciation] = useState('');

    const navigate = useNavigate();

    const fetchPronunciation = () => {
        const options = {
            method: 'GET',
            url: `https://wordsapiv1.p.rapidapi.com/words/${word}/pronunciation`,
            headers: {
              'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
              'x-rapidapi-key': Key(),
            }
          };
          
          axios.request(options).then(function (response) {
              setPronunciation(response.data.pronunciation.all)
              setIsPronunciationLoading(false);
          }).catch(function (error) {
              setIsPronunciationLoading(false);
              setIsError(true);
              console.error(error);
          });
    }

    const fetchDefinition = () => {
        const definitions = {
            method: 'GET',
            url: `https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`,
            headers: {
            'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
            'x-rapidapi-key': Key(),
            }
        };

        axios.request(definitions).then((response)  => {
            const data = response.data;

            let seen = {};
            let definitions = {};

            data.definitions.forEach((def) => {
                if (seen[def.partOfSpeech] === true) {
                    definitions[def.partOfSpeech].push(def.definition);
                } else {
                    seen[def.partOfSpeech] = true;
                    definitions[def.partOfSpeech] = [def.definition];
                }
            })

            setResults(definitions);
            setIsDefinitionLoading(false);
  
        }).catch(function (error) {
            console.error(error);
            setIsDefinitionLoading(false);
            setIsError(true);
        });
    }
    
    const fetchSynonyms = () => {
        const synonyms = {
            method: 'GET',
            url: `https://wordsapiv1.p.rapidapi.com/words/${word}/synonyms`,
            headers: {
                'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
                'x-rapidapi-key': Key(),
            }
        };

        axios.request(synonyms).then(function (response) {
            const data = response.data;
            setIsSynonymLoading(false);
            setSynonyms(data.synonyms);

        }).catch(function (error) {
            setIsSynonymLoading(false);
            console.error(error);
        });
    }

    //display definition of synonym clicked
    const handleSynonym = (synonym) => {
        setIsDefinitionLoading(true)
        setIsSynonymLoading(true);
        navigate(`/define/${synonym}`) 
        
    }

    useEffect(()=>{
        fetchDefinition();
        fetchSynonyms();
        fetchPronunciation();

        if (checkIsStored()) {
            setIsSaved(true)
        } else {
            setIsSaved(false)
        }

    },[word])

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

    if (isDefinitionLoading || isSynonymLoading || isPronunciationLoading) {
        return <Loading/>
    } else if (isError) {
        return <Error found={false}/>
    } else {
        return (
            <>
                <div className='dict-container'>
                    <div className='synonym-container'>
                        <div>
                            <p className='synonym-title'>Synonyms</p>
                            <div className='synonym-underline'></div>
                        </div>
                        <div className='words-container'>
                            {synonyms.map((item, index)=>{
                                return(<span className='synoynm-words' key={index} onClick={()=>handleSynonym(item)} style={{cursor: 'pointer'}}>{item}</span>)
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
                                <span style={{fontSize: '40px'}}>{`${word}`}</span>
                                <p className='pronunciation'>/{pronunciation}/</p>
                            </div>
                            {Object.entries(results).map(([key,value])=>{
                                return (
                                    <>
                                        <p className='definition'>{key}</p>
                                        <ol>
                                            {value.map((definition)=> {
                                                return (
                                                        <li className='definition'>{definition}</li>
                                                );
                                            })}
                                        </ol>
                                    </>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
