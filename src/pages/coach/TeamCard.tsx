import { Heading, Box, Text } from "@chakra-ui/react"

export interface TeamCardProps {
  team: Team
}

export default (props: TeamCardProps) => {
  const { team } = props
  return (
    <Box p="6" borderWidth="1px" borderRadius="lg">
      <Heading>{team.name}</Heading>
      <Text> {team.projectDescriptionMax50chars}</Text>
    </Box>
  )
}
