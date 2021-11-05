import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import TaskItem from './TaskItem'

export default function TaskList () {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('pendente')

  const [checkedA, setCheckedA] = useState(false)
  const [checkedC, setCheckedC] = useState(false)

  useEffect(() => {
    Axios.get('http://localhost:3001/tasks')
      .then((response) => { setTasks(response.data) })
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
          status
        }
      ])
    })
    window.location.reload()
  }

  const handleSortA = (e) => {
    setCheckedA(e.target.checked)
    if (checkedA !== true) {
      function compare (a, b) {
        if (a.title < b.title) {
          return -1
        }
        if (a.title > b.title) {
          return 1
        }
        return 0
      }
      setTasks(tasks.sort(compare))
    }
  }

  const handleSortC = (e) => {
    setCheckedC(e.target.checked)
    if (checkedC !== true) {
      function compare (a, b) {
        if (a.createdAt < b.createdAt) {
          return -1
        }
        if (a.createdAt > b.createdAt) {
          return 1
        }
        return 0
      }
      setTasks(tasks.sort(compare))
    }
  }

  return (
    <div>
      Opções de ordenação
      <div>
        <input type="checkbox" onChange={handleSortA} name="alphabet" value={checkedA}></input>
        <label htmlFor="alphabet">Ordem Alfabética</label>
        <input type="checkbox" onChange={handleSortC} name="creationDate" value={checkedC}></input>
        <label htmlFor="creationDate">Data de Criação</label>
        <select>
          <option value="todas">Todas</option>
          <option value="pendente">Pendente</option>
          <option value="fazendo">Fazendo</option>
          <option value="completa">Completa</option>
        </select>
      </div>
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
