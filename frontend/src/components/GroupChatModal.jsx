import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  Input,
  useToast,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { ChatState } from "../context/ChatContext";
import UserList from "./UserList";
import axios from "axios";
import UserBadge from "./UserBadge";

const GroupChatModal = ({ children }) => {
  let [groupName, setGroupName] = useState("");
  let [selectedUsers, setSelectedUsers] = useState([]);
  let [searchUsers, setSearchUsers] = useState([]);
  let [search, setSearch] = useState("");
  let [loading, setLoading] = useState(false);
  let { user, chats, setChats } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  let handleDelete = (id) => {
    let newUsers = selectedUsers.filter((user) => user._id !== id);
    setSelectedUsers(newUsers);
  };

  let fetchUsers = async (search) => {
    setSearch(search);
    if (!search) {
      return;
    }
    try {
      setLoading(true);
      let config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      let { data } = await axios.get(
        `http://localhost:5000/api/v1/user?search=${search}`,
        config
      );
      console.log(data);
      setLoading(false);
      setSearchUsers(data);
      
    } catch (error) {
      toast({
        title: "Couldn't fetch users",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!groupName || !selectedUsers) {
      toast({
        title: "Please fill all the fields",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      let config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      let { data } = await axios.post(
        `http://localhost:5000/api/v1/chat/group`,
        {
          chatName: groupName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
          isGroupChat: true,
        },
        config
      );

      console.log(data);
      setChats([data, ...chats]);
      setGroupName("");
      setSelectedUsers([]);
      setSearch("");
      setSearchUsers([]);
      onClose();

    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to Create the Chat",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Group Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Input
                placeholder="Enter Group Name"
                mb={3}
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Search users eg: John,Tony"
                mb={3}
                value={search}
                onChange={(e) => fetchUsers(e.target.value)}
              />
            </FormControl>
            <Box display={"flex"} flexWrap="wrap" gap={2}>
              {selectedUsers.map((user) => (
                <UserBadge
                  key={user._id}
                  user={user}
                  handleFunction={() => handleDelete(user._id)}
                />
              ))}
            </Box>

            {loading ? (
              <Spinner />
            ) : (
              searchUsers.length > 0 && (
                <Box>
                  {searchUsers.map((user) => (
                    <UserList
                      key={user._id}
                      user={user}
                      handleFunction={() =>
                        setSelectedUsers((prev) => [...prev, user])
                      }
                    />
                  ))}
                </Box>
              )
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
