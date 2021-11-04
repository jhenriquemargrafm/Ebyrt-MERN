import React, { useState } from 'react'
import PropTypes from 'prop-types'
import EditTask from './EditTask'
import Axios from 'axios'

export default function TaskItem ({
  id,
  title,
  description,
  status,
  createdAt,
  updatedAt
}) {
  const [isEditing, setIsEditing] = useState(false)

  const OpenAndClose = () => {
    if (isEditing === false) {
      setIsEditing(true)
    } else {
      setIsEditing(false)
    }
  }

  const deleteTask = ({ target }) => {
    const { value } = target
    Axios.delete(`http://localhost:3001/tasks/delete/${value}`)
    window.location.reload()
  }

  return (
      <div>
        <h4>{title}</h4>
        <h4>{description}</h4>
        <h4>{status}</h4>
        <h4>{createdAt}</h4>
        <h4>{updatedAt}</h4>
        { (isEditing === false)
          ? null
          : (
          < EditTask
          id={id}
          title={title}
          description={description}
          status={status}
          />
            )}
        <button onClick={() => { OpenAndClose() }}>Editar</button>
        <button value={id} onClick={(e) => { deleteTask(e) }}>Excluir</button>
        <br></br>
      </div>
  )
}

TaskItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired
}
