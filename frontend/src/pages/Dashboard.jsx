function Dashboard({ tickets }) {
  const totalTickets = tickets.length

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
      <header className="topbar">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of support tickets</p>
        </div>
      </header>

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

      <section className="ticket-section">
        <h2>Recent Tickets</h2>

        <div className="ticket-table">
          <div className="ticket-row ticket-header">
            <span>ID</span>
            <span>Title</span>
            <span>Priority</span>
            <span>Status</span>
          </div>

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