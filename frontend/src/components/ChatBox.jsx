import Chatnav from "./Chatnav";
import { Chatusers } from "./Chatuser";
import { ChatWindow } from "./ChatWindow";
import { ChatState } from "../context/ChatContext";
import { Box } from "@chakra-ui/react";

export const ChatBox = () => {
  let { user } = ChatState();
  console.log("user", user);
  return (
    <div>
      {user && <Chatnav user={user} />}
      {/* <Chatusers />
      <ChatWindow /> */}
      <Box display={"flex"}>
        {user && <Chatusers />}
        {user && <ChatWindow />}
      </Box>
    </div>
  );
};
