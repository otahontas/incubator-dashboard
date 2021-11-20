import { Box, Center } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import OverallLayout from "./OverallLayout"

export default () => {
  return (
    <OverallLayout>
      <Box h="100vh" mx="32">
        <Center>
          <Outlet />
        </Center>
      </Box>
    </OverallLayout>
  )
}
