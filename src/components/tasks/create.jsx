import "../../scss/tasks/create.scss"
import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import axios from "axios";
import { TagsInput } from "react-tag-input-component";

function CreateTask({getTasks , tasks}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [name , setName ] = React.useState("")
    const [description , setDescription ] = React.useState("")
    const [dueDate , setDueDate ] = React.useState("")
    const [tags , setTags ] = React.useState([])
    const [errors , setErrors ] = React.useState({})
    const [search , setSearch ] = React.useState("")
    const [sort , setSort ] = React.useState("")
    const [sortType , setSortType ] = React.useState(1)

    function resetData() {
        setName("")
        setDescription("")
        setDueDate("")
        setTags([])
        setErrors({})
    }


    function createTask() {
        axios
        .post(`${process.env.REACT_APP_URL}/api/task`, {
            name,
            description,
            dueDate,
            tags
        })
        .then((result) => {
          if (result.status === 201) {
            window.Toast.fire({
              icon: "success",
              title: "تم انشاء المهمه بنجاح",
            });
            resetData();
            getTasks();
          } 
        })
        .catch((error) => {
          if (error.response.status === 400) {
            setErrors(error.response.data.errors)
          } else {
            window.Toast.fire({
              icon: "error",
              title: error.message,
            });
          }
        });
    }

    function searchTask(search) {
      setSearch(search)
      getTasks(search)
    }

    function sortTask(sort) {
      setSort(sort)
      getTasks(search , `${sort}@${sortType}`)
    }

    function typeSortTask(type) {
      setSort(sort)
      getTasks(search , `${sort}@${type}`)
    }

    return ( 
        <div className="create mb-5">
            <div>
                <Button variant="contained" style={{width : "100%"}} color="success" onClick={handleOpen}>create task</Button>
                <br />
                <br />
                <input type="text" className="form-control d-block" placeholder="search in tasks" onInput={(e) => searchTask(e.target.value)} />
                <br />
                <select name="" className="form-control d-block" onChange={(e) => sortTask(e.target.value)} id="">
                  <option value="">sort </option>
                  <option value="createdAt" selected={sort == "createdAt" ? "selected" : ""}>create at</option>
                  <option value="dueDate" selected={sort == "dueDate" ? "selected" : ""}>due date</option>
                  <option value="isCompleted" selected={sort == "isCompleted" ? "selected" : ""}>completed</option>
                </select>
                <br />
                <select name="" className="form-control d-block" onChange={(e) => typeSortTask(e.target.value)} id="">
                  <option value="1" selected={sortType == "1" ? "selected" : ""}>asc</option>
                  <option value="-1" selected={sortType == "-1" ? "selected" : ""}>desc</option>
                </select>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                <div className="form">
                    <h4 className="text-capitalize text-center mb-3">Create Task</h4>
                    <form action="">
                        <div className="input">
                            <input type="type" placeholder="name" value={name}  onInput={(e) => {
                                setName(e.target.value)
                            }} />
                            {errors.name ? <small className="text-danger">{errors.name[0].msg}</small> : ""}
                        </div>
                        <br />
                        <div className="input">
                            <textarea placeholder="description" value={description} name="" id="" cols="30" rows="10" onInput={(e) => {
                                setDescription(e.target.value)
                            }}></textarea>
                            {errors.description ? <small className="text-danger">{errors.description[0].msg}</small> : ""}
                        </div>
                        <br />
                        <TagsInput
                          value={tags}
                          onChange={setTags}
                          name="fruits"
                          placeHolder="enter fruits"
                        />
                          {errors.tags ? <small className="text-danger">{errors.tags[0].msg}</small> : ""}
                        <br />
                        <div className="input">
                            <input type="date" value={dueDate} placeholder="due date" onInput={(e) => {
                                setDueDate(e.target.value)
                            }}/>
                            {errors.dueDate ? <small className="text-danger">{errors.dueDate[0].msg}</small> : ""}
                        </div>
                        <div className="buttons flex-column flex-md-row row-gap-0 d-flex align-items-center justify-content-center gap-3">
                            <button className="text-capitalize color-white" onClick={(e) => {
                              e.preventDefault()
                              createTask()
                            }}>create</button>
                        </div>
                    </form>
                </div>
                </Modal>
            </div>
        </div>
     );
}

export default CreateTask ;