import json
import os

import dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from pydantic import BaseModel

dotenv.load_dotenv(".env")

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("Groq API key is missing. Set it in the .env file.")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the system message with the provided company content
system_message = os.getenv("SYSTEM_MESSAGE")
# Initialize the LLM
llm = ChatGroq(model_name="llama3-8b-8192", temperature=0.7, api_key=GROQ_API_KEY)


# Define request schema
class QueryRequest(BaseModel):
    userQuery: str
    session: list[str] | None = None  # list of past exchanges if needed


@app.post("/query")
async def query(request: QueryRequest):
    try:
        # Construct the prompt without session history
        full_prompt = f"{system_message}\nUser: {request.userQuery}\nBot:"

        # Use simple prompt template
        prompt = ChatPromptTemplate.from_template(full_prompt)

        # Convert the prompt to a string or compatible format
        prompt_value = prompt.format()

        # Invoke the LLM
        result = llm.invoke(prompt_value)

        return {"response": result.content}

    except Exception as e:
        return {"error": str(e)}
