import {
  Avatar,
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
} from "@chakra-ui/react";
import { BellIcon, SearchIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import ProfileMenu from "./ProfileMenu";

const Chatnav = ({
  user: {
    user: { name, photo, email },
  },
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  
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
            <Input placeholder="Type here..." />
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

        <ProfileMenu name={name} photo={photo} email={email}/>
        
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
