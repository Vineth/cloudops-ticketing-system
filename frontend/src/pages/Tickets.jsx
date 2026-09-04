function Tickets({ tickets }) {
  return (
    <>
      <header className="topbar">
        <div>
          <h1>Tickets</h1>
          <p>View and manage support tickets</p>
        </div>
      </header>

      <section className="ticket-section">
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

export default Tickets