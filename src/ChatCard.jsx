const ChatCard = ({
  id,
  title,
  imageURL,
  orderId,
  lastMessage,
  setOpenChat,
}) => {
  return (
    <div className="chat-card" key={id} onClick={setOpenChat}>
      <img className={"card-image"} src={imageURL} alt="no image" />
      <div className="details">
        <div className="title">{title}</div>
        <div className="order-details">{orderId}</div>
        <div className="description">{lastMessage ? lastMessage : ""}</div>
      </div>
    </div>
  );
};

export default ChatCard;
