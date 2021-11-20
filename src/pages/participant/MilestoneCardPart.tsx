import { Heading, Text, Box } from "@chakra-ui/react"

export interface MilestoneCardPartProps {
  title: string
  text: string
}

export default (props: MilestoneCardPartProps) => {
  const { title, text } = props

  return (
    <Box pb="4" textAlign="center">
      <Heading size="3xs">{title}</Heading>
      <Text fontSize="sm">{text.split(" ").slice(0, 20).join(" ")}...</Text>
    </Box>
  )
}
