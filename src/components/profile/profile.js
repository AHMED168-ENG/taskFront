import { Link, useNavigate } from "react-router-dom";
import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logoutAction } from "../../store/slice/authSlice";
import "../../scss/profile/profile.scss"

function ProfileComponent (props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const [firstName , setFirstName] = React.useState(user?.firstName)
    const [lastName , setLastName] = React.useState(user?.lastName)
    const [email , setEmail ] = React.useState(user?.email)
    const [errors , setErrors ] = React.useState({})

    function updateUser(e) {
        e.preventDefault()
        axios
        .put(`${process.env.REACT_APP_URL}/api/user/update-my-account`, {
            firstName,
            lastName,
            email,
        })
        .then((result) => {
          if (result.status === 200) {
            window.Toast.fire({
              icon: "success",
              title: "تم تحديث الحساب بنجاح",
            });
            dispatch(logoutAction())
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

    return ( 
        <>
            <div className="update-account">
            <div className="container-xxl">
                    <div className="d-flex align-items-center justify-content-center">
                        <div className="form">
                            <h4 className="text-capitalize text-center mb-3">update my account</h4>
                            <form action="">
                                <div className="input">
                                    <input type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName}  placeholder="first name" />
                                    {errors.firstName ? <small className="text-danger">{errors.firstName[0].msg}</small> : ""}
                                </div>
                                <div className="input">
                                    <input value={lastName} type="text" onChange={(e) => setLastName(e.target.value)}  placeholder="last name" />
                                    {errors.lastName ? <small className="text-danger">{errors.lastName[0].msg}</small> : ""}
                                </div>
                                <div className="input">
                                    <input value={email} type="email" onChange={(e) => setEmail(e.target.value)}  placeholder="email" />
                                    {errors.email ? <small className="text-danger">{errors.email[0].msg}</small> : ""}
                                </div>
                                <div className="buttons flex-column flex-md-row row-gap-0 d-flex align-items-center justify-content-center gap-3">
                                    <button onClick={(e) => updateUser(e) } className="text-capitalize color-white">update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}

export default ProfileComponent ;