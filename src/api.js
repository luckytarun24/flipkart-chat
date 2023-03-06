const fetchChatData = async () =>
  await fetch("https://my-json-server.typicode.com/codebuds-fk/chat/chats");
export default fetchChatData;
