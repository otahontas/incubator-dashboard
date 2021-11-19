import { RouteObject }from 'react-router-dom'
import { LoginView } from './pages/LoginView'
import { FeedbackView } from "./pages/FeedbackView"

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <LoginView />
    },
  { 
    path: "/form",
    element: <FeedbackView />
  }
]

