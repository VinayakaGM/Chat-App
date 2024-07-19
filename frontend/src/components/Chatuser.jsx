import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import { ChatState } from "../context/ChatContext";
import { AddIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { getuserName } from "../config/chatLogics.js";
import axios from "axios";
import GroupChatModal from "./GroupChatModal.jsx";

export const Chatusers = () => {
  let [loggedUser, setLoggedUser] = useState(null);
  const { user, chats, setChats, selectedChat, setSelectedChat } = ChatState();
  // console.log("chats in chatUsers",chats);
  let toast = useToast();

  const fetchChats = async () => {
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      let { data } = await axios.get(
        "http://localhost:5000/api/v1/chat",
        config
      );
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    setLoggedUser(user);
    if (user) {
      fetchChats();
    }
  }, [user]);

  return (
    <Box
      width="35%"
      // height="100%"
      minHeight={"85vh"}
      boxShadow="0 5px 5px 5px rgba(0,0,0,0.4)"
      padding="1em"
      marginTop="1em"
      marginLeft="0.5em"
      borderRadius="0.5em"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" >
        <Text size="lg" fontWeight="bold">
          My Chats
        </Text>
        <GroupChatModal>
          <Button iconSpacing="2" rightIcon={<AddIcon />}>
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box>
        <Stack display="flex" flexDirection="column" marginTop={"1.5em"}> 
          {chats.map((chat) => {
            return (
              <Box
                key={chat._id}
                marginBottom="0.5em"
                borderRadius="0.5em"
                padding="1em"
                backgroundColor="teal"
                color="white"
                fontWeight="bold"
                _hover={{ backgroundColor: "#ddd" }}
                cursor="pointer"
              >
                <Text fontWeight="bold">
                  {chat.isGroupChat
                    ? chat.chatName
                    : getuserName(loggedUser.user._id, chat.users)}
                </Text>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
};
