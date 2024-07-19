import { Button, Text } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
const UserBadge = ({user,handleFunction}) => {
  return (
    <>
      <Button rightIcon={<CloseIcon onClick={handleFunction} boxSize={2} />} colorScheme='purple' padding="0.5em" margin="0.5em" borderRadius="sm">
        <Text fontWeight="bold" fontSize="sm" backgroundColor="purple" color="white">{user.name}</Text>
      </Button>
    </>
  )
}

export default UserBadge