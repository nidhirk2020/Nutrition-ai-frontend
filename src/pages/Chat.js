import React, { useRef, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Chat = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState({});
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const scrollRef = useRef();

  const handleUserQuery = async (userQuery) => {
    const email = user.email;
    try {
      let newChatHistory = [...chatHistory];
      newChatHistory.push({
        user: userQuery,
        bot: "AI is thinking ...",
      });
      setChatHistory(newChatHistory);

      const requestBody = new URLSearchParams();
      requestBody.append("message", userQuery);
      requestBody.append("history", JSON.stringify(history));

      const config = {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          email_id: email,
        },
      };

      // Make a POST request to your chatbot service
      const response = await axios.post(
        "https://nutrition-ai.onrender.com/chat_ai/chat",
        requestBody,
        config
      );

      newChatHistory[newChatHistory.length - 1].bot = response.data.response;
      setHistory(response.data.history);
      setChatHistory(newChatHistory);
      setMessage("");

      //scroll to bottom of chat upon new chat history
      scrollRef.current.scrollIntoView({behavior: 'smooth'});

    } catch (error) {
      console.error("Error in handling user query -->", error);
    }
  };

  return (
    <div className="py-5 px-2 w-full flex flex-col justify-end items-center gap-2">
      <div className="w-full overflow-auto invisible-scrollbar relative">
        {chatHistory.map((chat, index) => (
          <div key={index}>
            <div className="chat chat-end">
              <div className="chat-bubble chat-bubble-info">
                {chat.user}
              </div>
            </div>
            <div className="chat chat-start">
              <div className="chat-bubble chat-bubble-accent">
                {chat.bot}
              </div>
            </div>
          </div>
        ))}
        <div ref={scrollRef} className="opacity-0 select-none">Scroll to here(This won't be visible)</div>
      </div>
      <div className="flex gap-2 sm:gap-4 pb-10 sm:pb-0">
        <input 
          className="input input-bordered text-center"
          type="text"
          placeholder="Ask your question"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button className="btn btn-info text-lg font-semibold text-white w-fit"
         onClick={() => handleUserQuery(message)}>Send</button>
        {/* You can add a "Stop" button if needed */}
      </div>
    </div>
  );
};

export default Chat;
