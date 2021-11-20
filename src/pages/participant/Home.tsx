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
import MilestoneCardPart from "./MilestoneCardPart"

export default ({ user }) => {
  const milestone: Milestone = {
    id: "1",
    title: "Entreprenerial capabilities",
    intro:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem vero voluptatum corrupti voluptas nostrum placeat optio blanditiis. Perspiciatis eos soluta maxime? Culpa similique, reiciendis et quidem eos quibusdam pariatur rem.",
    learn:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem vero voluptatum corrupti voluptas nostrum placeat optio blanditiis. Perspiciatis eos soluta maxime? Culpa similique, reiciendis et quidem eos quibusdam pariatur rem.",
    learnMoreAaltoCourses:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem vero voluptatum corrupti voluptas nostrum placeat optio blanditiis. Perspiciatis eos soluta maxime? Culpa similique, reiciendis et quidem eos quibusdam pariatur rem.",
    learnMoreOther:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem vero voluptatum corrupti voluptas nostrum placeat optio blanditiis. Perspiciatis eos soluta maxime? Culpa similique, reiciendis et quidem eos quibusdam pariatur rem.",
    task: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem vero voluptatum corrupti voluptas nostrum placeat optio blanditiis. Perspiciatis eos soluta maxime? Culpa similique, reiciendis et quidem eos quibusdam pariatur rem.",
    done: false,
  }

  const stage1: Stage = {
    id: "lol",
    name: "Stage1",
    milestones: [milestone, milestone, milestone, milestone],
  }

  const stage2: Stage = {
    id: "lol2",
    name: "Stage2",
    milestones: [milestone],
  }

  const stages: Stage[] = [stage1, stage2]

  const [stage, setStage] = useState(stages[0])

  return (
    <>
      <Flex direction="row-reverse">
        <Button leftIcon={<AiOutlineTeam />}>Switch to team view</Button>
      </Flex>

      <HStack spacing="4">
        {stages.map((stage) => (
          <Button onClick={() => setStage(stage)} key={stage.id}>
            {stage.name}
          </Button>
        ))}
      </HStack>

      <Text>Active stage {stage.name}</Text>
      <Divider my="8" />
      <HStack overflowX="auto">
        {stage.milestones.map((milestone, i) => (
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
        Team ID: {user.teamId}. Send this to your friends!
      </Heading>
      <RoadmapView />
      <WeeklyUpdateView />
    </>
  )
}
