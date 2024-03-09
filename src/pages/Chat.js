import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Chat = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState({});
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

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
    } catch (error) {
      console.error("Error in handling user query -->", error);
    }
  };

  return (
    <div>
      <div>
        {chatHistory.map((chat, index) => (
          <div key={index}>
            <div>{chat.user}</div>
            <div>{chat.bot}</div>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          placeholder="Ask your question"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button onClick={() => handleUserQuery(message)}>Send</button>
        {/* You can add a "Stop" button if needed */}
      </div>
    </div>
  );
};

export default Chat;
