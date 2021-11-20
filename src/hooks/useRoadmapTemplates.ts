import { useFirestore, useFirestoreCollectionData } from "reactfire"
import { query, collection, orderBy } from "firebase/firestore"

const useRoadmapTemplates = (orderByField: string = "createdAt", orderByOrder: "desc" | "asc" = "asc") => {
  const firestore = useFirestore()
  const roadmapTemplates = collection(firestore, "roadmapTemplates")
  const roadmapTemplatesQuery = query(
    roadmapTemplates,
    orderBy(orderByField, orderByOrder)
  )
  return useFirestoreCollectionData(roadmapTemplatesQuery, {
idField: "id",
})
}

export default useRoadmapTemplates;
