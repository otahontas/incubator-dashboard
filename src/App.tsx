import { useRoutes } from "react-router-dom"
import { routes } from "./routes"
import { useAuth, useSigninCheck } from "reactfire"
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth"
import Loading from "./sharedComponents/Loading"
import { Button, Center, Heading, VStack } from "@chakra-ui/react"
import ErrorBoundary from "./sharedComponents/ErrorBoundary"

const LoginButton = () => {
  const auth = useAuth()
  const login = async () => {
    await signInWithRedirect(auth, new GoogleAuthProvider())
  }
  return (
    <Center h="100vh">
      <VStack>
        <Heading>Welcome to the Aalto Ventures</Heading>
        <Heading size="4xl" pb="12" color="orange">
          Impact Studio
        </Heading>

        <Button
          p="10"
          fontSize="2xl"
          size="lg"
          onClick={login}
          colorScheme="orange"
        >
          LOGIN
        </Button>
      </VStack>
    </Center>
  )
}

const App = () => {
  const appRoutes = useRoutes(routes)
  const { status, data: signInResult } = useSigninCheck()
  if (status === "loading") return <Loading />
  if (!signInResult.signedIn) return <LoginButton />
  return <ErrorBoundary>{appRoutes}</ErrorBoundary>
}

export default App
