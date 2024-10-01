"use client";

import React, { useEffect, useState, useCallback } from 'react';
import ChatList from '../components/ChatList';
import CrearGrupo from '../components/CrearGrupo';

export default function Home() {
  const [chatData, setChatData] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [chatMessages, setChatMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('http://localhost:4000/getChats');
        const data = await res.json();

        setChatData(data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleChatClick = useCallback((chatId) => {
    const chat = chatData.find(chat => chat.id === chatId);
    setSelectedChat(chat);
    setChatMessages(prevMessages => ({
      ...prevMessages,
      [chatId]: prevMessages[chatId] || [{ text: chat.message_text, sender: chat.chat_name }],
    }));
  }, [chatData]);

  const handleSendMessage = useCallback(() => {
    if (newMessage.trim() === '') return;

    const chatId = selectedChat.id;
    const message = { text: newMessage, sender: 'Tú' };

    setChatMessages(prevMessages => ({
      ...prevMessages,
      [chatId]: [...(prevMessages[chatId] || []), message],
    }));

    setChatData(prevData =>
      prevData.map(chat =>
        chat.id === chatId ? { ...chat, message_text: newMessage } : chat
      )
    );

    setNewMessage('');
  }, [newMessage, selectedChat]);

  const handleCreateGroup = useCallback(() => {
    if (!groupName.trim()) return;

    const newGroup = {
      id: chatData.length + 1,
      chat_name: groupName,
      is_group: 1,
      created_at: new Date().toISOString(),
      message_text: `Grupo creado con ${selectedContacts.length + 1} contactos`,
      profilePic: 'https://thumbs.dreamstime.com/b/perfil-de-usuario-vectorial-avatar-predeterminado-179376714.jpg',
    };
    
    setChatData(prevData => prevData.concat(newGroup));

    setGroupName('');
    setSelectedContacts([]);
    setShowCreateGroup(false);
  }, [groupName, selectedContacts, chatData]);

  return (
    <div className="all-chats">
      <div className="chatslist">
        <h2>Chats</h2>
        <button onClick={() => setShowCreateGroup(true)}>+</button>
        {showCreateGroup && (
          <CrearGrupo
            groupName={groupName}
            setGroupName={setGroupName}
            selectedContacts={selectedContacts}
            setSelectedContacts={setSelectedContacts}
            contacts={chatData}
            onCreateGroup={handleCreateGroup}
            onCancel={() => setShowCreateGroup(false)}
          />
        )}
        {loading ? <p>Cargando chats...</p> : <ChatList chats={chatData} onChatClick={handleChatClick} />}
      </div>
      <div className="selectedchat">
        {selectedChat ? (
          <div className="chat-details">
            <div className="chat-header">
              <img src={selectedChat.profile_pic} alt={selectedChat.chat_name} className="profile-pic" />
              <h3>{selectedChat.chat_name}</h3>
              <p>{selectedChat.phone_number}</p> 
              <button onClick={() => setSelectedChat(null)}>Volver a los chats</button>
            </div>
            <div className="chat-messages">
              {(chatMessages[selectedChat.id] || []).map((message, index) => (
                <p key={index} className={message.sender === 'Tú' ? 'my-message' : 'their-message'}>
                  <strong>{message.sender}:</strong> {message.text}
                </p>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
                placeholder="Escribe un mensaje"
              />
              <button onClick={handleSendMessage} disabled={newMessage.trim() === ''}>Enviar</button>
            </div>
          </div>
        ) : (
          <h1>No hay chat seleccionado</h1>
        )}
      </div>
    </div>
  );
}
