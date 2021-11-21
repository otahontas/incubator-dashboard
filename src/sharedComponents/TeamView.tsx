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
import { Progress } from "@chakra-ui/progress"
import useAllUsers from "../hooks/useAllUsers"
import useTeam from "../hooks/useTeam"
import Loading from "./Loading"

export default ({ team, userData, coachMode = false}) => {
  return (
    <SimpleGrid spacing={5} columns={3}>
      {team.members.map((member) => (
        <Box
          key={member}
          borderWidth="1px"
          borderRadius="lg"
          p="6"
          minW="300px"
        >
          <HStack as={coachMode && Link} to={coachMode && `/coach/${team.id}/${member}`}>
            <Avatar size="lg" src={faker.internet.avatar()} />
            <Heading pl="2" size="md">
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
                  rounded="md"
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
  )
}
