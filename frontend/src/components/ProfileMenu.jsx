import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Divider,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const ProfileMenu = ({ name, email, photo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  let navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    <>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          <Avatar name={name} src={photo} size={"sm"} />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={onOpen}>Profile</MenuItem>

          <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent textAlign={"center"}>
              <ModalHeader>Profile</ModalHeader>
              <ModalCloseButton />
              <ModalBody
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"1em"}
              >
                <Text fontSize={"2xl"}>{email}</Text>
                <Avatar name={name} src={photo} size={"2xl"} />
              </ModalBody>

              {/* <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter> */}
            </ModalContent>
          </Modal>

          <Divider />
          <MenuItem onClick={logout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default ProfileMenu;
