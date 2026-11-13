import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function TicketDetails({ fetchTickets }) {
  // Read the ticket ID from the URL.
  // Example: /tickets/3 gives us id = 3.
  const { id } = useParams()

  // Lets us redirect the user to another route after actions like delete.
  const navigate = useNavigate()

  // Store the editable ticket fields in React state.
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Low')
  const [status, setStatus] = useState('Open')

  // Used while waiting for the backend response.
  const [loading, setLoading] = useState(true)

  // Stores an error message if the ticket cannot be loaded.
  const [error, setError] = useState('')

  // Fetch the selected ticket whenever the page loads
  // or whenever the ticket ID in the URL changes.
  useEffect(() => {
    setLoading(true)
    setError('')

    fetch(`http://localhost:8000/tickets/${id}`)
      .then((response) => {
        // FastAPI returns 404 when the ticket does not exist.
        if (!response.ok) {
          throw new Error('Ticket not found')
        }

        return response.json()
      })
      .then((data) => {
        // Populate the form with the ticket data returned by FastAPI.
        setTitle(data.title)
        setDescription(data.description)
        setPriority(data.priority)
        setStatus(data.status)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching ticket:', error)
        setError(error.message)
        setLoading(false)
      })
  }, [id])

  // Runs when the user clicks Save Changes.
  const handleSubmit = async (event) => {
    event.preventDefault()

    const updatedTicket = {
      title,
      description,
      priority,
      status,
    }

    try {
      const response = await fetch(`http://localhost:8000/tickets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTicket),
      })

      if (!response.ok) {
        throw new Error('Failed to update ticket')
      }

      await fetchTickets()

      alert('Ticket updated successfully')
    } catch (error) {
      console.error('Error updating ticket:', error)
    }
  }

  // Runs when the user clicks Delete Ticket.
  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this ticket?'
    )

    if (!confirmed) {
      return
    }

    try {
      const response = await fetch(`http://localhost:8000/tickets/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete ticket')
      }

      await fetchTickets()

      navigate('/tickets')
    } catch (error) {
      console.error('Error deleting ticket:', error)
    }
  }

  if (loading) {
    return <p>Loading ticket...</p>
  }

  // Show a clear message instead of an empty/broken form.
  if (error) {
    return (
      <>
        <header className="topbar">
          <div>
            <h1>Ticket not found</h1>
            <p>The requested support ticket does not exist.</p>
          </div>
        </header>
      </>
    )
  }

  return (
    <>
      <header className="topbar">
        <div>
          <h1>Ticket #{id}</h1>
          <p>View and update support ticket details</p>
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

          <button type="submit">Save Changes</button>

          <button
            type="button"
            className="delete-button"
            onClick={handleDelete}
          >
            Delete Ticket
          </button>
        </form>
      </section>
    </>
  )
}

export default TicketDetails