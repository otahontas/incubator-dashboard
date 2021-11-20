import { Flex, Heading, Box, Text, IconButton } from "@chakra-ui/react"
import { BsArrowsAngleExpand } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import useAllUsers from "../../hooks/useAllUsers"
import Loading from "../../sharedComponents/Loading"
import faker from "faker"
export interface TeamCardProps {
  team: Team
}

export default (props: TeamCardProps) => {
  const { team } = props
  const navigate = useNavigate()
  const { data, status }= useAllUsers()

  if (status === 'loading') return <Loading />
  console.log(data)
  console.log(team)

  return (
    <Box p="6" borderWidth="1px" borderRadius="lg">
      <Flex justify="space-between">
        <Heading>{team.name}</Heading>
        <IconButton
          aria-label="Expand team info"
          icon={<BsArrowsAngleExpand />}
          onClick={() => navigate(`/coach/${team.id}`, { state: team })}
        />
      </Flex>
      <Text> Team members</Text>
      {team.members.map(t => <Text>{
        data.find(u => u.id === t)?.name || faker.name.findName()
      }</Text>)}
    </Box>
  )
}
