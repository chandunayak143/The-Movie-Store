import React from 'react';
import { FaPlay } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './Videos.css';

const Videos = (props) => {
    const {videoDetails} = props;
    const {title, id, thumbnailUrl} = videoDetails
    const specificVideo = useNavigate()

    const onGetSpecificVideoItem = () => {
        specificVideo(`/homevideos/${id}`)
    }
  return (
    <li className='list'>
        <img src={thumbnailUrl} key={id} alt={title} className='thumb-nail-image'/>
        <div className='title_and_button'>
            <h3 className='title'>{title}</h3>
            <button className='watch-btn' onClick={onGetSpecificVideoItem}> <FaPlay className='btn-icon-watch' />WATCH</button>
        </div>
        
    </li>
  )
}

export default Videos