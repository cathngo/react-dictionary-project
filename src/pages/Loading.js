import React from 'react'
import { CircularProgress } from '@mui/material';


export default function Loading() {
    return (
        <div className='load-container'>
            <CircularProgress/>
            <p className='load'>Loading...</p>
        </div>
    )
}