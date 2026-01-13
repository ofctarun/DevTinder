import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      })
      // console.log("Feed data : ", res.data);
      dispatch(addFeed(res?.data));
    }
    catch (err) {
      console.log("Error from getting feed : " + err);
    }
  }

  useEffect(() => {
    if(!feed) getFeed();
  }, []);

  return (
    feed && (<div className='flex justify-center my-10'>
      <UserCard user={feed[0]}/>
    </div>)
  )
}

export default Feed