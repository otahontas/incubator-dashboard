import { Flex, Heading, Box, Text, IconButton } from "@chakra-ui/react"
import { BsArrowsAngleExpand } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
export interface TeamCardProps {
  team: Team
}

export default (props: TeamCardProps) => {
  const { team } = props
  const navigate = useNavigate()

  return (
    <Box p="6" borderWidth="1px" borderRadius="lg">
      <Flex justify="space-between">
        <Heading>{team.name}</Heading>
        <IconButton
          aria-label="Expand team info"
          icon={<BsArrowsAngleExpand />}
          onClick={() =>
            navigate(`/coach/${team.NO_ID_FIELD}`, { state: team })
          }
        />
      </Flex>
      <Text> {team.projectDescriptionMax50chars}</Text>
      <Text> Team members ids {team.members}</Text>
    </Box>
  )
}
