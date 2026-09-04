import { useState } from 'react'

function CreateTicket({ fetchTickets }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Low')
  const [status, setStatus] = useState('Open')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const newTicket = {
      title,
      description,
      priority,
      status,
    }

    try {
      const response = await fetch('http://localhost:8000/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTicket),
      })

      if (!response.ok) {
        throw new Error('Failed to create ticket')
      }

      await fetchTickets() // Refresh the ticket list after creating a new ticket

      setTitle('')
      setDescription('')
      setPriority('Low')
      setStatus('Open')

      alert('Ticket created successfully')
    } catch (error) {
      console.error('Error creating ticket:', error)
    }
  }

  return (
    <>
      <header className="topbar">
        <div>
          <h1>Create Ticket</h1>
          <p>Create a new support ticket</p>
        </div>
      </header>

      <section className="ticket-form-section">
        <form className="ticket-form" onSubmit={handleSubmit}>
          <label>
            Title
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </label>

          <label>
            Description
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
          </label>

          <label>
            Priority
            <select
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </label>

          <label>
            Status
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </label>

          <button type="submit">Create Ticket</button>
        </form>
      </section>
    </>
  )
}

export default CreateTicket