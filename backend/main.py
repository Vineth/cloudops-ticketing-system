from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import models
import schemas

from database import engine, SessionLocal

# Create the database tables defined in models.py if they do not already exist.
models.Base.metadata.create_all(bind=engine)

# Create the FastAPI application.
app = FastAPI(title="CloudOps Ticketing API")

# Allow the React frontend running on localhost:5173
# to make requests to this FastAPI backend on localhost:8000.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create a database session for each API request.
# The session is automatically closed after the request finishes.
def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()

# Basic root endpoint used to confirm the API is running.
@app.get("/")
def root():
    return {"message": "CloudOps Ticketing API is running"}

# Health-check endpoint that can be used by Docker,
# monitoring tools, or deployment platforms.
@app.get("/health")
def health():
    return {"status": "healthy"}

# READ: Return all tickets stored in PostgreSQL.
@app.get("/tickets", response_model=list[schemas.TicketResponse])
def get_tickets(db: Session = Depends(get_db)):
    return db.query(models.Ticket).all()

# READ: Return one specific ticket using its database ID.
@app.get("/tickets/{ticket_id}", response_model=schemas.TicketResponse)
def get_ticket(ticket_id: int, db: Session = Depends(get_db)):
    ticket = (
        db.query(models.Ticket)
        .filter(models.Ticket.id == ticket_id)
        .first()
    )

    # Return a 404 response if the requested ticket does not exist.
    if ticket is None:
        raise HTTPException(status_code=404, detail="Ticket not found")

    return ticket

# CREATE: Add a new ticket to the database.
@app.post("/tickets", response_model=schemas.TicketResponse)
def create_ticket(
    ticket: schemas.TicketCreate,
    db: Session = Depends(get_db)
):
    # Convert the validated Pydantic request data into
    # a SQLAlchemy Ticket object.
    new_ticket = models.Ticket(
        title=ticket.title,
        description=ticket.description,
        priority=ticket.priority,
        status=ticket.status
    )

    # Add the ticket to the current database session.
    db.add(new_ticket)

    # Save the new ticket permanently to PostgreSQL.
    db.commit()

    # Reload the object so generated values such as the ID
    # are available before returning it to the frontend.
    db.refresh(new_ticket)

    return new_ticket

# UPDATE: Modify an existing ticket.
@app.put("/tickets/{ticket_id}", response_model=schemas.TicketResponse)
def update_ticket(
    ticket_id: int,
    updated_ticket: schemas.TicketCreate,
    db: Session = Depends(get_db)
):
    # Find the ticket that matches the ID from the URL.
    ticket = (
        db.query(models.Ticket)
        .filter(models.Ticket.id == ticket_id)
        .first()
    )

    if ticket is None:
        raise HTTPException(status_code=404, detail="Ticket not found")

    # Replace the existing database values with the
    # updated values received from the frontend.
    ticket.title = updated_ticket.title
    ticket.description = updated_ticket.description
    ticket.priority = updated_ticket.priority
    ticket.status = updated_ticket.status

    # Save the changes to PostgreSQL.
    db.commit()

    # Reload the updated database record before returning it.
    db.refresh(ticket)

    return ticket

# DELETE: Remove a ticket from the database.
@app.delete("/tickets/{ticket_id}")
def delete_ticket(ticket_id: int, db: Session = Depends(get_db)):
    # Find the ticket that should be deleted.
    ticket = (
        db.query(models.Ticket)
        .filter(models.Ticket.id == ticket_id)
        .first()
    )

    if ticket is None:
        raise HTTPException(status_code=404, detail="Ticket not found")

    # Mark the ticket for deletion and save the change.
    db.delete(ticket)
    db.commit()

    return {"message": "Ticket deleted"}