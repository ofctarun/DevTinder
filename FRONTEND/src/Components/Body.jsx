import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import { addUser } from '../utils/userSlice'
import { useEffect } from 'react'
import axios from 'axios'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try{
      const res = await axios.get(BASE_URL + '/profile/view', {
        withCredentials : true,
      });
      dispatch(addUser(res.data));
      // console.log(res);
    }
    catch(err){
      if(err.status === 401)navigate("/login");
      console.log(err);
    }
  }

  useEffect(() => {
    if(!userData)fetchUser()
  },[userData]);

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Body
