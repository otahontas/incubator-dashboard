import { Box } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import OverallLayout from "./OverallLayout"

export default () => {
  return (
    <Box pt="8" h="100vh" mx="32">
      <Outlet />
    </Box>
  )
}
