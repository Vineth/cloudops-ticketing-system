import { useState } from 'react'

function CreateTicket({ fetchTickets }) {
  // Store the current value of each form field in React state.
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Low')
  const [status, setStatus] = useState('Open')

  // Runs when the user submits the Create Ticket form.
  const handleSubmit = async (event) => {
    // Prevent the browser from refreshing the whole page.
    event.preventDefault()

    // Build the JSON object that will be sent to the FastAPI backend.
    const newTicket = {
      title,
      description,
      priority,
      status,
    }

    try {
      // Send the new ticket to the POST /tickets API endpoint.
      const response = await fetch('http://localhost:8000/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTicket),
      })

      // Stop here if the backend returns an error response.
      if (!response.ok) {
        throw new Error('Failed to create ticket')
      }

      // Refresh the shared ticket list in App.jsx so the new ticket
      // appears immediately on the Dashboard and Tickets pages.
      await fetchTickets()

      // Reset the form back to its default values after a successful creation.
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
      {/* Page heading */}
      <header className="topbar">
        <div>
          <h1>Create Ticket</h1>
          <p>Create a new support ticket</p>
        </div>
      </header>

      <section className="ticket-form-section">
        {/* handleSubmit runs when this form is submitted */}
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

          {/* Submitting this button triggers handleSubmit */}
          <button type="submit">Create Ticket</button>
        </form>
      </section>
    </>
  )
}

export default CreateTicket