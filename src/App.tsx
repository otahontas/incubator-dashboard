import { useRoutes } from "react-router-dom"
import { routes } from "./routes"
import {useEffect} from "react"
import { useAuth, useSigninCheck } from "reactfire"
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth"
import Loading from "./sharedComponents/Loading"

const App = () => {
  const auth = useAuth()
  const appRoutes = useRoutes(routes)
  const { status, data: signInResult } = useSigninCheck()

  useEffect(() => {
    if (status === 'loading') return
    if (status === 'success' && signInResult?.signedIn) return
    const signIn = async () => {
      await signInWithRedirect(auth, new GoogleAuthProvider()).catch(error => console.log(error))
    }
    signIn()
  }, [])
  if (status === 'loading') return <Loading />

  const {signedIn, user } = signInResult

  console.log("signIn", signedIn)
  console.log("user", user)

  if (signedIn && user) {
    return (
    <>{appRoutes}</>
    )
  }
  return null
}

export default App
