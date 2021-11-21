import { useFirestore, useFirestoreCollectionData } from "reactfire"
import { query, collection, orderBy } from "firebase/firestore"

const useUsersWeeklyUpdates = (
  userId: string,
  orderByField: string = "createdAt",
  orderByOrder: "desc" | "asc" = "asc"
) => {
  const firestore = useFirestore()
  const c = collection(firestore, "users", userId, "weeklyUpdates")
  const q = query(c, orderBy(orderByField, orderByOrder))
  return useFirestoreCollectionData(q, { idField: "id" })
}

export default useUsersWeeklyUpdates
