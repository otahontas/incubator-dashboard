import { useEffect } from "react"
import { WeeklyUpdateView } from "./WeeklyUpdate"
import _ from "lodash"
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
  Center
} from "@chakra-ui/react"
import {Link} from 'react-router-dom'
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
    if (!data || currentStageId !== null) return
    setCurrentStageId(data.roadmap[0].id)
  }, [data])

  if (!currentStageId || status === "loading" || userStatus === "loading") {
    return <Loading />
  }
  const { roadmap: stages } = data
  const activeStage = stages.find((stage) => stage.id === currentStageId)

  const firestore = useFirestore()

  const toggleDone = async (milestoneTitle: string) => {
    let currentStagesById = stages.reduce(
      (acc, curr, i) => ({ ...acc, [curr.id]: { ...curr, index: i } }),
      {}
    )

    let currentMilestonesByTitle = currentStagesById[
      activeStage.id
    ].milestones.reduce(
      (acc, curr, i) => ({ ...acc, [curr.title]: { ...curr, index: i } }),
      {}
    )

    if (!currentMilestonesByTitle[milestoneTitle].done) {
      currentMilestonesByTitle[milestoneTitle].done = []
    }
    if (currentMilestonesByTitle[milestoneTitle].done.includes(userData.id)) {
      currentMilestonesByTitle[milestoneTitle].done = [
        ...currentMilestonesByTitle[milestoneTitle].done.filter(
          (u) => u !== userData.id
        ),
      ]
    } else {
      currentMilestonesByTitle[milestoneTitle].done.push(userData.id)
    }

    const newMilestones = _.chain(Object.values(currentMilestonesByTitle))
      .sortBy("index")
      .map((o) => _.omit(o, "index"))
      .value()

    currentStagesById[activeStage.id].milestones = newMilestones

    const newStages = _.chain(Object.values(currentStagesById))
      .sortBy("index")
      .map((o) => _.omit(o, "index"))
      .value()

    await updateDoc(doc(firestore, "teams", userData.teamId), {
      roadmap: newStages,
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
        <Button as={Link} to={`/participant/team`} leftIcon={<AiOutlineTeam />}>Switch to team view</Button>
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
      <Flex overflowX="auto">
        {activeStage.milestones.map((milestone, i) => (
          <Box key={milestone.title} p="6" w="400px">
            <VStack>
              <Text> Checkpoint{i + 1} </Text>
              <Heading size="md"> {milestone.title} </Heading>
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
      </Flex>
      <WeeklyUpdateView />
    </>
  )
}
