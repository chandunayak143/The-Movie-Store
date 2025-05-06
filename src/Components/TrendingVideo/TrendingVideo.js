import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import TrendingVideoCard from '../TrendingVideoCard/TrendingVideoCard';
import './TrendingVideo.css';
import NavbarPage from '../NavbarPage/NavbarPage';

const TrendingVideo = () => {
    const loginPageNavigation = useNavigate()
    const [trendingVideoList, setTrendingVideoList] = useState([]);

    useEffect( () => {
        const token = Cookies.get('jwt_token');
        if(token === undefined){
          return loginPageNavigation('/login')
        }
      },[])

      useEffect( () => {
        const getTrendingVideos = async () => {
        const api = 'https://apis.ccbp.in/videos/trending';
        const jwtToken = Cookies.get('jwt_token');
        const options = {
            method : 'GET',
            headers : {
                Authorization : `Bearer ${jwtToken}`
            },
        }
        const response = await fetch(api, options);
        const data = await response.json()
        const fetchedData = data.videos.map( (eachItem) => ({
            id : eachItem.id,
            title : eachItem.title,
            thumbnailUrl : eachItem.thumbnail_url,
        }))
        setTrendingVideoList(fetchedData)
       }
        getTrendingVideos()
      },[])

  return (

    <>
    <NavbarPage/>
    <div className='trending-video-container'>
        <h1 className='trending-video-title'>TRENDING VIDEOS</h1>
        <ul className='home-vidoes-list'>
        {trendingVideoList.map((eachItem) => {
    return <TrendingVideoCard videoDetails={eachItem} key={eachItem.id} />;
       })}
        </ul>
    </div>
    </>
  )
}

export default TrendingVideo