const ChatView = ({ chat }) => {
  return (
    <div>
      <h2>{chat.name}</h2>
      <div className="messages">
        {chat.messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
};

export default ChatView;
