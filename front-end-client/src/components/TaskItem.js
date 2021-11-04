import React from 'react'
import PropTypes from 'prop-types'

export default function TaskItem ({
  index,
  title,
  description,
  status
}) {
  return (
      <div>
        <h4>{title}</h4>
        <h4>{description}</h4>
        <h4>{status}</h4>
        <button>Editar</button>
        <button>excluir</button>
        <br></br>
      </div>
  )
}

TaskItem.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
}
