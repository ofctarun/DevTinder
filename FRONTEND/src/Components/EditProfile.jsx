
import { useSelector } from 'react-redux';
import EditForm from './EditForm';

const EditProfile = () => {
  const currentUser = useSelector((store) => store.user)
  return (
    <EditForm user={currentUser} />
  )
}

export default EditProfile