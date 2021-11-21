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
      <Text>The team is currently in stage 1</Text>
      <Divider mt={5} />
      <SimpleGrid spacing={5} mt={6} columns={3}>
        {team.members.map((member) => (
          <Box key={member} borderWidth="2px" p="6" minW="300px">
            <HStack as={Link} to={`/coach/${team.id}/${member}`}>
              <Avatar
                size="lg"
                name="Dan Abrahmov"
                src={faker.internet.avatar()}
              />
              <Heading size="md">
                {userData.find((u) => u.id === member)?.name ||
                  faker.name.findName()}
              </Heading>
            </HStack>
            <Divider mt={5} />
            {team.roadmap[0].milestones.length > 0 &&
              team.roadmap[0].milestones[0].done && (
                <HStack mt={5}>
                  <Progress
                    colorScheme="green"
                    value={
                      (team.roadmap[0].milestones.filter((milestone) =>
                        milestone?.done.find((id) => member === id)
                      ).length /
                        team.roadmap[0].milestones.length) *
                      100
                    }
                    width="50%"
                  />
                  <Text>
                    {
                      team.roadmap[0].milestones.filter((milestone) =>
                        milestone.done?.find((id) => member === id)
                      ).length
                    }
                    /{team.roadmap[0].milestones.length} checkpoints done
                  </Text>
                </HStack>
              )}
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}
