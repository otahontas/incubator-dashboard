import { useEffect } from "react"
import Loading from "../sharedComponents/Loading"
import useAuthenticatedUser from "../hooks/useAuthenticatedUser"
import { useNavigate } from "react-router-dom"

const ViewRedirecter: React.FC = () => {
  const { status, data } = useAuthenticatedUser()
  const navigate = useNavigate()
  useEffect(() => {
    if (status === 'loading' || !data?.role) return
    if (data.role === 'coach') {
      navigate('/coach')
      return
    }
    if (data.role === 'admin') {
      navigate('/admin')
      return
    }
    navigate('/participant')
  }, [status, data])

  // show loader while resolving redirecter
  return <Loading />
}

export default ViewRedirecter
