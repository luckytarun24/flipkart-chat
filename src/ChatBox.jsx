import { useEffect, useState } from "react";
const ChatBox = ({ chatDetails, sendMessage: handleSendMessage }) => {
  const [textfield, setTextField] = useState("");
  const sendMessage = () => {
    const message = {
      messageId: `msg${chatDetails.messageList.length}`,
      message: textfield,
      timestamp: "325454333",
      sender: "USER",
      messageType: "text",
    };

    handleSendMessage(message, chatDetails.id);
    // setTextField("");
  };
  useEffect(() => {
    setTextField("");
  }, [chatDetails]);
  return (
    <div className="chat-box">
      <div className="chat-header">
        <img
          className={"card-image"}
          src={chatDetails.imageURL}
          alt="no image"
        />
        <div className="title">{chatDetails.title}</div>
      </div>
      <div className="chat">
        {chatDetails.messageList.map(
          ({ messageId, message, timestamp, sender, messageType }) => (
            <div
              className={`message ${
                sender === "BOT" ? "message-left" : "message-right"
              }`}
              key={messageId}
            >
              <div
                className={`contain ${
                  sender === "BOT" ? "contain-left" : "contain-right"
                }`}
              >
                {message}
              </div>
            </div>
          )
        )}
      </div>
      <div className="chat-footer">
        <input
          className="message-textfield"
          name="message"
          value={textfield}
          onChange={(event) => setTextField(event.target.value)}
        />
        <button className="send-button" onClick={sendMessage}>
          send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
