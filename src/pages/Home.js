import React from 'react'

export default function Home() {
    return (
        <>
            <div className='home-container'>
                <article>
                    <p className='home-header'>Word of the Day</p>
                    <div className='home-underline'></div>
                    <div className='daily-word-box'>
                        <div className='word-noun'>
                            <h2 className='title'>kapta</h2>
                            <p >noun</p>
                        </div>
                        <p className='daily-word-definition'>A shirt of reindeer-skin worn by the Laplandas</p>
                    </div>
                </article>
            </div>
        </>
    )
}