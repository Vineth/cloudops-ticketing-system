from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from config import settings


# Create the SQLAlchemy engine using the database connection
# string loaded from the application settings.
engine = create_engine(settings.database_url)


# Create a reusable database session factory.
# Each API request can use SessionLocal to open its own session.
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


# Base class used by SQLAlchemy models.
# models.py inherits from this Base when defining database tables.
Base = declarative_base()