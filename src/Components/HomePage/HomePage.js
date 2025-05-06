import React,{useEffect} from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import NavbarPage from '../NavbarPage/NavbarPage';

//React Curasoul imports//
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
  const loginPageNavigation = useNavigate();

  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows : false,
  };

  const images = [
    "https://4kwallpapers.com/images/walls/thumbs_3t/22170.jpg",
    "https://4kwallpapers.com/images/walls/thumbs_3t/22155.jpg",
    'https://4kwallpapers.com/images/walls/thumbs_3t/21035.jpeg',
    'https://4kwallpapers.com/images/walls/thumbs_2t/18549.jpg',
    'https://4kwallpapers.com/images/walls/thumbs_2t/17601.jpg',
    'https://4kwallpapers.com/images/walls/thumbs_uwide/22287.jpg',
  ];
  
  useEffect( () => {
    const token = Cookies.get('jwt_token');
    if(token === undefined){
      return loginPageNavigation('/login')
    }
  },[])

  return (
    <div className='home-page'>
      <NavbarPage/>
    <div className="carousel-container">
          <Slider {...settings}>
            {images.map((imgUrl, index) => (
              <div key={index} className='carousel-slide'>
                <img src={imgUrl} alt={`Slide ${index}`} className="carousel-image" />
                <div className="carousel-text-overlay">
               <h1 className="carousel-heading">THE <br/>MOVIE STORE</h1>
              </div>    
              </div>
            ))}
          </Slider>
        </div>
      </div>
  )
}

export default HomePage