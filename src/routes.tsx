import { RouteObject } from "react-router-dom"
import ParticipantLayout from "./layouts/ParticipantLayout"
import ParticipantHome from "./pages/participant/Home"
import CoachHome from "./pages/participant/Home"
import { LoginView } from "./pages/LoginView"
import CoachLayout from "./layouts/CoachLayout"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <LoginView />,
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
]
