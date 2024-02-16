import Breadcrumb from "../components/breadcrumb";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ProfileComponent from "../components/profile/profile";

export default function Profile () {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
      useEffect(() => {
        if(!isAuthenticated) {
          navigate("/login")
        }
    } , [])
    window.scrollTo(0,0)
    return ( 
        <>
            <Breadcrumb title="profile"></Breadcrumb>
            <ProfileComponent></ProfileComponent>
        </>
     );
}
