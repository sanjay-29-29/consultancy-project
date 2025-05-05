import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userId, setUserId] = useState('');
  const messageEndRef = useRef(null);

  useEffect(() => {
    setUserId(uuidv4());
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { user: 'user', message: input };
    setMessages(prev => [...prev, userMessage]);

    setInput('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/query', {
        message: input,
        user_id: userId,
        prompt: 'museum',
      });

      const botMessage = { user: 'bot', message: response.data.message };
      setMessages(prev => [...prev, botMessage]);
    } catch(e){
        console.error('Error fetching response:', e);
      setMessages(prev => [...prev, { user: 'bot', message: '❗ Error getting response from server.' }]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl flex flex-col">
        <div className="bg-indigo-600 text-white text-lg font-semibold p-4 rounded-t-xl">
            Shri Ram Traders Chatbot
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[500px] scrollbar-hide">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg text-sm whitespace-pre-wrap max-w-[80%] ${
                msg.user === 'user'
                  ? 'ml-auto bg-indigo-500 text-white'
                  : 'mr-auto bg-gray-200 text-gray-800'
              }`}
            >
              {msg.message}
            </div>
          ))}
          <div ref={messageEndRef}></div>
        </div>
        <form onSubmit={sendMessage} className="flex border-t border-gray-300 p-3 gap-2">
          <input
            type="text"
            className="flex-grow border bg-gray-300 text-black
             border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;
