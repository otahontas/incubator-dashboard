import { useEffect } from "react"
import Loading from "../sharedComponents/Loading"
import useAuthenticatedUser from "../hooks/useAuthenticatedUser"
import { useNavigate } from "react-router-dom"

const ViewRedirecter: React.FC = () => {
  const { status, data } = useAuthenticatedUser()
  const navigate = useNavigate()
  useEffect(() => {
    if (status === 'loading') return
    if (data.role === 'participant') {
      navigate('/participant')
    }
    if (data.role === 'coach') {
      navigate('/coach')
    }
    if (data.role === 'admin') {
      navigate('/admin')
    }
  }, [status])

  // show loader while resolving redirecter
  return <Loading />
}

export default ViewRedirecter
