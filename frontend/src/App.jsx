import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { API_URL } from './config.js'

import Dashboard from './pages/Dashboard'
import Tickets from './pages/Tickets'
import CreateTicket from './pages/CreateTicket'
import TicketDetails from './pages/TicketDetails'

function App() {
  // Stores the full list of tickets returned from the FastAPI backend.
  // This state is shared with multiple pages so they can all use the same data.
  const [tickets, setTickets] = useState([])

  // Reusable function that gets the latest ticket data from the backend.
  // We call this when the app first loads and after creating, updating,
  // or deleting a ticket so the frontend stays in sync with PostgreSQL.
  const fetchTickets = () => {
    return fetch(`${API_URL}/tickets`)
      .then((response) => response.json())
      .then((data) => setTickets(data))
      .catch((error) => console.error('Error fetching tickets:', error))
  }

  // Load all tickets once when the application first starts.
  useEffect(() => {
    fetchTickets()
  }, [])

  return (
    <div className="app">
      {/* Main navigation shown on every page */}
      <aside className="sidebar">
        <h2>CloudOps</h2>

        <nav>
        {/* React Router Links change pages without reloading the browser */}
          <Link to="/">Dashboard</Link>
          <Link to="/tickets">Tickets</Link>
          <Link to="/tickets/create">Create Ticket</Link>
        </nav>
      </aside>

      <main className="main-content">
        {/* Routes decide which page component is displayed based on the URL */}
        <Routes>
          {/* Dashboard receives the shared ticket list to calculate statistics */}
          <Route
            path="/"
            element={<Dashboard tickets={tickets} />}
          />

        {/* Tickets page receives the ticket list to render all ticket rows */}
          <Route
            path="/tickets"
            element={<Tickets tickets={tickets} />}
          />

          {/*
            The create page receives fetchTickets so it can refresh the
            shared ticket list immediately after a new ticket is created.
          */}
          <Route
            path="/tickets/create"
            element={<CreateTicket fetchTickets={fetchTickets} />}
          />

          {/*
            :id is a dynamic route parameter.
            For example, /tickets/3 opens the details page for ticket #3.

            fetchTickets is passed down so the shared ticket list can be
            refreshed after a ticket is updated or deleted.
          */}
          <Route
            path="/tickets/:id"
            element={<TicketDetails fetchTickets={fetchTickets} />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App