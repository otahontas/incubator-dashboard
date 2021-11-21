import { Box } from "@chakra-ui/react"
import { Outlet, useNavigate } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react"
import { Link, useLocation } from "react-router-dom"

export default () => {
  const { pathname, state } = useLocation()
  const navigate = useNavigate()
  const path = pathname.slice(1).split("/")

  return (
    <Box pt="8" h="100vh" mx="32">
      <Box pb="8">
        <Breadcrumb>
          {path.length >= 1 && (
            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={() => navigate(`/coach`, { state })}
                isCurrentPage={path.length === 1}
              >
                Coach overview
              </BreadcrumbLink>
            </BreadcrumbItem>
          )}
          {path.length >= 2 && (
            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={() => {
                  if (!state) return
                  navigate(`/coach/${path[1]}`, { state })
                }}
              >
                Team details
              </BreadcrumbLink>
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
