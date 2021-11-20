import { WeeklyUpdateView } from "./WeeklyUpdate"
import RoadmapView from "./RoadmapView"
import { Heading } from "@chakra-ui/react"

export default ({user}) => {
  return (
    <>
      <Heading as='h6' size='xs'>
        Team ID: {user.teamId}. Send this to your friends!
      </Heading>
      <RoadmapView />
      <WeeklyUpdateView />
    </>
  )
}
