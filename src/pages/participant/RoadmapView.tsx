import "firebase/firestore"
import { useFirestoreCollectionData, useFirestore } from "reactfire"
import { collection, query } from "firebase/firestore"
import { Divider } from "@chakra-ui/react"
import { Chrono } from "react-chrono"
import useAuthenticatedUser from "../../hooks/useAuthenticatedUser"
import Loading from "../../sharedComponents/Loading"

const Roadmap = ({milestones}) => {
  const items = milestones.map((milestone) => ({
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
