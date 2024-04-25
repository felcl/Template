import { Route, Routes, useLocation} from "react-router-dom";
import Home from '../view/Home'
import AE from '../view/AE'
import {useEffect} from 'react'
export default function Router() {
    const location = useLocation();
    useEffect(()=>{
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      },[location.pathname])
    return (
        <Routes>
          <Route path='/' element={<AE />} />
        </Routes>
    );
  }