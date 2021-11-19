import * as React from "react"
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { FirebaseAppProvider, useFirebaseApp, AuthProvider, FirestoreProvider } from 'reactfire';
import { firebaseConfig } from "./firebaseConfig"

type Props = {
  children: React.ReactNode
}

const OtherProviders = ({children}: Props) => {
  const app = useFirebaseApp()
  const auth = getAuth(app);
  const firestoreInstance = getFirestore(app);

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestoreInstance}>
        {children}
      </FirestoreProvider>
    </AuthProvider>
  )
}

const FirebaseProviderWrapper = ({children}: Props) => (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <OtherProviders>
        {children}
      </OtherProviders>
    </FirebaseAppProvider>
  )

export default FirebaseProviderWrapper;
