from sqlalchemy import Column, Integer, String

from database import Base


# SQLAlchemy model representing the "tickets" table in PostgreSQL.
class Ticket(Base):
    # Name of the database table this model maps to.
    __tablename__ = "tickets"

    # Primary key used to uniquely identify each ticket.
    # index=True creates a database index to make ID lookups faster.
    id = Column(Integer, primary_key=True, index=True)

    # Short title describing the issue.
    # nullable=False means this field is required in the database.
    title = Column(String, nullable=False)

    # More detailed description of the support issue.
    description = Column(String, nullable=False)

    # Stores values such as Low, Medium, or High.
    priority = Column(String, nullable=False)

    # Stores the current ticket status,
    # such as Open, In Progress, or Resolved.
    status = Column(String, nullable=False)