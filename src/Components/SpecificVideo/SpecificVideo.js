import React,{useEffect,useState} from 'react';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import PlayVideo from '../PlayVideo/PlayVideo';


const SpecificVideo = () => {
    const [specificVideo, setSpecificVideo] = useState(null);
    const {id} = useParams()
    const loginPageNavigation = useNavigate()

    useEffect( () => {
            const token = Cookies.get('jwt_token');
            if(token === undefined){
                return loginPageNavigation('/login')
            }
        },[loginPageNavigation])

        const getFormatedData = (data) => ({
            id: data.id,
            publishedAt: data.published_at,
            thumbnailUrl: data.thumbnail_url,
            title: data.title,
            viewCount: data.view_count,
            description : data.description,
            videoUrl : data.video_url,
        });
        

    useEffect( () => {
        const getSepicifVideo = async () => {
            const jwtToken = Cookies.get('jwt_token');
            const ulr = `https://apis.ccbp.in/videos/${id}`;
            const options ={
                method : 'GET',
                headers : {
                    Authorization : `Bearer ${jwtToken}`,
                },
            }
            const response = await fetch(ulr, options);
            if(response.ok){
                const fetchedData = await response.json();
                const formatedData = getFormatedData(fetchedData.video_details);
                setSpecificVideo(formatedData);
            }else {
                console.log('Error Somthing Is Triggred!')
            }
            
           
        }
        getSepicifVideo()
    },[id])

  return (
    <div>
        {specificVideo && <PlayVideo videoDetails={specificVideo}/>}
    </div>
  )
}

export default SpecificVideo