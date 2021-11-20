import { useRoutes, BrowserRouter, Navigate } from "react-router-dom"
import { routes } from "./routes"
import { useSigninCheck } from "reactfire"
import Loading from "./sharedComponents/Loading"
import { LoginView } from "./pages/LoginView"
import { createContext, useState } from "react"

export const AuthContext = createContext<{
  role: string
  setRole: (role: string) => void
}>({ role: "", setRole: (role) => {} })

const App = () => {
  const [role, setRole] = useState(window.localStorage.getItem("role"))
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  )
  const appRoutes = useRoutes(routes)

  const { status, data: signedInResult } = useSigninCheck()

  if (status === "loading") {
    return <Loading />
  }

  return (
    <AuthContext.Provider value={{ role, setRole, user, setUser }}>
      {appRoutes}
    </AuthContext.Provider>
  )
}

export default App
