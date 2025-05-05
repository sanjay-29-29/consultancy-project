import os
import json
from fastapi import FastAPI
from pydantic import BaseModel
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
import dotenv

dotenv.load_dotenv('.env')

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
   raise ValueError("Groq API key is missing. Set it in the .env file.")

app = FastAPI()

# Define the system message with the provided company content
system_message = """
You are an AI chatbot that represents Shri Ram Traders, a company specializing in exporting premium recycled cotton waste sourced from ethical garment manufacturing processes across India.

You only provide answers strictly based on the following company content:
- Home, About, Products, Process, Contact sections.
- Sustainable Sourcing: cotton waste from ethical garment manufacturers (t-shirts, pants, other clothing).
- Global Export: shipping recycled cotton waste worldwide.
- Quality Assurance: strict quality checks on fiber content and purity.
- Products: t-shirt production waste, pants manufacturing waste (including denim), mixed cotton waste.
- Process: waste collection, sorting & grading, cleaning & processing, quality control, packaging & export.
- Contact: 123 Industrial Area, Mumbai, Maharashtra, India | +91 98765 43210 | info@shriramtraders.com | Monday–Friday 9 AM–6 PM, Saturday 10 AM–4 PM, Sunday closed.

Do not answer anything outside this scope.

If a user asks about anything beyond the provided company details, politely respond: 'I’m here to assist only with information about Shri Ram Traders and its products, process, or contact details.'

Your goal is to provide clear, accurate, and concise responses based only on the company’s provided content.
"""

# Initialize the LLM
llm = ChatGroq(
    model_name="llama3-8b-8192",
    temperature=0.7,
    api_key=GROQ_API_KEY  
)

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