from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="CloudOps Ticketing API")


class Ticket(BaseModel):
    title: str
    description: str
    priority: str
    status: str


tickets = [
    {
        "id": 1,
        "title": "VPN connection issue",
        "description": "User cannot connect to corporate VPN",
        "priority": "High",
        "status": "Open",
    }
]


@app.get("/")
def root():
    return {"message": "CloudOps Ticketing API is running"}


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.get("/tickets")
def get_tickets():
    return tickets


@app.get("/tickets/{ticket_id}")
def get_ticket(ticket_id: int):
    for ticket in tickets:
        if ticket["id"] == ticket_id:
            return ticket

    raise HTTPException(status_code=404, detail="Ticket not found")


@app.post("/tickets")
def create_ticket(ticket: Ticket):
    new_ticket = {
        "id": len(tickets) + 1,
        **ticket.model_dump(),
    }

    tickets.append(new_ticket)

    return new_ticket


@app.put("/tickets/{ticket_id}")
def update_ticket(ticket_id: int, updated_ticket: Ticket):
    for index, ticket in enumerate(tickets):
        if ticket["id"] == ticket_id:
            tickets[index] = {
                "id": ticket_id,
                **updated_ticket.model_dump(),
            }

            return tickets[index]

    raise HTTPException(status_code=404, detail="Ticket not found")


@app.delete("/tickets/{ticket_id}")
def delete_ticket(ticket_id: int):
    for ticket in tickets:
        if ticket["id"] == ticket_id:
            tickets.remove(ticket)

            return {"message": "Ticket deleted"}

    raise HTTPException(status_code=404, detail="Ticket not found")