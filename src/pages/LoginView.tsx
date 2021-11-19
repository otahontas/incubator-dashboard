import { Button } from "@chakra-ui/button"
import { Center, Heading, HStack, Stack } from "@chakra-ui/layout"
import React from "react"

export const LoginView: React.FC = () => {
  return (
    <Center mt={200}>
      <Stack>
        <Heading>Welcome</Heading>
        <Heading>Choose your role!</Heading>
        <HStack>
          <Button colorScheme="blue">Coach</Button>
          <Button colorScheme="teal">Participant</Button>
        </HStack>
      </Stack>
    </Center>
  )
}
