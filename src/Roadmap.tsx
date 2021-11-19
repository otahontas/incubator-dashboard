import 'firebase/firestore';
import { useFirestoreCollectionData, useFirestore } from 'reactfire';
import { collection, query } from 'firebase/firestore';

const Roadmap = () => {
  const teamId = "0ptnrAiWyTyv5eV24a1e"
  const firestore = useFirestore();
  const roadmap = collection(firestore, 'teams', teamId, 'roadmap');
  const roadmapQuery = query(roadmap)

  // ReactFire!
  const { status, data } = useFirestoreCollectionData(roadmapQuery, {
    idField: 'id',
  });

  if (status === 'loading') {
    return <span>loading...</span>;
  }

  return (
    <ul>
      {data.map((milestone) => (
        <li key={milestone.id}>{milestone.title}</li>
      ))}
    </ul>
  );
}

export default Roadmap
