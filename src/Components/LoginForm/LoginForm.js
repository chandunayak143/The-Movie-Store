import React, { useEffect, useState } from 'react'
import { RiMovieFill } from "react-icons/ri";
import {useNavigate} from 'react-router-dom'
import './LoginForm.css'
import Cookies from 'js-cookie';


//React Curasoul imports//
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const LoginForm = () => {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('')
  const [showErrorMsg,setShowErrorMsg] = useState(false);
  const homePageNavigation = useNavigate();

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1, 
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows : false,
    };

    const images = [
      "https://4kwallpapers.com/images/walls/thumbs_3t/22170.jpg",
      "https://4kwallpapers.com/images/walls/thumbs_3t/22121.jpg",
      "https://4kwallpapers.com/images/walls/thumbs_3t/22155.jpg",
      "https://4kwallpapers.com/images/walls/thumbs/22267.jpg",
      "https://4kwallpapers.com/images/walls/thumbs/22244.jpg",
      "https://4kwallpapers.com/images/walls/thumbs_3t/22284.jpg",
    ];

    const onChangeUsername = event => {
      setUsername(event.target.value)
    }

    const onChangePassword = event => {
      setPassword(event.target.value)
    }

    const onSubmitSuccess = jwtToken =>{
      Cookies.set('jwt_token',jwtToken, {expires :30});
      homePageNavigation('/')
    }

    const onSubmitFailure = errorMsg => {
      setErrorMsg(errorMsg)
      setShowErrorMsg(true)
    }

    const onSubmitForm = async (event) => {
      event.preventDefault()
      const loginApi = 'https://apis.ccbp.in/login';
      const options ={
        method : 'POST',
        body : JSON.stringify({username,password})
      }
      const response = await fetch(loginApi,options)
      const data = await response.json()
      
      if(response.ok === true){
        onSubmitSuccess(data.jwt_token)
        
      }else{
        onSubmitFailure(data.error_msg)
      }
    }

    useEffect( () => {
      const token = Cookies.get('jwt_token');
      if(token !== undefined){
        return homePageNavigation('/')
      }
    },[])


  return (
    <div className='login-page'>
      <div className='login-left'>
      <h1 className='login-page-heaidng'>
        <RiMovieFill  className='movie-icon'/> THE MOVIE STORE
      </h1>
      <p className='welcome-text'>Welcome Back, Please Login <br/>to your account...</p>
      <form className='user-form' onSubmit={onSubmitForm}>
        <div className='input-container'>
          <label className='label-details' htmlFor='user-name'>USER NAME</label>
          <input type="text" className='user-input' id="user-name" placeholder='Enter Your Name...' onChange={onChangeUsername} />
        </div>
        <div className='input-container'>
          <label className='label-details' htmlFor='user-password'>PASSWORD</label>
          <input type="password" className='user-input' id="user-password" placeholder='Enter Your Password...' onChange={onChangePassword}  />
        </div>

        <div className='buttons'>
          <button className='login-btn' type="submit">Login</button>
          <button className='sign-btn'>SignUp</button>
        </div>
        {showErrorMsg && <p className='error-msg'>{errorMsg}</p>}
      </form>
      </div>
      <div className='login-right'>
      <div className="carousel-container">
      <Slider {...settings} className='slider'>
        {images.map((imgUrl, index) => (
          <div key={index}>
            <img src={imgUrl} alt={`Slide ${index}`} className="carousel-image" />
          </div>
        ))}
      </Slider>
    </div>
      </div>
    </div>
  )
}

export default LoginForm