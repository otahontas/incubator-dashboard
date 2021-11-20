import { Box, Center } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"

export default () => {
  return (
    <Box h="100vh" mx="32">
      <Center>
        <Outlet />
      </Center>
    </Box>
  )
}
