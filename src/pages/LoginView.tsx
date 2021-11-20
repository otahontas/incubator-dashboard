import {useEffect} from "react"
import { Button } from "@chakra-ui/button"
import { Center, Heading, HStack, Stack } from "@chakra-ui/layout"
import { useAuth, useSigninCheck, useUser } from "reactfire"
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth"
import { AuthContext } from "../App"
import Loading from "../sharedComponents/Loading"

const LoginView: React.FC = () => {
    return (
      <Center mt={200}>
        <Stack>
          <Heading>Welcome</Heading>
          <Heading>Choose your role!</Heading>
          <HStack>
            <Button onClick={() => console.log("coach")} colorScheme="blue">
              Coach
            </Button>
            <Button onClick={() => console.log("participant")} colorScheme="teal">
              Participant
            </Button>
          </HStack>
        </Stack>
  </Center>
  )
}

export default LoginView
