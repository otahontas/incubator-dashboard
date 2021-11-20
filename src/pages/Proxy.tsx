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
    if (status === 'loading') return
    console.log("status in proxy", status)
    console.log("data in proxy", signedInResult)
    const fetchData = async () => {
      console.log("jees stuff starting to do thingys")
      console.log(signedInResult.signedIn)
      if (signedInResult.signedIn && role === "coach") {
        console.log("wtf is happening???")
        let userDoc = await getDoc(
          doc(firestore, "users", signedInResult.user.uid)
        )
        if (!userDoc.data()) {
          await setDoc(doc(firestore, "users", signedInResult.user.uid), {
            role,
            teamId: "",
            name: signedInResult.user.displayName
          })
          userDoc = await getDoc(
            doc(firestore, "users", signedInResult.user.uid)
          )
        }
        setUser(userDoc.data())
        window.localStorage.setItem("user", JSON.stringify(userDoc.data()))
        navigate("/coach")
      } else if (signedInResult.signedIn && role === "participant") {
        console.log("again wtf is happening???")
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
