const ChatView = ({ chat }) => {
  if (!chat || !chat.message_text) {
    return <p>No hay mensajes disponibles.</p>;
  }

  return (
    <div>
      <h2>{chat.name || 'Chat Sin Nombre'}</h2>
      <div className="messages">
        {chat.message_text.length > 0 ? (
          chat.message_text.map((message_text) => (
            <p key={message_text.id || message_text}>{message_text}</p>
          ))
        ) : (
          <p>No hay mensajes en este chat.</p>
        )}
      </div>
    </div>
  );
};
