from fastapi import FastAPI
from app import models
from app.database import engine
from app.routes import router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Task API", version="1.0")

models.Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
