import { Heading, Stack } from "@chakra-ui/react"
import Roadmaps from "./RoadmapTemplate"


export default () => {
  return (
    <>
      <Stack spacing={6}>
        <Heading>Manage the program</Heading>
        <Roadmaps />
      </Stack>
    </>
  )
}
