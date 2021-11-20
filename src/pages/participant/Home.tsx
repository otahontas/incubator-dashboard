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
} from "@chakra-ui/react"
import { AiOutlineTeam } from "react-icons/ai"
import { useState } from "react"

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
    name: "Stage0",
    milestones: [milestone, milestone, milestone, milestone],
  }

  const stage2: Stage = {
    id: "lol2",
    name: "Stage1",
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
            {stage.name}{" "}
          </Button>
        ))}
      </HStack>

      <Text>Active stage {stage.name}</Text>
      <Divider py="8" />
      <HStack overflowX="auto">
        {stage.milestones.map((milestone) => (
          <Box key={milestone.id} p="6" borderWidth="1px" borderRadius="lg">
            <Center>
              <Heading size="md"> {milestone.title} </Heading>
            </Center>
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
