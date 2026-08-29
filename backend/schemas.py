from pydantic import BaseModel

class TicketCreate(BaseModel):
    title: str
    description: str
    priority: str
    status: str

class TicketResponse(TicketCreate):
    id: int

    model_config = {
        "from_attributes": True
    }