import { Heading, Text, Box } from "@chakra-ui/react"

export interface MilestoneCardPartProps {
  title: string
  text: string
}

export default (props: MilestoneCardPartProps) => {
  const { title, text } = props

  return (
    <Box>
      <Heading size="3xs">{title}</Heading>
      <Text fontSize="sm">{text.split(" ").splice(20).join(" ")}...</Text>
    </Box>
  )
}
