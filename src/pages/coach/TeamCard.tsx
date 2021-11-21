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
import { XAxis, YAxis, CartesianGrid, Line, LineChart } from "recharts"
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

  const data1 = [ ...Array(10).fill(0) ].map((_, i) => ({ x: getRandomIntInclusive(0, 5) }))
  // get average of data1
  const average = data1.reduce((acc, curr) => {
    return { x: acc.x + curr.x }
  }, { x: 0 })
  const {x: avg} = { x: average.x / data1.length  }

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
            <Heading> {avg} </Heading>
          </Center>
        </Box>
      </Flex>
      <Box mt={8} display="flex" alignItems="center" justifyContent="flex-start" width="100%">
        <LineChart width={300} height={200} data={data1} style={{marginLeft: '-32px'}}>
              <XAxis />
              <YAxis domain={[0, 5]} />
              <Line dataKey="x" stroke="#48BB78" />
            </LineChart>
          </Box>
    </Box>
  )
}
