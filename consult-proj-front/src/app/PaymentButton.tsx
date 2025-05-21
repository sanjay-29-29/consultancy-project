import { Dispatch, SetStateAction } from "react";
import { ChatMessage } from "./Chatbot";

export const PaymentButton = ({
  amount,
  id,
  setMessages
}: {
  amount: number;
  id: string;
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
}) => {
  const checkoutHandler = async () => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: amount * 100,
      currency: "INR",
      name: "Payment razorpay",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: id,
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
      handler: function () {
        setMessages((msg) => [...msg , { user: "bot", message: "Payment Success"  }]); // Set success state
      },
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const rzp1 = new window.Razorpay(options);

    rzp1.open();
  };

  return (
    <>
      <img
        className="h-12 w-24"
        src={
          "https://bsmedia.business-standard.com/_media/bs/img/article/2022-07/04/full/1656922506-9167.jpg"
        }
        onClick={checkoutHandler}
      />
    </>
  );
};
