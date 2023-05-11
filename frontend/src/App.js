import React, { useEffect, useState } from "react";
import List from "./components/List"
import axios from "axios"
import {baseURL}from "./utils/constant"

const App = () => {
  const [input, setInput] = useState("");
  const [task, setTask] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/get`)
    .then((res) => {
      setTask(res.data)
      console.log(res.data)
    })
  }, [updateUI])

  const addTask = () => {
    axios.post(`${baseURL}/save`, {task: input})
    .then((res) => {
      setInput("");
      console.log(res.data)
      setUpdateUI((prevState) => !prevState);
    });
  }

  const updateMode = (id, text) => {
    setInput(text);
    setUpdateId(id);
    console.log(text);
  }

  const updateTask = () => {
    console.log(input)
    axios.put(`${baseURL}/update/${updateId}`, {task: input})
    .then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
      setUpdateId(null);
      setInput("");
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const taskList = task.map((taskName) =>{
    return <List task={taskName.task} id={taskName._id} setUpdateUI={setUpdateUI} updateMode={updateMode}/>
  })

  return <main>
    <h1 className="title">CRUD Operations</h1>
    <div className="input_holder">
      <input type="text" value = {input} onChange={(e) => setInput(e.target.value)}/>
      <button type="submit" onClick={
        updateId===null ? addTask : updateTask
      }>{updateId===null ? "Add Task" : "UpdateTask"}</button>
    </div>

    <ul>
      {taskList}
    </ul>
  </main>
}

export default App;
