import "firebase/firestore"
import { useFirestoreCollectionData, useFirestore } from "reactfire"
import { collection, query } from "firebase/firestore"
import { Divider } from "@chakra-ui/react"
import { Chrono } from "react-chrono"

const Roadmap = () => {
  const teamId = "0ptnrAiWyTyv5eV24a1e"
  const firestore = useFirestore()
  const roadmap = collection(firestore, "teams", teamId, "roadmap")
  const roadmapQuery = query(roadmap)

  // ReactFire!
  const { status, data } = useFirestoreCollectionData(roadmapQuery, {
    idField: "id",
  })

  if (status === "loading") {
    return <span>loading...</span>
  }

  const items = data.map((milestone) => ({
    title: "smth",
    cardTitle: milestone.title,
  }))

  return (
    <div style={{ height: "50%" }}>
      <Chrono items={items} mode="VERTICAL_ALTERNATING" />
      <Divider />
    </div>
  )
}

export default Roadmap
