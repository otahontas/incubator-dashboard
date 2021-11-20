import { Box, Heading, Text } from "@chakra-ui/react"
import { query, collection, orderBy } from "firebase/firestore"
import { useLocation } from "react-router-dom"
import { useFirestore, useFirestoreCollectionData } from "reactfire"

export default () => {
  const { state } = useLocation()
  const team = state as Team

  const firestore = useFirestore()
  const { status, data } = useFirestoreCollectionData(
    query(
      collection(firestore, "teams", team.id, "weeklyUpdates"),
      orderBy("createdAt", "desc")
    )
  )

  return (
    <Box>
      <Heading size="2xl"> {team.name}</Heading>
      <Heading pt="12" pb="6" size="md">
        Weekly updates
      </Heading>
      <Box p="6" borderWidth="1px" borderRadius="lg">
        hi
      </Box>
    </Box>
  )
}
