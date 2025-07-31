import {Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import CreateTask from './pages/CreateTask'
import EditTask from './pages/EditTask'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            HMCTS Task Manager
          </Link>
        </h1>
        <p>Welcome to the HMCTS Task Manager application.</p>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/edit-task/:id" element={<EditTask />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
