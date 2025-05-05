import { useState, useEffect, useRef, FormEvent } from "react";
import axios from "axios";

interface ChatMessage {
  user: "user" | "bot";
  message: string;
}

function Chatbot() {
  const [chatbotOpen, setChatbotOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { user: "bot", message: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { user: "user", message: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      console.log(process.env.NEXT_PUBLIC_BACKEND_SERVER);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/query`,
        {
          userQuery: input,
        },
      );

      const botMessage: ChatMessage = {
        user: "bot",
        message:
          response.data.response ||
          "I didn't get that. Could you please rephrase?",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (e) {
      console.error("Error fetching response:", e);
      setMessages((prev) => [
        ...prev,
        {
          user: "bot",
          message:
            "❗ Error getting response from server. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {chatbotOpen ? (
        <div className="relative">
          <div className="bg-white max-h-[500px] dark:bg-gray-800 rounded-xl shadow-xl flex flex-col w-[400px] max-w-md overflow-hidden border border-green-200 dark:border-gray-700">
            <div className="bg-green-600 dark:bg-green-700 text-white text-lg font-semibold p-4 rounded-t-xl flex justify-between items-center">
              <span>Shri Ram Traders Assistant</span>
              <button
                onClick={() => setChatbotOpen(false)}
                className="text-white hover:text-green-200 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 h-80">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.user === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`p-3 rounded-lg text-sm whitespace-pre-wrap max-w-[80%] ${
                      msg.user === "user"
                        ? "bg-green-600 text-white rounded-tr-none"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-green-600 animate-bounce"></div>
                      <div
                        className="w-2 h-2 rounded-full bg-green-600 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-green-600 animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messageEndRef} />
            </div>

            <form
              onSubmit={sendMessage}
              className="border-t border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-800"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-grow border bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center"
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setChatbotOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg transition-all transform hover:scale-105"
          aria-label="Open chat"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export default Chatbot;
