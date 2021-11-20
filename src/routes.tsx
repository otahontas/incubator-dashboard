import { RouteObject } from "react-router-dom"
import ParticipantLayout from "./layouts/ParticipantLayout"
import ParticipantHome from "./pages/participant/Index"
import CoachHome from "./pages/coach/Home"
import AdminHome from "./pages/admin/Home"
import CoachLayout from "./layouts/CoachLayout"
import TeamInfo from "./pages/coach/TeamInfo"
import AdminLayout from "./layouts/AdminLayout"
import ViewRedirecter from "./pages/ViewRedirecter"
import TeamMember from "./pages/coach/TeamMember"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <ViewRedirecter />,
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
      {
        path: "/coach/:teamId/",
        element: <TeamInfo />,
      },
      {
        path: "/coach/:teamId/:memberId",
        element: <TeamMember />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/",
        element: <AdminHome />,
      },
    ],
  },
  {
    path: "*",
    element: <p>Not found!</p>,
  },
]
