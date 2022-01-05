import React from 'react'
import bookmark from '../bookmark.svg'
export default function Dictionary() {
    return (
        <>
        <div className='dict-container'>
            <div className='synonym-container'>
                <div>
                    <p className='synonym-title'>Synonyms</p>
                    <div className='synonym-underline'></div>
                </div>
                <div className='words-container'>
                    <span className='synoynm-words'>word</span>
                </div>
            </div>
            <div>
                <div className='definition-container'>
                    <p className='definition-title'>Definition</p>
                    <div className='definition-underline'></div>
                    <div className='definition-header'>
                        <img src={bookmark} alt='bookmark'/>
                        <span style={{fontSize: '40px'}}>reindeer</span>
                        <span style={{fontSize: '25px'}}>noun</span>
                    </div>
                    <p className='pronunciation'>rein·​deer | \ ˈrān-ˌdir  \</p>
                    <p className='definition'>a deer of the tundra and subarctic regions of Eurasia and North America, both sexes of which have large branching antlers. Most Eurasian reindeer are domesticated and used for drawing sledges and as a source of milk, flesh, and hide.</p>
                </div>
            </div>
        </div>
        </>
    );
}