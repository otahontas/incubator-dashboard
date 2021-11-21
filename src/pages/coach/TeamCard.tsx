import {
  Flex,
  Heading,
  Box,
  Text,
  Avatar,
  HStack,
  Center,
} from "@chakra-ui/react"
import { BsArrowsAngleExpand } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import useAllUsers from "../../hooks/useAllUsers"
import Loading from "../../sharedComponents/Loading"
import faker from "faker"
import { Link } from "react-router-dom"
export interface TeamCardProps {
  team: Team
  src: string
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive
}

export default (props: TeamCardProps) => {
  const { team, src } = props
  const navigate = useNavigate()
  const { data, status } = useAllUsers()

  if (status === "loading") return <Loading />

  return (
    <Box
      cursor="pointer"
      onClick={() => navigate(`/coach/${team.id}`, { state: team })}
      p="6"
      borderWidth="1px"
      borderRadius="lg"
    >
      <HStack spacing="5">
        <Avatar src={src} />
        <Heading>{team.name}</Heading>
      </HStack>
      <Flex>
        <Box p="2">
          <Heading pt="4" size="sm">
            Team members
          </Heading>
          {team.members.map((t) => (
            <Text pt="1">
              {data.find((u) => u.id === t)?.name || faker.name.findName()}
            </Text>
          ))}
        </Box>
        <Box ml="2" p="2">
          <Heading pt="4" size="sm">
            Team motivation
          </Heading>
          <Center pt="4">
            <Heading> {getRandomIntInclusive(1, 5)} </Heading>
          </Center>
        </Box>
      </Flex>
    </Box>
  )
}
