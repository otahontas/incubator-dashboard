import { Box } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import OverallLayout from "./OverallLayout"

export default () => {
  return (
    <OverallLayout>
      <Box h="100vh" mx="32">
        <Outlet />
      </Box>
    </OverallLayout>
  )
}
