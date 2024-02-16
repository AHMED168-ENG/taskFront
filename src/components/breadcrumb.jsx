import { Link, useNavigate } from "react-router-dom";
import "../scss/breadcrumb.scss"
import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../store/slice/authSlice";

function Breadcrumb (props) {
    const {title} = props
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);
    const navigation = useNavigate();
    const dispatch = useDispatch();
    function logout() {
        dispatch(logoutAction())
        navigation("/login")
    }
    return ( 
        <>
            <div className="breadcrumb m-0">
                <div className="container-xxl">
                    <div className="d-flex justify-content-between align-items-center">
               
                        <p className="d-flex align-items-center justify-content-center py-md-4 py-3 m-0 gap-2"> 
                            <Link to="/" className="text-capitalize">home</Link> 
                            <span>/</span> 
                            <span>{title}</span>
                        </p>
                        {isAuthenticated ? (
                            <div className="dropdown show">
                                <a className="btn btn-secondary dropdown-toggle" href="" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {user.firstName + " " + user.lastName}
                                </a>

                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <Link className="dropdown-item" to="/profile" >profile</Link>
                                    <button className="dropdown-item" href="#" onClick={logout}>logout</button>
                                </div>
                            </div>
                        ) : ""}
                        
                    </div>
                </div>
            </div>
        </>
     );
}

export default Breadcrumb ;