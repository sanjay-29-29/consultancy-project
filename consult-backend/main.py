import json
import os

import dotenv
import razorpay
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from pydantic import BaseModel

from system_prompt import PROMPT

dotenv.load_dotenv(".env")

app = FastAPI()

client = razorpay.Client(auth=(os.getenv("RAZORPAY_KEY_ID"), os.getenv("RAZORPAY_KEY_SECRET")))
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

llm = ChatGroq(
    model_name="llama3-8b-8192",
    temperature=0.3,  # Lower temperature for more consistent JSON
    api_key=os.getenv("GROQ_API_KEY")
)

isBuyLoop = False

class QueryRequest(BaseModel):
    userQuery: str

async def create_order(user_id,quantity):
    try:
        client.set_app_details({"title" : "test", "version" : "beta"})
        amount = quantity * 100
        data = {
            "amount":  amount,
            "currency": "INR",
            "receipt": user_id,
        }
        data = client.order.create(data=data) # pyright: ignore
        return data['id']
    except Exception as e:
        print(e)

def create_prompt(user_query: str) -> str:
    return f"""
    {PROMPT['system_message']}
    
    Company Information:
    {json.dumps(PROMPT['company_info'], indent=2)}
    
    User Query: {user_query}
    
    Respond with ONLY the JSON object containing 'response' and 'buy' keys.
    DO NOT include any other text or explanation outside the JSON.
    Example response:
    {{"response": "answer text", "buy": false}}
    """

@app.post("/query")
async def query(request: QueryRequest):
    try:
        global isBuyLoop #ignore
        if isBuyLoop:
            try:
                amount = int(request.userQuery)
                print(amount)
                order_id = await create_order("temp", amount)
                isBuyLoop = False
                return {
                    "response" : "",
                    "buy": True,
                    "orderId": order_id,
                    "amount" : amount
                }
            except ValueError:
                return {
                    "response" : "The amount should be a number"
                }
        full_prompt = create_prompt(request.userQuery)
        result = llm.invoke(full_prompt)

        if("true" in result.content):
            isBuyLoop = True
            return {
                "response" : "Please enter the amount you want to pay...",
                "buy" : False 
            }
        try:
            response = json.loads(result.content)
            if isinstance(response, dict):
                return response
        except json.JSONDecodeError:
            pass
        
        try:
            json_start = result.content.find('{')
            json_end = result.content.rfind('}') + 1
            if json_start != -1 and json_end != -1:
                json_str = result.content[json_start:json_end]
                response = json.loads(json_str)
                if isinstance(response, dict):
                    return response
        except (json.JSONDecodeError, ValueError):
            pass
        
        return {"response": result.content, "buy": False}

    except Exception as e:
        return {"response": f"Error processing request: {str(e)}", "buy": False}
