import { useFirestoreCollectionData, useFirestore } from "reactfire"
import { collection, query } from "firebase/firestore"

const useAllUsers = () => {
  const firestore = useFirestore()
  const users = collection(firestore, "users")
  const usersQuery = query(users)
  return useFirestoreCollectionData(usersQuery, {
    idField: "id",
  })
}

export default useAllUsers
