from pydantic_settings import BaseSettings, SettingsConfigDict


# Defines application configuration values that are loaded
# from environment variables or the local .env file.
class Settings(BaseSettings):
    # PostgreSQL connection string used by database.py.
    database_url: str

    # Tell Pydantic Settings to automatically load variables
    # from the .env file using UTF-8 encoding.
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8"
    )


# Create one settings object that can be imported
# throughout the backend application.
settings = Settings()