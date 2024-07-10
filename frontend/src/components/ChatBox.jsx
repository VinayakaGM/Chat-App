import { Chatusers } from "./Chatuser";
import { Chat } from "./Chat";
import Chatnav from "./Chatnav";
import { ChatState } from "../context/ChatContext";

export const ChatBox = () => {
  let { user } = ChatState();
  // console.log("user", user);
  return (
    <div>
      {user && <Chatnav user={user} />}
      <Chatusers />
      <Chat />
    </div>
  );
};
