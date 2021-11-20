import { SimpleGrid, Heading, Box } from "@chakra-ui/react"
import TeamCard from "./TeamCard"
import { useFirestore, useFirestoreCollectionData } from "reactfire"
import { collection, query } from "firebase/firestore"
import Loading from "../../sharedComponents/Loading"
import { useContext } from "react"
import { AuthContext } from "../../App"

export default () => {
  // const { user, setUser } = useContext(AuthContext)
  const firestore = useFirestore()
  const { status, data } = useFirestoreCollectionData(
    query(collection(firestore, "teams"))
  )

  if (status === "loading") return <Loading />

  // console.log(user)

  if (status === "error") {
    return <p>Error</p>
  }

  const teams: Team[] = data as Team[]

  return (
    <Box pt="8">
      <Heading>Teams</Heading>
      <SimpleGrid py="4" spacing="4" columns={[1, 1, 2, 4, 5]}>
        {[...teams].map((team) => (
          <TeamCard key={team.uid} team={team} />
        ))}
      </SimpleGrid>
    </Box>
  )
}
