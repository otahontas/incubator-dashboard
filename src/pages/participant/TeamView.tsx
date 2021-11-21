import { Avatar } from "@chakra-ui/avatar"
import {
  Box,
  Divider,
  Heading,
  HStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/layout"
import { Link } from "react-router-dom"
import faker from "faker"
import useTeam from "../../hooks/useTeam"
import { Progress } from "@chakra-ui/progress"
import useAllUsers from "../../hooks/useAllUsers"
import Loading from "../../sharedComponents/Loading"
import TeamView from "../../sharedComponents/TeamView"

export default () => {
  const { status, data } = useTeam()
  const { data: userData, status: userStatus } = useAllUsers()

  if (userStatus === "loading") {
    return <Loading />
  }
  const team = data as Team
  return (
    <Box>
      <HStack mb={5}>
        <Avatar size="xl" name="Dan Abrahmov" src={faker.image.business()} />
        <Heading pl="4" size="xl">
          {team.name}
        </Heading>
      </HStack>
      <Heading size="md">Team stage 0</Heading>
      <Divider my={8} />
      <TeamView team={team} userData={userData} />
    </Box>
  )
}
