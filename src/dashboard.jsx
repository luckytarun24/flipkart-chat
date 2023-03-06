import { useEffect, useState } from "react";
import fetchChatData from "./api";
import ChatCard from "./ChatCard";
import ChatBox from "./ChatBox";
const Dashboard = () => {
  const [chatList, setChatList] = useState([]);
  const [searchChatList, setSearchChatList] = useState([]);
  const [openChat, setOpenChat] = useState(undefined);
  const [searchText, setSearchText] = useState("");
  const handleSearchChange = (event) => {
    const serachText = event.target.value;
    setSearchText(event.target.value);
    const response = chatList.filter(
      ({ title, orderId }) =>
        title.includes(serachText) || orderId.includes(serachText)
    );
    console.log(response);
    setSearchChatList(response);
  };
  const sendMessage = (message, id) => {
    console.log(message, id, chatList);
    const response = [...chatList].map((chat) => {
      if (chat.id === id) {
        chat.messageList.push(message);
      }
      return chat;
    });
    console.log(response);
    setChatList(response);
  };
  useEffect(() => {
    fetchChatData()
      .then((response) => {
        response.json().then((data) => {
          setChatList(data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="dashboard">
      <div className={openChat ? "left" : ""}>
        <div className="search-field">
          <div className="title">Filter by Title / Order Id</div>
          <input
            className="serach-input"
            name="searchText"
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
        <div className="chat-list">
          {(searchChatList.length > 0 ? searchChatList : chatList)?.map(
            (chat) => (
              <ChatCard
                id={chat.id}
                title={chat.title}
                imageURL={chat.imageURL}
                orderId={chat.orderId}
                setOpenChat={() => setOpenChat(chat.id)}
              />
            )
          )}
        </div>
      </div>
      {openChat && (
        <ChatBox
          chatDetails={{ ...chatList.filter(({ id }) => id === openChat)[0] }}
          sendMessage={sendMessage}
        />
      )}
    </div>
  );
};

export default Dashboard;
