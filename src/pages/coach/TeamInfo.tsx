import {
  Box,
  Heading,
  HStack,
  StackDivider,
  Text,
  VStack,
  Button,
  Center,
  SimpleGrid,
  Divider,
  Progress,
} from "@chakra-ui/react"
import { Avatar, AvatarGroup } from "@chakra-ui/avatar"
// import { query, collection } from "firebase/firestore"
import { useLocation, Link } from "react-router-dom"
import faker from "faker"
import TeamView from "../../sharedComponents/TeamView"
import useAllUsers from "../../hooks/useAllUsers"
import Loading from "../../sharedComponents/Loading"
// import { useFirestore, useFirestoreCollectionData, useFireStoreData } from "reactfire"

export default () => {
  const { state } = useLocation()
  const team = state as Team
  const { data: userData, status: userStatus } = useAllUsers()

  if (userStatus === "loading") {
    return <Loading />
  }

  return (
    <Box>
      <HStack mb={5}>
        <Avatar size="xl" name="Dan Abrahmov" src={faker.image.business()} />
        <Heading pl="4" size="xl">
          {team.name}
        </Heading>
      </HStack>
      <Heading mt="8" mb="8" size="md">
        Team stage 1
      </Heading>
      <TeamView team={team} userData={userData} />
    </Box>
  )
}
