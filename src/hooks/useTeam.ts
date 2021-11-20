import { useFirestoreCollectionData, useFirestore, useFirestoreDocData } from "reactfire"
import { doc, query } from "firebase/firestore"
import useAuthenticatedUser from "./useAuthenticatedUser"

const useTeam = () => {
  const firestore = useFirestore()
  const user = useAuthenticatedUser()
  const team = doc(firestore, "teams", user?.data?.teamId || '')
  return useFirestoreDocData(team, {
    idField: "id"
  })
}

export default useTeam
