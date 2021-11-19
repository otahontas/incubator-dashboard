import { getFirestore } from 'firebase/firestore';
import { useFirebaseApp, FirestoreProvider } from 'reactfire';
import Roadmap from "./Roadmap"


const App = () => {
  const firestoreInstance = getFirestore(useFirebaseApp());
  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <Roadmap />
    </FirestoreProvider>
  );
}

export default App;
