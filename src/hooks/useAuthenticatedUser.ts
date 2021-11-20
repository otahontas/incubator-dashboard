import { useUser } from "reactfire"
import { doc } from "firebase/firestore"
import { useFirestoreDocData, useFirestore } from "reactfire"

export default () => {
  const firestore = useFirestore()
  const user = useUser()
  if (!user || !user.data) return null
  const userWithData = doc(firestore, "users", user.data.uid)
  return useFirestoreDocData(userWithData, {
    idField: "id",
  })
}
