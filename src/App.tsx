import { getFirestore } from 'firebase/firestore';
import { useFirebaseApp, FirestoreProvider } from 'reactfire';


const App = () => {
  const firestoreInstance = getFirestore(useFirebaseApp());
  return (
    <FirestoreProvider sdk={firestoreInstance}>

    </FirestoreProvider>
  );
}

export default App;
