import { useState, useEffect, useRef } from "react";
import "./App.css";

export default function App(){
  // const [] = useState,(0);
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  // inputRef.current.focus();
  useEffect(() => {
    inputRef.current.focus();
  })

  function handleAdd(){
    if(input === ''){
      alert('Pls fill the task box');
    }else{

      const newTask = {
        id: Math.round(Math.random()*1000),
        text: input,
        completed: false
      };
      setTasks([...tasks, newTask]);
      console.log(tasks)
      setInput("");
    }
  }

  const toggleCompleted = taskId => {
    const updatedTasks = tasks.map(task => {
      if(task.id === taskId){
        return {
          ...task,
          completed: !task.completed
        }
      }
      return task;
    });
    setTasks(updatedTasks);
  }
  useEffect(()=>{
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if(tasks){
      setTasks(savedTasks);
    }

  },[]
  )
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  },[tasks])

  const deleteTask = taskId => {
    const updatedTasks = tasks.filter(task => task.id !==taskId);
    setTasks(updatedTasks);
  }
  const handleKey = event => {
    if(event.key === "Enter"){
      handleAdd();
    }
  }

  
  
  return (
    <>
      <h1>Todo List</h1>
    <div className="todo-container"> 
      <input ref={inputRef} onKeyDown={handleKey} type="text" placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleAdd} >Add</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className={task.completed? 'completed': ''}>
            <span style={{
              cursor:"pointer"
            }} onClick={() => toggleCompleted(task.id)}>{task.text}</span>
            <button onClick={() => deleteTask(task.id)} >Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}