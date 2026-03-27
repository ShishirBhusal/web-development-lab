import { useState } from 'react'
import './App.css'

function App() {
  const [taskList, setTaskList] = useState([])
  const [newTask, setNewTask] = useState('')

  function addTask(e) {
    e.preventDefault()
    if (newTask.trim() === '') return
    setTaskList([...taskList, { id: Date.now(), text: newTask.trim(), done: false }])
    setNewTask('')
  }

  function toggleTask(id) {
    setTaskList(taskList.map(task => task.id === id ? { ...task, done: !task.done } : task))
  }

  function deleteTask(id) {
    setTaskList(taskList.filter(task => task.id !== id))
  }

  function editTask(id, currentText) {
    const updated = window.prompt('Edit task:', currentText)
    if (updated === null || updated.trim() === '') return
    setTaskList(taskList.map(task => task.id === id ? { ...task, text: updated.trim() } : task))
  }

  const remaining = taskList.filter(task => !task.done).length

  return (
    <div className="wrapper">
      <h1>My Todo List</h1>

      <form className="add-form" onSubmit={addTask}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul className="list">
        {taskList.map(task => (
          <li key={task.id} className={task.done ? 'done' : ''}>
            <span onClick={() => toggleTask(task.id)}>{task.text}</span>
            <div>
              <button onClick={() => editTask(task.id, task.text)}>Edit</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <p>{remaining} task(s) remaining</p>
    </div>
  )
}

export default App
