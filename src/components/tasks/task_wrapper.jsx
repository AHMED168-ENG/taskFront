import Tasks from "./tasks";
import CreateTask from "./create";
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../pagination";

function TaskWrapper() {
      useEffect(() => {
        getTasks()
    } , [])
    const [tasks , setTasks] = useState([])
    const [page , setPage] = useState(1)
    const [pagination , setPaginate] = useState({})
    function getTasks(search = "" , sort="") {
        axios
        .get(`${process.env.REACT_APP_URL}/api/task?page=${page}&limit=${process.env.REACT_APP_LIMIT}&name=${search}&description=${search}&tags=${search}&sort=${sort}`).then((res) => {
            if (res.status === 200) {
                setTasks(res.data.docs)
                setPaginate({totalDocs : res.data.totalDocs , totalPages : res.data.totalPages})
            } else {
              window.Toast.fire({
                icon: "error",
                title: res.data.error,
              });
            }
          })
          .catch((error) => {
            // window.Toast.fire({
            //   icon: "error",
            //   title: error,
            // });
          });
    }


    const handlePageClick = (selected) => {
        const selectedPage = selected.selected + 1;
        setPage(selectedPage)
        getTasks();
      };

    return ( 
        <>
            <div className="blog-wrapper m-0 py-5">
                <div className="container-xxl">
                     <CreateTask getTasks={getTasks} tasks={tasks}></CreateTask>
                    <div className="row">
                        <Tasks getTasks={getTasks} tasks={tasks}></Tasks>
                    </div>
                    <br />
                    <Pagination pagination={pagination} handlePageClick={handlePageClick}></Pagination>
                </div>
            </div>
        </>
     );
}

export default TaskWrapper ;