import {
  Box,
  Button,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  Menu,
  MenuButton,
  useToast,
} from "@chakra-ui/react";
import { BellIcon, SearchIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import ProfileMenu from "./ProfileMenu";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserList from "./UserList";
import { ChatState } from "../context/ChatContext";

const Chatnav = ({
  user: {
    token,
    user: { name, photo, email },
  },
}) => {
  const [search, setSearch] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chats, setChats, selectedChat, setSelectedChat } = ChatState();

  const btnRef = useRef();
  const toast = useToast();

  const accessChat = async (id) => {
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      let { data } = await axios.post(
        `http://localhost:5000/api/v1/chat/`,
        { userId: id },
        config
      );
      console.log(data);
      // if chat already exists in chats no need to add it otherwise add it
      if (!chats.find((chat) => chat._id === data._id))
        setChats([...chats, data]);
      setSelectedChat(data);
      setLoading(false);
      onClose();
    } catch (error) {
      toast({
        title: "Couldn't access chat",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleSearch = async () => {
    if (!search) {
      return toast({
        title: "Please enter a search term",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    }
    try {
      setLoading(true);
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/user?search=${search}`,
        config
      );
      console.log(data);
      setLoading(false);
      setSearchUsers(data);
      setSearch("");
    } catch (error) {
      toast({
        title: "Couldn't get users",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      padding={"1em"}
      alignItems={"center"}
    >
      <Button leftIcon={<SearchIcon />} ref={btnRef} onClick={onOpen}>
        Search
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search users</DrawerHeader>

          <DrawerBody>
            {/* <Input placeholder="Type here..." /> */}
            <Box display="flex" gap="1em">
              {" "}
              <Input
                placeholder="Search by name or email"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            <Box>
              {loading ? (
                <ChatLoading />
              ) : (
                searchUsers.map((user) => {
                  return (
                    <UserList
                      key={user._id}
                      user={user}
                      handleFunction={() => accessChat(user._id)}
                    />
                  );
                })
              )}
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Text>Chat app</Text>
      <Box
        display={"flex"}
        gap={"1em"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Menu>
          <MenuButton as={Button}>
            <BellIcon w={8} h={5} />
          </MenuButton>
        </Menu>

        <ProfileMenu name={name} photo={photo} email={email} />
      </Box>
    </Box>
  );
};

export default Chatnav;

// import STYLE from "../css modules/chatnav.module.css";
// import { Avatar, AvatarBadge, Box, Input } from "@chakra-ui/react";

// const Chatnav = () => {
//   return (
//     <Box className={STYLE.chatnav}>
//       <div className={STYLE.navitems}>
//         <Input
//           focusBorderColor="lime"
//           placeholder="Search"
//           width="100px"
//         />
//         <Avatar>
//           <AvatarBadge boxSize="1em" bg="green.500" />
//         </Avatar>
//       </div>
//     </Box>
//   );
// };

// export default Chatnav;
