import { SimpleGrid, Heading, Box } from "@chakra-ui/react"
import TeamCard from "./TeamCard"
import { useFirestore, useFirestoreCollectionData } from "reactfire"
import { collection, query } from "firebase/firestore"
import Loading from "../../sharedComponents/Loading"

export default () => {
  const firestore = useFirestore()
  const { status, data } = useFirestoreCollectionData(
    query(collection(firestore, "teams")),
    { idField: "id" }
  )

  if (status === "loading") return <Loading />

  if (status === "error") {
    return <p>Error</p>
  }

  const teams: Team[] = data as Team[]

  return (
    <>
      <Heading>Teams</Heading>
      <SimpleGrid py="4" spacing="4" columns={[1, 1, 2, 3]}>
        {[...teams].map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </SimpleGrid>
    </>
  )
}
