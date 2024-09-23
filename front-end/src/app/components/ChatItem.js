'use client';
import React from 'react';
import styles from './chatItem.module.css';

const ChatItem = ({ chat, onClick }) => {
  return (
    <div className={styles.chatItem} onClick={() => onClick(chat.id)}>
      <img
        src={chat.profilePic}
        alt={chat.name}
        className={styles.profilePic}
      />
      <div className={styles.chatInfo}>
        <h3 className={styles.chatName}>{chat.name}</h3>
        <p className={styles.lastMessage}>{chat.lastMessage}</p>
      </div>
    </div>
  );
};

export default ChatItem;
