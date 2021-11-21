import { Heading, Box, Stack } from "@chakra-ui/react"
import useUsersWeeklyUpdates from "../../hooks/useUsersWeeklyUpdates"
import Loading from "../../sharedComponents/Loading"
import { useParams } from "react-router-dom"
import { Text } from "@chakra-ui/react"

const SingleFeedback = ({ feedback }) => {
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
        <Box>
          <Text
            textTransform={"uppercase"}
            color={"blue.400"}
            fontWeight={600}
            fontSize={"sm"}
            bg="blue.50"
            p={2}
            alignSelf={"flex-start"}
            rounded={"lg"}
          >
            Feedback sent on{" "}
            {new Date(feedback.createdAt.seconds * 1000).toLocaleDateString(
              "fi-FI"
            )}
          </Text>
        </Box>
        <Box>
          <Heading size="md" color="green.400">
            What is the biggest improvement you have done this week?"
          </Heading>
          <Text size="md" color="gray.600">
            {feedback.biggestImprovement}
          </Text>
        </Box>
        <Box>
          <Heading size="md" color="green.400">
            What is the biggest obstacle you faced this week?
          </Heading>
          <Text size="md" color="gray.600">
            {feedback.biggestObstacle}
          </Text>
        </Box>
        <Box>
          <Heading size="md" color="green.400">
            What have you learned this week?
          </Heading>
          <Text size="md" color="gray.600">
            {feedback.learned}
          </Text>
        </Box>
        <Box>
          <Heading size="md" color="green.400">
            How excited are you to keep going?"
          </Heading>
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
    <>
      <Heading>Users weekly feedbacks</Heading>
      {data.map((f) => (
        <SingleFeedback key={f.biggestImprovement} feedback={f} />
      ))}
    </>
  )
}
