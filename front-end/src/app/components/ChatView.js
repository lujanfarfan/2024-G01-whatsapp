"use client";
const ChatView = ({ chat }) => {
  if (!chat || !chat.message_text) {
    return <p>No hay mensajes disponibles.</p>;
  }

  return (
    <div>
      <h2>{chat.chat_name || 'Chat Sin Nombre'}</h2>
      <div className="messages">
        {messages.map((message, index) => {
          const isSameSender = index > 0 && messages[index - 1].sender_id === message.sender_id;

          return (
            <div key={message.id} className="message">
              {!isSameSender && <strong>{message.sender_id}:</strong>}
              <span>{message.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
