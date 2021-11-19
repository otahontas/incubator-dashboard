import { Box } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"

export default () => {
  return (
    <Box h="100vh" mx="32">
      <Outlet />
    </Box>
  )
}
