function Dashboard({ tickets }) {
  // Total number of tickets currently loaded from the backend.
  const totalTickets = tickets.length

  // Count tickets by status so the dashboard cards can show live totals.
  // toLowerCase() makes the comparison work even if the API returns
  // values like "Open" instead of "open".
  const openTickets = tickets.filter(
    (ticket) => ticket.status.toLowerCase() === 'open'
  ).length

  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status.toLowerCase() === 'in_progress'
  ).length

  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status.toLowerCase() === 'resolved'
  ).length

  return (
    <>
      {/* Page heading */}
      <header className="topbar">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of support tickets</p>
        </div>
      </header>

      {/* Summary cards showing ticket counts */}
      <section className="stats-grid">
        <div className="stat-card">
          <h3>Total Tickets</h3>
          <p>{totalTickets}</p>
        </div>

        <div className="stat-card">
          <h3>Open</h3>
          <p>{openTickets}</p>
        </div>

        <div className="stat-card">
          <h3>In Progress</h3>
          <p>{inProgressTickets}</p>
        </div>

        <div className="stat-card">
          <h3>Resolved</h3>
          <p>{resolvedTickets}</p>
        </div>
      </section>

      {/* Displays the tickets that were passed down from App.jsx */}
      <section className="ticket-section">
        <h2>Recent Tickets</h2>

        <div className="ticket-table">
          {/* Table headings */}
          <div className="ticket-row ticket-header">
            <span>ID</span>
            <span>Title</span>
            <span>Priority</span>
            <span>Status</span>
          </div>

          {/*
            map() loops through the ticket array and creates
            one row for every ticket returned by the backend.
          */}
          {tickets.map((ticket) => (
            <div className="ticket-row" key={ticket.id}>
              <span>#{ticket.id}</span>
              <span>{ticket.title}</span>
              <span>{ticket.priority}</span>
              <span>{ticket.status}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Dashboard