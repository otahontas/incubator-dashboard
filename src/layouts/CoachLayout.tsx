import { Box } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"

export default () => {
  return (
    <Box pt="8" h="100vh" mx="32">
      <Outlet />
    </Box>
  )
}
