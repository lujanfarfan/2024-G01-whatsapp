"use client"
import React from 'react';
import ChatItem from './ChatItem';

const ChatList = ({ chats, onChatClick }) => {
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
