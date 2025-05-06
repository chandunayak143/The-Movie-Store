import React, { useState, useEffect } from 'react';
import NavbarPage from '../NavbarPage/NavbarPage';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import GammingVideoCard from '../GammingVidepCard/GammingVideoCard';

const GamingVideo = () => {
    const loginPageNavigation = useNavigate()
    const [gammingVideoList, setGammingVideoList] = useState([]);

    useEffect( () => {
        const token = Cookies.get('jwt_token');
        if(token === undefined){
          return loginPageNavigation('/login')
        }
      },[])

      useEffect( () => {
        const getGammingVideos = async () => {
        const api = 'https://apis.ccbp.in/videos/gaming';
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
        setGammingVideoList(fetchedData)
       }
        getGammingVideos();
      },[])

  return (

    <>
    <NavbarPage/>
    <div className='trending-video-container'>
        <h1 className='trending-video-title'>GAMING VIDEOS</h1>
        <ul className='home-vidoes-list'>
        {gammingVideoList.map((eachItem) => {
          return <GammingVideoCard videoDetails={eachItem} key={eachItem.id} />;
       })}
        </ul>
    </div>
    </>
  )
}


export default GamingVideo