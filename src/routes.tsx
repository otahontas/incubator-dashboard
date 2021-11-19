import { RouteObject }from 'react-router-dom'
import { LoginView } from './pages/LoginView'

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <LoginView />
    }
]

