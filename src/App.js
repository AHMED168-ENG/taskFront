import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Route, Routes, useNavigate , useSelectore} from 'react-router-dom';
import "./scss/App.scss";
import Tasks from './pages/task';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginAction } from "./store/slice/authSlice";
import Profile from "./pages/profile";

function App() {
  const navigation = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    const token = window.localStorage.getItem("token")
      if(!token) {
        navigation("/login")
      } else {
        axios
        .get(`${process.env.REACT_APP_URL}/api/user/profile`,  {
          headers : {
            authorization : `Bearer ${token}`
          }
        })
        .then((result) => {
          if (result.status === 200) {
            dispatch(loginAction({...result.data , token}))
            navigation("/")

          } 
        })
        .catch((error) => {
          navigation("/login")
        });
      }
      
  } , [])
  return (  
   <>
      <Routes>
            <Route path='/' element={<Tasks/>}></Route>
            <Route path='profile' element={<Profile/>}></Route>
            <Route path='login' element={<LoginPage/>}></Route>
            <Route path='register' element={<RegisterPage/>}></Route>

      </Routes>
   </>
  );
}

export default App;
