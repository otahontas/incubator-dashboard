import { useSigninCheck } from "reactfire"
import { useRoutes, BrowserRouter, useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import { AuthContext } from "../App"
import { LoginView } from "./LoginView"
import { setDoc, collection, doc, getDoc } from "firebase/firestore"
import { useFirestore } from "reactfire"

const Proxy = () => {
  const { role, setUser } = useContext(AuthContext)
  const { status, data: signedInResult } = useSigninCheck()
  const navigate = useNavigate()
  const firestore = useFirestore()
  useEffect(() => {
    const fetchData = async () => {
      if (signedInResult.signedIn && role === "coach") {
        let userDoc = await getDoc(
          doc(firestore, "users", signedInResult.user.uid)
        )
        if (!userDoc.data()) {
          await setDoc(doc(firestore, "users", signedInResult.user.uid), {
            role,
            teamId: "",
          })
          userDoc = await getDoc(
            doc(firestore, "users", signedInResult.user.uid)
          )
        }
        setUser(userDoc.data())
        window.localStorage.setItem("user", JSON.stringify(userDoc.data()))
        navigate("/coach")
      } else if (signedInResult.signedIn && role === "participant") {
        let userDoc = await getDoc(
          doc(firestore, "users", signedInResult.user.uid)
        )
        if (!userDoc.data()) {
          await setDoc(doc(firestore, "users", signedInResult.user.uid), {
            role,
            teamId: "",
          })
          userDoc = await getDoc(
            doc(firestore, "users", signedInResult.user.uid)
          )
        }
        setUser(userDoc.data())
        window.localStorage.setItem("user", JSON.stringify(userDoc.data()))
        navigate("/participant")
      }
    }
    fetchData()
  }, [])

  return <LoginView />
}

export default Proxy
