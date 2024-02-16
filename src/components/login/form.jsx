

import { Link, useNavigate } from "react-router-dom";
import "../../scss/login/login.scss"
import React, { useEffect } from "react";
import axios from "axios";
import { loginAction } from "../../store/slice/authSlice";
import { useDispatch , useSelector } from "react-redux";

function LoginComponent(props) {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    useEffect(() => {
        if(isAuthenticated) {
            navigate("/")
        }
    } , [])
    const [email , setEmail ] = React.useState("")
    const dispatch = useDispatch();
    const [password , setPassword ] = React.useState("")
    const [errors , setErrors ] = React.useState({})
    const navigate = useNavigate();

    function login(e) {
        e.preventDefault()
        axios
        .post(`${process.env.REACT_APP_URL}/api/auth/login`, {
            email,
            password
        })
        .then((result) => {
          if (result.status === 200) {
            window.Toast.fire({
              icon: "success",
              title: "تم تسجيل الدخول للحساب بنجاح",
            });
            dispatch(loginAction({...result.data.user , token : result.data.token}))
            navigate("/")
          } 
        })
        .catch((error) => {
          if (error.response.status === 400) {
            setErrors(error.response.data.errors);
          } else {
            console.log(error)
            window.Toast.fire({
              icon: "error",
              title: error.response.data.message,
            });
          }
        });
    }
    return <>
        <div className="Login position-relative">
            <div className="container-xxl">
                <div className="d-flex align-items-center justify-content-center">
                    <div className="form">
                        <h4 className="text-capitalize text-center mb-3">login</h4>
                        <form action="">
                            <div className="input">
                                <input type="email" onChange={(e) => setEmail(e.target.value)}  placeholder="email" />
                                {errors.email ? <small className="text-danger">{errors.email[0].msg}</small> : ""}
                            </div>
                            <div className="input">
                                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                                {errors.password ? <small className="text-danger">{errors.password[0].msg}</small> : ""}
                            </div>
                            <div className="buttons flex-column flex-md-row row-gap-0 d-flex align-items-center justify-content-center gap-3">
                                <button onClick={login} className="text-capitalize color-white">login</button>
                                <Link to="/register">sign up</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default LoginComponent;