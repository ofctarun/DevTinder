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
      });
      
      dispatch(addFeed(res?.data?.data || res?.data)); 
    } catch (err) {
      console.log("Error from getting feed : " + err);
    }
  }

  useEffect(() => {
    if (!feed) getFeed();
  }, []);

  if (!feed) return (
    <div className="flex justify-center my-20">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  if (feed.length === 0) return (
    <div className="flex flex-col items-center justify-center my-20 text-center">
      <div className="text-6xl mb-4">🙌</div>
      <h2 className="text-2xl font-bold">No more profiles to show!</h2>
      <p className="text-base-content/60">Check back later for new developers.</p>
    </div>
  );

  return (
    <div className='flex justify-center my-10'>
      <UserCard user={feed[0]}/>
    </div>
  );
}

export default Feed