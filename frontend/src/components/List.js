import React from "react";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import axios from "axios";
import { baseURL } from "../utils/constant";

const List = ({id, task, setUpdateUI, updateMode}) => {
    const removeTask = () => {
        axios.delete(`${baseURL}/delete/${id}`)
        .then((res) => {
            console.log(res);
            setUpdateUI((prevState) => !prevState);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    return <li key={id}>
        {task}
        <div key={id} className="icon_holder">
            <BiEditAlt className="icon" onClick={() => updateMode(id, task)}/>
            <BsTrash className="icon" onClick={removeTask}/>
        </div>
    </li>
}

export default List;