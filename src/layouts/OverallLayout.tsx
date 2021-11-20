import { Box, Text, useColorModeValue } from "@chakra-ui/react"
import * as React from "react"

const NavBar = () => {
  return (
    <Box
      bg={useColorModeValue("blue.50", "blue.900")}
      w="100%"
      p={4}
      color="black"
    >
      <Text
        textTransform={"uppercase"}
        color={"blue.400"}
        fontWeight={600}
        fontSize={"sm"}
        bg={useColorModeValue("blue.50", "blue.900")}
        p={2}
        alignSelf={"flex-start"}
        rounded={"md"}
      >
        Placeholder stuff
      </Text>
    </Box>
  )
}

type Props = {
  children: React.ReactNode
}

export default ({ children }: Props) => (
  <>
    <NavBar />
    {children}
  </>
)
