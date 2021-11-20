import {
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Container,
  Box,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import Roadmaps from "./RoadmapTemplate"

const Header = () => {
  return (
    <Box
      bg={useColorModeValue("blue.50", "blue.900")}
      w="100%"
      p={4}
      color="black"
    >
      <Text
        textTransform={"uppercase"}
        color={"blue.400"}
        fontWeight={600}
        fontSize={"sm"}
        bg={useColorModeValue("blue.50", "blue.900")}
        p={2}
        alignSelf={"flex-start"}
        rounded={"md"}
      >
        Admin dashboard
      </Text>
    </Box>
  )
}

export default () => {
  return (
    <>
      <Container maxW="container.md">
        <Header />
        <Stack spacing={12}>
          <Heading>Manage the program</Heading>
          <Tabs isFitted variant="enclosed" colorScheme="blue">
            <TabList>
              <Tab>Roadmap templates</Tab>
              <Tab>Coaches and teams</Tab>
              <Tab>User management</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Roadmaps />
              </TabPanel>
              <TabPanel>
                <Roadmaps />
              </TabPanel>
              <TabPanel>
                <Roadmaps />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Container>
    </>
  )
}
