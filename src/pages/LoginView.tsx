import { Button } from "@chakra-ui/button"
import { Center, Heading, HStack, Stack } from "@chakra-ui/layout"
import React, { useContext } from "react"
import { useAuth } from "reactfire"
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth"
import { AuthContext } from "../App"

export const LoginView: React.FC = () => {
  const authContext = useContext(AuthContext)
  const auth = useAuth()
  const signIn = async (role: string) => {
    const provider = new GoogleAuthProvider()
    authContext.setRole(role)
    window.localStorage.setItem("role", role)
    await signInWithRedirect(auth, provider)
  }

  return (
    <Center mt={200}>
      <Stack>
        <Heading>Welcome</Heading>
        <Heading>Choose your role!</Heading>
        <HStack>
          <Button onClick={() => signIn("coach")} colorScheme="blue">
            Coach
          </Button>
          <Button onClick={() => signIn("participant")} colorScheme="teal">
            Participant
          </Button>
        </HStack>
      </Stack>
    </Center>
  )
}
