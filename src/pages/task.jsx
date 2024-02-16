import TaskWrapper from "../components/tasks/task_wrapper";
import Breadcrumb from "../components/breadcrumb";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Tasks () {
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
            <Breadcrumb title="tasks"></Breadcrumb>
            <TaskWrapper></TaskWrapper>
        </>
     );
}
