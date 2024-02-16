import { useSelector } from "react-redux";
import Breadcrumb from "../components/breadcrumb";
import LoginComponent from "../components/login/form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



export default function LoginPage () {
    const navigate = useNavigate()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    useEffect(() => {
      if(isAuthenticated) {
        navigate("/")
      }
  } , [])
    window.scrollTo(0,0)
    return ( 
        <>
            <Breadcrumb title="login"></Breadcrumb>
            <LoginComponent></LoginComponent>
        </>
     );
}

