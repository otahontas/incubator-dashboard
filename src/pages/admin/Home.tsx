import {
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Container,
  Heading,
  Stack,
} from "@chakra-ui/react"
import Roadmaps from "./RoadmapTemplate"

export default () => {
  return (
    <>
      <Container maxW="container.lg">
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
