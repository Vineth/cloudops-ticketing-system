function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <h2>CloudOps</h2>

        <nav>
          <a href="#">Dashboard</a>
          <a href="#">Tickets</a>
          <a href="#">Create Ticket</a>
        </nav>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>Dashboard</h1>
            <p>Overview of support tickets</p>
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <h3>Total Tickets</h3>
            <p>0</p>
          </div>

          <div className="stat-card">
            <h3>Open</h3>
            <p>0</p>
          </div>

          <div className="stat-card">
            <h3>In Progress</h3>
            <p>0</p>
          </div>

          <div className="stat-card">
            <h3>Resolved</h3>
            <p>0</p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App