from fastapi import FastAPI

app = FastAPI(title="CloudOps Ticketing API")

@app.get("/")
def root():
    return {
        "message": "CloudOps Ticketing API is running"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }
