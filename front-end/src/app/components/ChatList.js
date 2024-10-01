"use client";
import React from 'react';
import ChatItem from './ChatItem';

const ChatList = ({ chats, onChatClick }) => {
  if (chats.length === 0) {
    return <p>No hay chats disponibles.</p>;
  }

  return (
    <ul>
      {chats.map(chat => (
        <li key={chat.id}>
          <ChatItem chat={chat} onClick={onChatClick} />
        </li>
      ))}
    </ul>
  );
};

export default ChatList;
