import { Box } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react"
import { Link, useLocation } from "react-router-dom"

export default () => {
  const location = useLocation()
  const path = location.pathname.slice(1).split("/")

  return (
    <Box pt="8" h="100vh" mx="32">
      <Box pb="8">
      <Breadcrumb>
        {path.length >= 1 && (
          <BreadcrumbItem>
            <BreadcrumbLink
              as={Link}
              to="/coach"
              isCurrentPage={path.length === 1}
            >
              Coach overview
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {path.length >= 2 && (
          <BreadcrumbItem>
            <BreadcrumbLink>Team details</BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {path.length >= 3 && (
          <BreadcrumbItem>
            <BreadcrumbLink>Team member details</BreadcrumbLink>
          </BreadcrumbItem>
        )}
    </Breadcrumb>
</Box>
      <Outlet />
    </Box>
  )
}
