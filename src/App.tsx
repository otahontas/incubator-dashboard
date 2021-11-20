import { useRoutes } from "react-router-dom"
import { routes } from "./routes"
import { useAuth, useSigninCheck } from "reactfire"
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth"
import Loading from "./sharedComponents/Loading"
import { Button } from "@chakra-ui/react"
import ErrorBoundary from "./sharedComponents/ErrorBoundary"

// plz fix this, it's ugly
const LoginButton = () => {
  const auth = useAuth()
  const login = async () => {
    await signInWithRedirect(auth, new GoogleAuthProvider())
  }
  return <Button onClick={login}>LOGIN</Button>
}

const App = () => {
  const appRoutes = useRoutes(routes)
  const { status, data: signInResult } = useSigninCheck()
  if (status === "loading") return <Loading />
  if (!signInResult.signedIn) return <LoginButton />
  return (
    <ErrorBoundary>
        {appRoutes}
    </ErrorBoundary>
  )
}

export default App
