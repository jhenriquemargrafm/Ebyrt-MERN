import React, { useState, useEffect } from 'react'
import Axios from 'axios'

export default function TaskList () {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    Axios.get('http://localhost:3001/tasks').then((response) => {
      setTasks(response.data)
    })
  }, [])

  const createTask = () => {
    Axios.post('http://localhost:3001/tasks', {
      title,
      description
    }).then((response) => {
      setTasks([
        ...tasks,
        {
          title,
          description
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
          }}
        />
        <button onClick={createTask}> Criar Nova Tarefa </button>
      </div>

      <div>
        {tasks.map((task, index) => {
          return (
            <div key={index}>
              <h4>Título: {task.title}</h4>
              <h4>Descrição: {task.description}</h4>
              <h4>Criado em: {task.createdAt}</h4>
              <h4>Atualizado em: {task.updatedAt}</h4>
              <br></br>
            </div>
          )
        })}
      </div>
    </div>
  )
}
