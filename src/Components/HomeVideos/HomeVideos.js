import React,{useState, useEffect} from 'react';
import NavbarPage from '../NavbarPage/NavbarPage';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import { FaPlay } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import Videos from '../Videos/Videos';
import './HomeVideos.css'

//React Curasoul imports//
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const HomeVideos = () => {
    const loginPageNavigation = useNavigate();
    const [homeVidosList, setHomeVidesList] = useState([]);
    useEffect( () => {
        const getHomeVideosList = async () => {
            const jwtToken = Cookies.get('jwt_token')
            const url = 'https://apis.ccbp.in/videos/all?search='
            const options ={
                method : 'GET',
                headers:{
                    Authorization : `Bearer ${jwtToken}`
                },
            }
            const response = await fetch(url, options);
            if(response.ok === true){
                const data = await response.json()
                const updatedData = data.videos.map( (eachVideos) => ({
                    title :  eachVideos.title,
                    thumbnailUrl :eachVideos.thumbnail_url,
                    id : eachVideos.id,
                }))
                setHomeVidesList(updatedData)
            }else {
                console.log("Error")
            }
            
        }
        getHomeVideosList()
    },[]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1, 
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows : false,
      };
    
      const images = [
        'https://4kwallpapers.com/images/walls/thumbs_uwide/22233.jpg',
        'https://4kwallpapers.com/images/walls/thumbs_uwide/22251.jpg',
        'https://4kwallpapers.com/images/walls/thumbs_uwide/22248.jpg'
      ];

      useEffect( () => {
          const token = Cookies.get('jwt_token');
          if(token === undefined){
            return loginPageNavigation('/login')
          }
        },[])

  return (
   <>
   <div className='home-videos'>
   <NavbarPage/>
    <div className="carousel-container">
              <Slider {...settings}>
                {images.map((imgUrl, index) => (
                  <div key={index} className='carousel-slide'>
                    <img src={imgUrl} alt={`Slide ${index}`} className="carousel-image" />
                    <div className="carousel-text-overlay">
                        <button className='play-btn'> <FaPlay className='btn-icon' />PLAY</button>
                        <button className='more-info-btn'><IoIosInformationCircleOutline className='btn-icon'/>MORE INFO</button>
                  </div>    
                  </div>
                ))}
              </Slider>
        </div>
        </div>
        <ul className='home-vidoes-list'>
            {homeVidosList.map( (eachItem) => (
                <Videos videoDetails = {eachItem} key={eachItem.id}/>
            ))}
        </ul>
 
   </>
  )
}

export default HomeVideos