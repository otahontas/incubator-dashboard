import { useFirestore, useFirestoreCollectionData } from "reactfire"
import { query, collection, orderBy } from "firebase/firestore"

const useNewestRoadmapTemplate = () => {
  const newestId = "iDpilFE2ELxr8whrvgsb"
  const firestore = useFirestore()
  const roadmapTemplates = collection(
    firestore,
    "roadmapTemplates",
    newestId,
    "roadmap"
  )
  const roadmapTemplatesQuery = query(roadmapTemplates, orderBy("title"))
  return useFirestoreCollectionData(roadmapTemplatesQuery, {
    idField: "id",
  })
}

export default useNewestRoadmapTemplate
