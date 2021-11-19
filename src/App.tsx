import { useRoutes, BrowserRouter } from "react-router-dom"
import { routes } from "./routes"
import { useSigninCheck } from "reactfire"
import Loading from "./sharedComponents/Loading"
import { LoginView } from "./pages/LoginView"

const App = () => {
  const appRoutes = useRoutes(routes)

  const { status, data: signedInResult } = useSigninCheck()

  if (status === "loading") {
    return <Loading>Loading...</Loading>
  }

  // if (!signedInResult.signedIn) {
  //   return <LoginView />
  // }

  return <>{appRoutes}</>
}

export default App
