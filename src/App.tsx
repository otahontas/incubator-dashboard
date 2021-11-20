import { useRoutes } from "react-router-dom"
import { routes } from "./routes"
import { useAuth, useSigninCheck } from "reactfire"
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth"
import Loading from "./sharedComponents/Loading"
import { Button } from "@chakra-ui/react"
import ErrorBoundary from "./sharedComponents/ErrorBoundary"



const App = () => {
  const appRoutes = useRoutes(routes)
  const { status, data: signInResult } = useSigninCheck()
  if (status === "loading") return <Loading />

  return (
    <ErrorBoundary>
        {appRoutes}
    </ErrorBoundary>
  )
}

export default App
