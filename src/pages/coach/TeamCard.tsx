import { Flex, Heading, Box, Text, Avatar } from "@chakra-ui/react"
import { BsArrowsAngleExpand } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import useAllUsers from "../../hooks/useAllUsers"
import Loading from "../../sharedComponents/Loading"
import faker from "faker"
import {Link} from 'react-router-dom'
export interface TeamCardProps {
  team: Team
}

export default (props: TeamCardProps) => {
  const { team } = props
  const navigate = useNavigate()
  const { data, status }= useAllUsers()

  if (status === 'loading') return <Loading />

  return (
    <Box cursor='pointer' onClick={() => navigate(`/coach/${team.id}`, { state: team })} p="6" borderWidth="1px" borderRadius="lg">
      <Flex justify="space-between">
        <Avatar  />
        <Heading>{team.name}</Heading>
      </Flex>
      <Text> Team members</Text>
      {team.members.map(t => <Text>{
        data.find(u => u.id === t)?.name || faker.name.findName()
      }</Text>)}
    </Box>
  )
}
