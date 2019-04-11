import React from 'react'
import loadingGif from '../../img/preloader.gif';
import './LoadingStyle.css'

const Loading = () =>{
    return (
        <div className='loading-background'>
            <div className='loading-img'>
            <img className='loading-all' src={loadingGif}/>
            </div>
        </div>
    )
};

export default Loading;