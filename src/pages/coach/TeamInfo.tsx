import { Box, Heading, HStack, StackDivider, Text, VStack, Button, Center, SimpleGrid, Divider, Progress } from "@chakra-ui/react"
import {Avatar, AvatarGroup} from '@chakra-ui/avatar'
// import { query, collection } from "firebase/firestore"
import { useLocation, Link } from "react-router-dom"
import faker from "faker"
import useAllUsers from "../../hooks/useAllUsers"
import Loading from "../../sharedComponents/Loading"
// import { useFirestore, useFirestoreCollectionData, useFireStoreData } from "reactfire"

export default () => {
  const { data, status }= useAllUsers()

  if (status === 'loading') return <Loading />
  const { state } = useLocation()
  const team = state as Team

  return (
    <Box>
      <HStack mb={5}>
        <Avatar />
        <Heading size="md"> {team.name}</Heading>
      </HStack>
      <Text>The team is currently in stage 1</Text>
      <Divider mt={5} />
      <SimpleGrid spacing={5} mt={6} columns={3}>
        {team.members.map((member) => (
          <Box key={member} borderWidth='2px' p="6" minW="300px">
            <HStack as={Link} to={`/coach/${team.id}/${member}`}>
                  <Avatar />
                  <Heading size='md'>{data.find(u => u.id === member)?.name || faker.name.findName()}</Heading>
            </HStack>
            <Divider mt={5} />
            {team.roadmap[0].milestones[0].done &&<HStack mt={5}>
              <Progress colorScheme='green' value={(team.roadmap[0].milestones.filter((milestone) =>milestone?.done.find(id => member === id)).length/team.roadmap[0].milestones.length)*100} width='50%' />
              <Text>{team.roadmap[0].milestones.filter((milestone) =>milestone.done?.find(id => member === id)).length}/{team.roadmap[0].milestones.length} checkpoints done</Text>
            </HStack>
            }
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}
