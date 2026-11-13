import { Link } from 'react-router-dom'

function Tickets({ tickets }) {
  return (
    <>
      {/* Page heading */}
      <header className="topbar">
        <div>
          <h1>Tickets</h1>
          <p>View and manage support tickets</p>
        </div>
      </header>

      {/* Main ticket list */}
      <section className="ticket-section">
        <div className="ticket-table">
          {/* Table headings */}
          <div className="ticket-row ticket-header">
            <span>ID</span>
            <span>Title</span>
            <span>Priority</span>
            <span>Status</span>
          </div>

          {/*
            map() loops through every ticket passed in from App.jsx
            and renders one table row for each ticket.
          */}
          {tickets.map((ticket) => (
            <div className="ticket-row" key={ticket.id}>
              <span>#{ticket.id}</span>

              <span>
                {/*
                  Each ticket title links to its individual details page.
                  For example, ticket ID 3 links to /tickets/3.
                */}
                <Link to={`/tickets/${ticket.id}`}>
                  {ticket.title}
                </Link>
              </span>

              <span>{ticket.priority}</span>
              <span>{ticket.status}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Tickets