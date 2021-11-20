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
import CoachManagement from "./CoachManagement"
import Roadmaps from "./RoadmapTemplate"
import UserManagement from "./UserManagement"

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
                <CoachManagement />
              </TabPanel>
              <TabPanel>
                <UserManagement />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Container>
    </>
  )
}
