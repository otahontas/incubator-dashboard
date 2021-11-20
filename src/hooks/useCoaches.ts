import { useFirestoreCollectionData, useFirestore } from "reactfire"
import { collection, query } from "firebase/firestore"

const useCoaches = () => {
  const firestore = useFirestore()
  const users = collection(firestore, "users")
  const usersQuery = query(users)
  const {
    status,
    data: userData,
    ...rest
  } = useFirestoreCollectionData(usersQuery, {
    idField: "id",
  })
  return {
    status,
    data: userData ? userData.filter((d) => d.role === "coach") : [],
    ...rest,
  }
}

export default useCoaches
