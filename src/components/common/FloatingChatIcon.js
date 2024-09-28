// FloatingChatIcon.js
import React from 'react';
import { IoChatbubbles } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const FloatingChatIcon = () => {
  return (
    <Link
      to="/chat"
      className="fixed bottom-5 right-5 bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 transition duration-300 animate-bounce"
    >
      <IoChatbubbles className="text-2xl" />
    </Link>
  );
};

export default FloatingChatIcon;

