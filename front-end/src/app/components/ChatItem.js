'use client';
import React from 'react';
import styles from './chatItem.module.css';

const ChatItem = ({ chat, onClick }) => {
  console.log(chat);
  return (
    <div className={styles.chatItem} onClick={() => onClick(chat.id)}>
      <img
        src={chat.profile_pic}
        alt={chat.chat_name || 'Chat'}
        className={styles.profilePic} 
      />
      <div className={styles.chatInfo}>
        <h3 className={styles.chatName}>{chat.chat_name}</h3>
        <p className={styles.lastMessage}>{chat.message_text || 'No hay mensajes'}</p>
      </div>
    </div>
  );
};

export default ChatItem;
