from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database.database import engine
from .models import todo
from .api import todos

# Create database tables
todo.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Todo List API",
    description="API for managing todo lists",
    version="1.0.0"
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, this should be configured to specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(todos.router)

@app.get("/")
async def root():
    return {"message": "Todo List API is running"}