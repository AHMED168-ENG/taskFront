import "../../scss/tasks/tasks.scss"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import moment from "moment";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Modal from '@mui/material/Modal';
import { TagsInput } from "react-tag-input-component";
import axios from "axios";



function Tasks({getTasks , tasks}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = (task) => {
        console.log(task)
        setTaskData(task) 
        setOpen(true)
    };
    const handleClose = () => setOpen(false);
    const [name , setName ] = React.useState("")
    const [description , setDescription ] = React.useState("")
    const [id , setId ] = React.useState("")
    const [dueDate , setDueDate ] = React.useState("")
    const [tags , setTags ] = React.useState([])
    const [isCompleted , setCompleted ] = React.useState(false)
    const [errors , setErrors ] = React.useState({})
    function updateTask() {
        axios
        .put(`${process.env.REACT_APP_URL}/api/task/${id}`, {
            name,
            description,
            dueDate,
            tags,
            isCompleted
        })
        .then((result) => {
          if (result.status === 200) {
            window.Toast.fire({
              icon: "success",
              title: "تم تحديث المهمه بنجاح",
            });
            getTasks();
            setErrors([])
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
    function deleteTask(id) {
        axios
        .delete(`${process.env.REACT_APP_URL}/api/task/${id}`)
        .then((result) => {
          if (result.status === 200) {
            window.Toast.fire({
              icon: "success",
              title: "تم حذف المهمه بنجاح",
            });
            getTasks();
          } 
        })
        .catch((error) => {
            window.Toast.fire({
                icon: "error",
                title: error.message,
              });
        });
    }
    function setTaskData(task) {
        setName(task.name)
        setDescription(task.description)
        setDueDate(moment(task.dueDate).format("YYYY-MM-DD"))
        setTags(task.tags)
        setCompleted(task.isCompleted)
        setId(task._id)
    }
    return ( 
        <>
            <div className="task">
                <div className="row row-gap-4">
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className="form">
                            <h4 className="text-capitalize text-center mb-3">Update Task</h4>
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
                                <br />
                                <div className="input ">
                                    <select className="form-control d-block" name="" id="" onChange={(e) => setCompleted(e.target.value)}>
                                        <option selected={isCompleted ? true : ""} value="true">completed</option>
                                        <option selected={!isCompleted ? true : ""} value="false">not completed</option>
                                    </select>
                                    
                                </div>
                                <br />
                                <div className="buttons flex-column flex-md-row row-gap-0 d-flex align-items-center justify-content-center gap-3">
                                    <button className="text-capitalize color-white" onClick={(e) => {
                                    e.preventDefault()
                                    updateTask()
                                    }}>update</button>
                                </div>
                            </form>
                        </div>
                    </Modal>
                    {
                        tasks.map((ele , index) =>(
                                <div key={index} className="col-md-3">
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardContent className="position-relative">
                                            <span className="completed position-absolute" style={{background:ele.isCompleted ? "green" : "red"}}>{ele.isCompleted ? "completed" : "not completed"}</span>
                                            <Typography gutterBottom variant="h5" component="div">
                                            {ele.name}
                                            </Typography>
                                            <span className="date">{moment(ele.dueDate).format("MMM Do YY")}</span>
                                            <Typography variant="body2" color="text.secondary">{ele.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">category : {ele.tags.join(" , ")}</Button>
                                            <div className="small gap-2 d-flex controlled">
                                                <MdDeleteOutline onClick={() => deleteTask(ele._id)} />
                                                <FaRegEdit onClick={() => {handleOpen(ele)}}/>
                                            </div>
                                        </CardActions>
                                    </Card>
                                </div>
                            )
                        
                        )
                    }
                </div>
            </div>
        </>
     );
} 

export default Tasks ;