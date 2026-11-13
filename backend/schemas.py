from pydantic import BaseModel


# Defines the data the API expects when creating
# or updating a ticket.
class TicketCreate(BaseModel):
    title: str
    description: str
    priority: str
    status: str


# Defines the data returned by the API.
# It inherits all fields from TicketCreate and adds the database ID.
class TicketResponse(TicketCreate):
    id: int

    # Allows Pydantic to build the response directly from
    # SQLAlchemy model objects returned from the database.
    model_config = {
        "from_attributes": True
    }