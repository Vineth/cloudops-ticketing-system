import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Tickets from './pages/Tickets'
import CreateTicket from './pages/CreateTicket'

function App() {
  const [tickets, setTickets] = useState([])

  const fetchTickets = () => {
    return fetch('http://localhost:8000/tickets')
      .then((response) => response.json())
      .then((data) => setTickets(data))
      .catch((error) => console.error('Error fetching tickets:', error))
  }

  useEffect(() => {
    fetchTickets()
  }, [])

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>CloudOps</h2>

        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/tickets">Tickets</Link>
          <Link to="/tickets/create">Create Ticket</Link>
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

          <Route
            path="/tickets/create"
            element={<CreateTicket fetchTickets={fetchTickets} />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App