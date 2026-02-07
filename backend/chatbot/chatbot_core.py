import datetime
import json
import os

from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings
from openai import OpenAI

# Load environment variables
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise RuntimeError("OPENAI_API_KEY missing in .env")

# Initialize OpenAI v1 client
client = OpenAI(api_key=OPENAI_API_KEY)

# Initialize embeddings and RAG retriever
embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)
CHROMA_DB_DIR = os.getenv("CHROMA_DB_DIR", "chroma_db")
try:
    _vectorstore = Chroma(
        persist_directory=CHROMA_DB_DIR, embedding_function=embeddings
    )
    retriever = _vectorstore.as_retriever(search_kwargs={"k": 10})
except Exception as e:
    print(f"Warning: Could not load Chroma DB from {CHROMA_DB_DIR}: {e}")

    class DummyRetriever:
        def get_relevant_documents(self, query):
            return []

    retriever = DummyRetriever()

# Logging configuration
LOG_FILE_PATH = os.getenv("LOG_FILE_PATH", "logs/conversations.jsonl")
log_dir = os.path.dirname(LOG_FILE_PATH)
if log_dir and not os.path.exists(log_dir):
    os.makedirs(log_dir, exist_ok=True)


def log_conversation(message: str, history: list, response: str, retrieved: list):
    entry = {
        "timestamp": datetime.datetime.utcnow().isoformat(),
        "history": history,
        "message": message,
        "retrieved_docs": [doc.metadata for doc in retrieved],
        "response": response,
    }
    with open(LOG_FILE_PATH, "a", encoding="utf-8") as f:
        f.write(json.dumps(entry) + "\n")


def generate_response(message: str, history: list) -> str:
    """
    Generate a RAG-augmented, empathetic response using retrieved context.
    Logs retrievals and conversation.
    """
    # System prompt guiding empathy and RAG use
    system_prompt = {
        "role": "system",
        "content": (
            "You are Zoe, an empathetic AI assistant of Think Round, Inc., "
            "providing trauma-informed support. "
            "You generate responses solely within the scope of "
            "Think Round’s mission and interests. "
            "Answer the user’s questions by grounding your response "
            "in the provided context documents when relevant."
        ),
    }

    # Retrieve relevant docs
    docs = retriever.get_relevant_documents(message)
    print(f"Retrieved {len(docs)} context documents for query: '{message}'")

    # Combine context into a single system message
    if docs:
        context_text = "\n---\n".join([doc.page_content for doc in docs])
        context_message = {
            "role": "system",
            "content": (
                "Contextual information retrieved for your question:\n"
                f"{context_text}"
            ),
        }
        convo = [system_prompt, context_message]
    else:
        convo = [system_prompt]

    # Append previous history and the new user turn
    convo += history
    convo.append({"role": "user", "content": message})

    # Call OpenAI chat completion via v1 API
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=convo,
        temperature=0.7,
        max_tokens=512,
    )
    bot_reply = response.choices[0].message.content.strip()

    # Log the exchange with retrieved metadata
    log_conversation(message, history, bot_reply, docs)
    return bot_reply
