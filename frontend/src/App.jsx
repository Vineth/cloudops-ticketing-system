import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Tickets from './pages/Tickets'

function App() {
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/tickets')
      .then((response) => response.json())
      .then((data) => setTickets(data))
      .catch((error) => console.error('Error fetching tickets:', error))
  }, [])

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>CloudOps</h2>

        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/tickets">Tickets</Link>
          <a href="#">Create Ticket</a>
        </nav>
      </aside>

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={<Dashboard tickets={tickets} />}
          />

          <Route
            path="/tickets"
            element={<Tickets tickets={tickets} />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App