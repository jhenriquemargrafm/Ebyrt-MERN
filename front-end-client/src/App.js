import React from 'react'
import './styles.css'
import Navbar from './components/Navbar'
import TaskList from './components/TaskList'

const App = () => {
  return (
    <div className="App">
      <div>
      <Navbar />
        <div>
          <TaskList />
        </div>
      </div>
    </div>

  )
}

export default App
