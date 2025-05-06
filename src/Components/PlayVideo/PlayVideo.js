import React from 'react';
import ReactPlayer from 'react-player';
import './PlayVideo.css';
import {Link } from 'react-router-dom'
import NavbarPage from '../NavbarPage/NavbarPage';

const PlayVideo = (props) => {
    const {videoDetails,} = props 
    const {id, title, viewCount, thumbnailUrl, publishedAt, description ,videoUrl } = videoDetails;
  return (
    <>
    <NavbarPage/>
    <div className='play-video'>
    <div className='play-video-right'>
        <ReactPlayer url={videoUrl} controls width="80%" height="500px" />
        <h3 className='main-title'>{title}</h3>
        <div className='alignment-items'>
            <p className='description'>{description}</p>
            <p className='count'>{viewCount}</p>
            <p className='publish'>{publishedAt}</p>
        </div>
    </div>
    <div className='back-btn'>
    <Link to="/homevideos" className='style-link'>
    <button className='back-to-home-page'>Back</button>
    </Link>
    </div>
    </div>
    </>
  )
}

export default PlayVideo