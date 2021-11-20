import { useEffect } from "react"
import { WeeklyUpdateView } from "./WeeklyUpdate"
import RoadmapView from "./RoadmapView"
import {
  Box,
  Button,
  Center,
  Divider,
  Text,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react"
import { AiOutlineTeam } from "react-icons/ai"
import { useState } from "react"
import useTeam from "../../hooks/useTeam"
import Loading from "../../sharedComponents/Loading"
import useAuthenticatedUser from "../../hooks/useAuthenticatedUser"
import MilestoneCardPart from "./MilestoneCardPart"

export default ({}) => {
  const { status, data } = useTeam()
  const [currentStageId, setCurrentStageId] = useState(null)
  const { status: userStatus, data: userData } = useAuthenticatedUser()

  useEffect(() => {
    if (!data) return
    setCurrentStageId(data.roadmap[0].id)
  }, [data])

  if (!currentStageId || status === "loading" || userStatus === "loading") {
    return <Loading />
  }
  const { roadmap: stages } = data
  const activeStage = stages.find((stage) => stage.id === currentStageId)

  return (
    <>
      <Flex direction="row-reverse">
        <Button leftIcon={<AiOutlineTeam />}>Switch to team view</Button>
      </Flex>

      <HStack spacing="4">
        {stages.map((stage) => (
          <Button onClick={() => setCurrentStageId(stage.id)} key={stage.id}>
            {stage.title}
          </Button>
        ))}
      </HStack>

      <Text>Active stage {activeStage.name}</Text>
      <Divider py="8" />
      <HStack overflowX="auto">
        {activeStage.milestones.map((milestone, i) => (
          <Box key={milestone.id} p="6" minW="300px">
            <VStack>
              <Heading size="sm"> Checkpoint{i + 1} </Heading>
              <Text size="md"> {milestone.title} </Text>
              <Box p="6" borderWidth="1px" borderRadius="md">
                <MilestoneCardPart title="Intro" text={milestone.intro} />
                <MilestoneCardPart title="Learn" text={milestone.learn} />
                <Divider mb="6" />
                <MilestoneCardPart title="Task" text={milestone.task} />
                <Center pt="8">
                  <Button colorScheme="orange">Mark as done</Button>
                </Center>
              </Box>
            </VStack>
          </Box>
        ))}
      </HStack>
      <Heading as="h6" size="xs">
        Team ID: {userData.teamId}. Send this to your friends!
      </Heading>
      <RoadmapView milestones={activeStage.milestones} />
      <WeeklyUpdateView />
    </>
  )
}
