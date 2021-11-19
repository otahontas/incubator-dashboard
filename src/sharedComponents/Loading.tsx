import { Center, Heading, Spinner, VStack } from "@chakra-ui/react"

export interface LoadingProps {
  children: React.ReactNode
}

export default (props: LoadingProps) => {
  const { children } = props
  return (
    <Center h="100vh">
      <VStack>
        <Spinner
          thickness="4px"
          speed="0.8s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <Heading>{children}</Heading>
      </VStack>
    </Center>
  )
}
