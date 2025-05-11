import os

import razorpay

client = razorpay.Client(auth=(os.getenv("RAZORPAY_KEY_ID"), os.getenv("RAZORPAY_KEY_SECRET")))

async def create_order(user_id,quantity):
    try:
        client.set_app_details({"title" : "test", "version" : "beta"})
        amount = quantity * 5000
        data = {
            "amount":  amount,
            "currency": "INR",
            "receipt": user_id,
        }
        data = client.order.create(data=data) # pyright: ignore
        return data['id']
    except Exception as e:
        print(e)
