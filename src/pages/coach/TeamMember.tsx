import { Heading, Box, Stack, Flex, Center, VStack } from "@chakra-ui/react"
import useUsersWeeklyUpdates from "../../hooks/useUsersWeeklyUpdates"
import Loading from "../../sharedComponents/Loading"
import { useParams } from "react-router-dom"
import { Text } from "@chakra-ui/react"

const SingleFeedback = ({ feedback, weekNumber }) => {
  console.log(feedback.createdAt)
  return (
    <Box
      borderWidth="1px"
      rounded="lg"
      shadow="1px 1px 3px rgba(0,0,0,0.3)"
      maxWidth={800}
      p={6}
      mt="12px"
      mb="12px"
      width="100%"
    >
      <Stack spacing={4}>
        <Flex direction="row-reverse" justify="space-between">
          <Text
            textTransform={"uppercase"}
            color={"black"}
            fontWeight={600}
            fontSize={"sm"}
            bg="orange"
            p={2}
            alignSelf={"flex-start"}
            rounded={"lg"}
          >
            Feedback sent on{" "}
            {new Date(feedback.createdAt.seconds * 1000).toLocaleDateString(
              "fi-FI"
            )}
          </Text>
          <Heading pl="2" size="lg">
            Week {weekNumber}
          </Heading>
        </Flex>
        <Box p="2">
          <Heading size="sm">
            What is the biggest improvement you have done this week?
          </Heading>
          <Text size="md" color="gray.600">
            {feedback.biggestImprovement}
          </Text>
        </Box>
        <Box p="2">
          <Heading size="sm">
            What is the biggest obstacle you faced this week?
          </Heading>
          <Text size="md" color="gray.600">
            {feedback.biggestObstacle}
          </Text>
        </Box>
        <Box p="2">
          <Heading size="sm">What have you learned this week?</Heading>
          <Text size="md" color="gray.600">
            {feedback.learned}
          </Text>
        </Box>
        <Box p="2">
          <Heading size="sm">How excited are you to keep going?</Heading>
          <Text size="md" color="gray.600">
            {feedback.morale} out of 5
          </Text>
        </Box>
      </Stack>
    </Box>
  )
}

export default () => {
  const { memberId } = useParams()
  const { status, data } = useUsersWeeklyUpdates(memberId)
  if (status === "loading") return <Loading />
  console.log(data)
  return (
    <VStack>
      <Heading pb="2">Users weekly feedbacks</Heading>
      {data.length === 0 && (
        <Text>User hasn't given any weekly feedbacks yet!</Text>
      )}
      {data.map((f, i) => (
        <Box py="2">
          <SingleFeedback
            key={f.biggestImprovement}
            feedback={f}
            weekNumber={data.length - i}
          />
        </Box>
      ))}
    </VStack>
  )
}
