import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Axios from 'axios'

export default function TaskItem ({
  id,
  title,
  description,
  status
}) {
  const [currentTitle, setTitle] = useState(title)
  const [currentDescription, setDescription] = useState(description)
  const [currentStatus, setStatus] = useState(status)

  const onTaskStatusChange = (event) => {
    setStatus(event.target.value)
  }

  const handleInputTitleChange = ({ target }) => {
    const { value } = target
    setTitle(value)
  }

  const handleInputDescriptionChange = ({ target }) => {
    const { value } = target
    setDescription(value)
  }

  const updateTask = () => {
    const updatedAt = new Date()
    Axios.put('http://localhost:3001/tasks',
      { id, currentTitle, currentDescription, currentStatus, updatedAt })
    window.location.reload()
  }

  return (
      <div>
        <input
          type="text"
          placeholder={currentTitle}
          onChange={handleInputTitleChange}
        />
        <input
          type="text"
          placeholder={currentDescription}
          onChange={handleInputDescriptionChange}
        />
        <select onChange={onTaskStatusChange} value={currentStatus}>
          <option value="Pendente">Pendente</option>
          <option value="Fazendo">Fazendo</option>
          <option value="Completa">Completa</option>
        </select>
        <button onClick= { () => updateTask() }>Finalizar edição</button>
      </div>
  )
}

TaskItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
}
