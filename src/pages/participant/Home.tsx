import { useEffect } from "react"
import { WeeklyUpdateView } from "./WeeklyUpdate"
import {
  Box,
  Button,
  Divider,
  Text,
  Flex,
  Heading,
  HStack,
  Stack,
  VStack,
  Progress,
  Center,
} from "@chakra-ui/react"
import { AiOutlineTeam } from "react-icons/ai"
import { useState } from "react"
import useTeam from "../../hooks/useTeam"
import Loading from "../../sharedComponents/Loading"
import useAuthenticatedUser from "../../hooks/useAuthenticatedUser"
import MilestoneCardPart from "./MilestoneCardPart"
import { useFirestore } from "reactfire"
import { updateDoc } from "@firebase/firestore"
import { doc } from "firebase/firestore"

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

  const firestore = useFirestore()

  const toggleDone = async (milestoneTitle: string) => {
    const currentMilestone = activeStage.milestones.find(
      (milestone) => milestone.title === milestoneTitle
    )
    let newDone = currentMilestone.done ? [...currentMilestone.done] : []
    if (newDone.includes(userData.id)) {
      newDone.remove(userData.id)
    } else {
      newDone.push(userData.id)
    }

    await updateDoc(doc(firestore, "teams", userData.teamId), {
      roadmap: [
        {
          ...activeStage,
          milestones: [
            ...activeStage.milestones.filter(
              (milestone) => milestone.title !== milestoneTitle
            ),
            {
              ...currentMilestone,
              done: newDone,
            },
          ],
        },
        ...stages.filter((s) => s.id !== activeStage.id),
      ],
    })
  }

  return (
    <>
      <Flex direction="row" alignItems="center">
        <div
          style={{
            width: "100%",
            marginRight: "auto",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <Progress
            colorScheme="green"
            height="20px"
            value={60}
            borderRadius={8}
            width="100%"
          />
        </div>
        <Button leftIcon={<AiOutlineTeam />}>Switch to team view</Button>
      </Flex>

      <HStack spacing="4" margin={4}>
        {stages.map((stage) => (
          <Button
            colorScheme="green"
            variant={currentStageId === stage.id ? "solid" : "ghost"}
            onClick={() => setCurrentStageId(stage.id)}
            key={stage.id}
          >
            {stage.title}
          </Button>
        ))}
      </HStack>

      <Heading as="h6" size="xs">
        Team ID: {userData.teamId}. Send this to your friends!
      </Heading>

      <Divider py="8" />
      <HStack overflowX="auto">
        {activeStage.milestones.map((milestone, i) => (
          <Box key={milestone.title} p="6" minW="300px">
            <VStack>
              <Heading size="sm"> Checkpoint{i + 1} </Heading>
              <Text size="md"> {milestone.title} </Text>
              <Box p="6" borderWidth="1px" borderRadius="md">
                <MilestoneCardPart title="Intro" text={milestone.intro} />
                <MilestoneCardPart title="Learn" text={milestone.learn} />
                <Divider mb="6" />
                <MilestoneCardPart title="Task" text={milestone.task} />
                <Center pt="8">
                  {milestone?.done && milestone.done.includes(userData.id) ? (
                    <Button
                      onClick={() => {
                        toggleDone(milestone.title)
                      }}
                      colorScheme="green"
                    >
                      Undone
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        toggleDone(milestone.title)
                      }}
                      colorScheme="orange"
                    >
                      Mark as done
                    </Button>
                  )}
                </Center>
              </Box>
            </VStack>
          </Box>
        ))}
      </HStack>
      <WeeklyUpdateView />
    </>
  )
}
