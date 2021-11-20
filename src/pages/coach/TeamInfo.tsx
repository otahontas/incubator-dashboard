import { Box, Heading, HStack, StackDivider, Text, VStack, Button, Center } from "@chakra-ui/react"
import {Avatar, AvatarGroup} from '@chakra-ui/avatar'
// import { query, collection } from "firebase/firestore"
import { useLocation } from "react-router-dom"
import {useEffect, useState} from 'react'
// import { useFirestore, useFirestoreCollectionData, useFireStoreData } from "reactfire"

export default () => {
  
  const { state } = useLocation()
  const team = state as Team
  const [stage, setStage] = useState(team.roadmap[0])

     const handleStageSelect = (index: number) => {
       setStage(team.roadmap[index])
     }
  return (
    <Box>
      <HStack>
        <Avatar />
        <Heading size="md"> {team.name}</Heading>
      </HStack>
      <HStack>
        {team.roadmap.map((roadmap, index) => (
          <Button onClick={() => handleStageSelect(index)} key={roadmap.id}>{roadmap.title}</Button>
        ))}
      </HStack>
      <Center>
      <HStack overflowX='auto'>
        {stage.milestones.map((milestone, index) => (
          <Box key={index} borderWidth="1px" borderRadius="lg">
            <VStack divider={<StackDivider borderBlock="gray.200" />}>
                {Object.keys(milestone).map(key => (
                  <Box>
                    <Heading size='md'>{key}</Heading>
                    <Text>{milestone[key]}</Text>
                  </Box>
                ))}
            </VStack>
          </Box>
        ))}
      </HStack>
      </Center>
     
      <Heading pt="12" pb="6" size="md">
        Weekly updates
      </Heading>
      <Box p="6" borderWidth="1px" borderRadius="lg">
        hi
      </Box>
    </Box>
  )
}
