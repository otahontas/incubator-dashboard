import { RouteObject } from "react-router-dom"
import ParticipantLayout from "./layouts/ParticipantLayout"
import ParticipantHome from "./pages/participant/Home"
import CoachHome from "./pages/coach/Home"
import AdminHome from "./pages/admin/Home"
import Proxy from "./pages/Proxy"
import CoachLayout from "./layouts/CoachLayout"
import AdminLayout from "./layouts/AdminLayout"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Proxy />,
  },
  {
    path: "/participant",
    element: <ParticipantLayout />,
    children: [
      {
        path: "/participant/",
        element: <ParticipantHome />,
      },
    ],
  },
  {
    path: "/coach",
    element: <CoachLayout />,
    children: [
      {
        path: "/coach/",
        element: <CoachHome />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout/>,
    children: [
      {
        path: "/admin/",
        element: <AdminHome />,
      },
    ],
  }
]
