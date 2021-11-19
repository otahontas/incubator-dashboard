import {useRoutes, BrowserRouter} from 'react-router-dom'
import { routes } from './routes';
import { getFirestore } from 'firebase/firestore';
import { useFirebaseApp, FirestoreProvider } from 'reactfire';

const App: React.FC = () => {
  const firestoreInstance = getFirestore(useFirebaseApp());
  const appRoutes = useRoutes(routes)
  console.log(appRoutes)
  return <FirestoreProvider sdk={firestoreInstance}>{appRoutes}</FirestoreProvider>

} 

export default App
