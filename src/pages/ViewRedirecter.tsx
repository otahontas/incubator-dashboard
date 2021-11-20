import Loading from "../sharedComponents/Loading"
import useAuthenticatedUser from "../hooks/useAuthenticatedUser"
import { useNavigate } from "react-router-dom"

const ViewRedirecter: React.FC = () => {
  const { status, data } = useAuthenticatedUser()
  const navigate = useNavigate()
  if (status === 'loading') {
    return <Loading />
  }

  if (data.role === 'participant') {
    navigate('/participant')
  }
  if (data.role === 'coach') {
    navigate('/coach')
  }
  if (data.role === 'admin') {
    navigate('/admin')
  }

  return null
}

export default ViewRedirecter
