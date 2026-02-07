import os
import traceback

from chatbot.chatbot_core import generate_response
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


class ChatRequest(BaseModel):
    message: str
    history: list = []  # default to empty if omitted


class ChatResponse(BaseModel):
    response: str


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"status": "Zoe backend is up!"}


@app.get("/health")
async def health():
    return {"status": "healthy"}


@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    try:
        # DEBUG: print the API key to verify .env loaded
        key = os.getenv("OPENAI_API_KEY")
        print("OPENAI_API_KEY =", (key[:8] + "…") if key else "(not set)")
        reply = generate_response(req.message, req.history)
        return ChatResponse(response=reply)

    except Exception as e:
        # print full traceback to your Uvicorn console
        print("Exception in /chat:")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
