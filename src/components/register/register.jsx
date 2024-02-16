

import axios from "axios"
import "../../scss/register/register.scss"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";

function RegisterComponent(props) {
    const navigate = useNavigate();
    const [firstName , setFirstName] = React.useState("")
    const [lastName , setLastName] = React.useState("")
    const [email , setEmail ] = React.useState("")
    const [password , setPassword ] = React.useState("")
    const [errors , setErrors ] = React.useState({})

    function register(e) {
        e.preventDefault()
        axios
        .post(`${process.env.REACT_APP_URL}/api/auth/register`, {
            firstName,
            lastName,
            email,
            password
        })
        .then((result) => {
          if (result.status === 201) {
            window.Toast.fire({
              icon: "success",
              title: "تم انشاء الحساب بنجاح",
            });
            navigate("/login")
          } 
        })
        .catch((error) => {
          if (error.response.status === 400) {
            setErrors(error.response.data.errors);
          } else {
            window.Toast.fire({
              icon: "error",
              title: error.message,
            });
          }
        });
    }

    return <>
        <div className="register position-relative">
            <div className="container-xxl">
                <div className="d-flex align-items-center justify-content-center">
                    <div className="form">
                        <h4 className="text-capitalize text-center mb-3">create account</h4>
                        <form action="">
                            <div className="input">
                                <input type="text" onChange={(e) => setFirstName(e.target.value)}  placeholder="first name" />
                                {errors.firstName ? <small className="text-danger">{errors.firstName[0].msg}</small> : ""}
                            </div>
                            <div className="input">
                                <input type="text" onChange={(e) => setLastName(e.target.value)}  placeholder="last name" />
                                {errors.lastName ? <small className="text-danger">{errors.lastName[0].msg}</small> : ""}
                            </div>
                            <div className="input">
                                <input type="email" onChange={(e) => setEmail(e.target.value)}  placeholder="email" />
                                {errors.email ? <small className="text-danger">{errors.email[0].msg}</small> : ""}
                            </div>
                            <div className="input">
                                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                                {errors.password ? <small className="text-danger">{errors.password[0].msg}</small> : ""}
                            </div>
                            <div className="buttons flex-column flex-md-row row-gap-0 d-flex align-items-center justify-content-center gap-3">
                                <button onClick={(e) => register(e) } className="text-capitalize color-white">create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default RegisterComponent;