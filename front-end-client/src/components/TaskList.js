import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import TaskItem from './TaskItem'

export default function TaskList () {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('pendente')

  useEffect(() => {
    Axios.get('http://localhost:3001/tasks').then((response) => {
      setTasks(response.data)
    })
  }, [])

  const createTask = () => {
    Axios.post('http://localhost:3001/tasks', {
      title,
      description,
      status,
      createdAt: new Date(),
      updatedAt: new Date()
    }).then((response) => {
      setTasks([
        ...tasks,
        {
          title,
          description,
          status,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])
    })
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Título..."
          onChange={(event) => {
            setTitle(event.target.value)
          }}
        />
        <input
          type="text"
          placeholder="Descrição..."
          onChange={(event) => {
            setDescription(event.target.value)
            setStatus('pendente')
          }}
        />
        <button onClick={createTask}> Criar Nova Tarefa </button>
      </div>

      <div>
        {tasks.map((task, index) => {
          return (
            <TaskItem
              key={index}
              id={task._id}
              title={task.title}
              description={task.description}
              status={task.status}
              createdAt={task.createdAt}
              updatedAt={task.updatedAt}
            />
          )
        })}
      </div>
    </div>
  )
}
