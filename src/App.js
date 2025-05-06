import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginForm from './Components/LoginForm/LoginForm';
import HomePage from './Components/HomePage/HomePage'
import HomeVideos from './Components/HomeVideos/HomeVideos';
import SpecificVideo from './Components/SpecificVideo/SpecificVideo';
import TrendingVideo from './Components/TrendingVideo/TrendingVideo';
import GamingVideo from './Components/GamingVideo/GamingVideo';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
         <Routes>
             <Route path="/" element={<HomePage />}/>
             <Route path="/login" element={<LoginForm/>}/>
             <Route path="/homevideos" element={<HomeVideos/>}/>
             <Route path="/homevideos/:id" element={<SpecificVideo/>}/>
             <Route path="/trending" element={<TrendingVideo/>}/>
             <Route path="/gaming" element={<GamingVideo/>}/>

         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
