import { useSelector } from "react-redux";
import Breadcrumb from "../components/breadcrumb";
import RegisterComponent from "../components/register/register";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";



export default function RegisterPage () {
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
            <Breadcrumb title="register"></Breadcrumb>
            <RegisterComponent></RegisterComponent>
        </>
     );
}

