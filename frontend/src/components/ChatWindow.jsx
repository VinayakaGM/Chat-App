import { Box } from "@chakra-ui/react";
import SingleChat from "./SingleChat";
import { ChatState } from "../context/ChatContext";

export const ChatWindow = () => {

  let {user, selectedChat, setSelectedChat} = ChatState();

  return (
    <Box
      display="flex"
      flexDir="column"
      height={"84vh"}
      minHeight="80vh"
      boxShadow="0 5px 5px 5px rgba(0,0,0,0.4)"
      padding="1em"
      width="100%"
      marginTop="1em"
      marginLeft="0.5em"
      marginRight="0.5em"
      borderRadius="0.5em"
    >
      <SingleChat />
    </Box>
  );
};
