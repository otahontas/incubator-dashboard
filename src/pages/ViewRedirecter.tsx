import { useEffect } from "react"
import Loading from "../sharedComponents/Loading"
import useAuthenticatedUser from "../hooks/useAuthenticatedUser"
import { useNavigate } from "react-router-dom"
import { useAuth, useSigninCheck } from "reactfire"
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth"
import { Button } from "@chakra-ui/react"

// plz fix this, it's ugly
const LoginButton = () => {
  const auth = useAuth()
  const login = async () => {
    await signInWithRedirect(auth, new GoogleAuthProvider())
  }
  return <Button onClick={login}>LOGIN</Button>
}

const ViewRedirecter: React.FC = () => {
  const { status, data } = useAuthenticatedUser()
  
  const navigate = useNavigate()
  useEffect(() => {
    if (status === 'loading') return
    if (data?.role === 'participant') {
      navigate('/participant')
    }
    if (data?.role === 'coach') {
      navigate('/coach')
    }
    if (data?.role === 'admin') {
      navigate('/admin')
    }
  }, [status])

  if (!data) return <LoginButton />
  // show loader while resolving redirecter
  return <Loading />
}

export default ViewRedirecter
