import { RouteObject } from "react-router-dom"
import ParticipantLayout from "./layouts/ParticipantLayout"
import Home from "./pages/participant/Home"
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
        element: <Home />,
      },
    ],
  },
  {
    path: "/coach",
    element: <CoachLayout />,
    children: [
      {
        path: "/coach/",
        element: <Home />,
      },
    ],
  },
]
