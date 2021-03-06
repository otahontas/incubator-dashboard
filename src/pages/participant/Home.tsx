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
  Center,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalBody,
  Input,
  FormLabel,
} from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/hooks"
import { Link } from "react-router-dom"
import { AiOutlineTeam } from "react-icons/ai"
import { useState } from "react"
import useTeam from "../../hooks/useTeam"
import Loading from "../../sharedComponents/Loading"
import useAuthenticatedUser from "../../hooks/useAuthenticatedUser"
import MilestoneCardPart from "./MilestoneCardPart"
import { useFirestore } from "reactfire"
import { updateDoc } from "@firebase/firestore"
import { doc } from "firebase/firestore"
import { InputControl } from "formik-chakra-ui"

export default ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: infoOpen,
    onOpen: infoOnOpen,
    onClose: infoOnClose,
  } = useDisclosure()
  const { status, data } = useTeam()
  const [currentStageId, setCurrentStageId] = useState(null)
  const [currentlySelect, setCurrentlySelect] = useState(null)
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
    let toggledToDone
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
      toggledToDone = false
      currentMilestonesByTitle[milestoneTitle].done = [
        ...currentMilestonesByTitle[milestoneTitle].done.filter(
          (u) => u !== userData.id
        ),
      ]
    } else {
      toggledToDone = true
      currentMilestonesByTitle[milestoneTitle].done.push(userData.id)
    }

    const newMilestones = _.chain(Object.values(currentMilestonesByTitle))
      .sortBy("index")
      //@ts-ignore
      .map((o) => _.omit(o, "index"))
      .value()

    currentStagesById[activeStage.id].milestones = newMilestones

    const newStages = _.chain(Object.values(currentStagesById))
      .sortBy("index")
      //@ts-ignore
      .map((o) => _.omit(o, "index"))
      .value()

    await updateDoc(doc(firestore, "teams", userData.teamId), {
      roadmap: newStages,
    })
    if (toggledToDone) {
      onOpen()
    }
  }

  const countValue = () => {
    const { done, all } = stages.reduce(
      (acc, curr) => ({
        done:
          acc.done +
          curr.milestones.filter((m) => m.done.includes(userData.id)).length,
        all: acc.all + curr.milestones.length,
      }),
      { done: 0, all: 0 }
    )
    return (done / all) * 100
  }

  return (
    <>
      <Flex direction="row" alignItems="center">
        <div
          style={{
            width: "100%",
            marginRight: "auto",
            paddingLeft: "16px",
            paddingRight: "24px",
          }}
        >
          <Progress
            colorScheme="green"
            height="20px"
            value={countValue()}
            borderRadius={8}
            width="100%"
          />
        </div>
        <Button
          px="8"
          as={Link}
          to={`/participant/team`}
          leftIcon={<AiOutlineTeam />}
        >
          Switch to team view
        </Button>
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

      <Divider mt="4" mb="2" />
      <Flex overflowX="auto">
        {activeStage.milestones.map((milestone, i) => (
          <Box key={milestone.title} p="6" w="400px">
            <VStack>
              <Box h="90px">
                <VStack>
                  <Text> Checkpoint {i + 1} </Text>
                  <Heading textAlign="center" size="md">
                    {milestone.title}
                  </Heading>
                </VStack>
              </Box>
              <Box p="6" borderWidth="1px" borderRadius="md">
                <Box
                  cursor="pointer"
                  onClick={() => {
                    setCurrentlySelect(milestone)
                    infoOnOpen()
                  }}
                >
                  <MilestoneCardPart title="Intro" text={milestone.intro} />
                  <MilestoneCardPart title="Learn" text={milestone.learn} />
                  <Divider mb="6" />
                  <MilestoneCardPart title="Task" text={milestone.task} />
                </Box>
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
      <Box h="12" />
      <Modal isOpen={infoOpen && !!currentlySelect} onClose={infoOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>More Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Box>
                <Heading size="md">Intro</Heading>
                <Text>{currentlySelect?.intro}</Text>
              </Box>
              <Box mt={3}>
                <Heading size="md">Learn</Heading>
                <Text>{currentlySelect?.learn}</Text>
              </Box>
              <Box mt={3}>
                <Heading size="md">Learn More Aalto Courses</Heading>
                <Text>{currentlySelect?.learnMoreAaltoCourses}</Text>
              </Box>
              <Box mt={3}>
                <Heading size="md">Learn More Other</Heading>
                <Text>{currentlySelect?.learnMoreOther}</Text>
              </Box>
              <Box mt={3}>
                <Heading size="md">Tasks</Heading>
                <Text>{currentlySelect?.task}</Text>
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="orange"
              mr={3}
              onClick={() => {
                setCurrentlySelect(null)
                infoOnClose()
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thank you for updating your status!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={(e) => e.preventDefault()}>
              <FormLabel>Feedback to the coaches</FormLabel>
              <Input />
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
