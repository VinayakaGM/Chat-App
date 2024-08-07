import { useEffect, useState } from "react";
import { ChatState } from "../context/ChatContext";
import {
  Box,
  IconButton,
  Text,
  useToast,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { getuserFull, getuserName } from "../config/chatLogics.js";
import { ViewIcon } from "@chakra-ui/icons";
import ProfileModal from "./ProfileModal";
import axios from "axios";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  let { user, selectedChat, setSelectedChat } = ChatState();
  console.log("user", user);

  let [loading, setLoading] = useState(false);
  let toast = useToast();
  let [messageValue, setMessageValue] = useState("");
  let [messages, setMessages] = useState([]);
  console.log("selectedChat", selectedChat);

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      let config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      let { data } = await axios.get(
        `http://localhost:5000/api/v1/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error sending message",
        description: error.response?.data?.message || "Please try again",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat, user]);
  const sendMessage = async (e) => {
    try {
      setLoading(true);
      if (e.key == "Enter" && messageValue && selectedChat) {
        let config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        let data1 = {
          content: messageValue,
          chatId: selectedChat._id,
        };
        setMessageValue("");
        let { data } = await axios.post(
          "http://localhost:5000/api/v1/message",
          data1,
          config
        );
        setMessages([...messages, data]);
        setLoading(false);
      } else {
        return;
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error sending message",
        description: error.response?.data?.message || "Please try again",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const setMessagesHandler = (e) => {
    setMessageValue(e.target.value);
  };
  return (
    <>
      {!selectedChat ? (
        <Box
          display="flex"
          justifyContent="space-between"
          p={3}
          borderBottom="1px"
          borderColor="gray.200"
        >
          <Text fontSize="1.5em">Select user to start chatting</Text>
        </Box>
      ) : (
        <>
          {selectedChat.isGroupChat ? (
            <Box>
              <Box
                display="flex"
                justifyContent="space-between"
                p={3}
                borderColor="gray.200"
                alignItems="center"
              >
                <Text fontSize="1em" fontWeight="500">
                  {selectedChat.chatName.toUpperCase()}
                </Text>
                <IconButton icon={<ViewIcon />} />
              </Box>
              <Box>
                <FormControl>
                  <Input
                    onChange={setMessagesHandler}
                    onKeyDown={sendMessage}
                  />
                </FormControl>
              </Box>
            </Box>
          ) : (
            <Box display="flex" justifyContent="space-between" flexDirection="column" h="100%">
              <Box
                display="flex"  
                justifyContent="space-between"
                p={3}
                borderColor="gray.200"
                alignItems={"center"}
              >
                <Text fontSize="1em" fontWeight="500">
                  {getuserName(user.user._id, selectedChat.users).toUpperCase()}
                </Text>
                <ProfileModal
                  user={getuserFull(user.user._id, selectedChat.users)}
                >
                  <IconButton icon={<ViewIcon />} />
                </ProfileModal>
              </Box>
              <Box>
                <FormControl onKeyDown={sendMessage}>
                  <Input
                    onChange={setMessagesHandler}
                    placeholder="Enter a message"
                  />
                </FormControl>
              </Box>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default SingleChat;
