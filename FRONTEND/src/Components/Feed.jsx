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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-300 via-base-100 to-base-200 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>
      <div className="flex flex-col items-center justify-center text-center z-10 glass rounded-2xl p-10 border border-white/20 shadow-2xl">
        <div className="text-8xl mb-6 animate-bounce">🎉</div>
        <h2 className="text-3xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">All Caught Up!</h2>
        <p className="text-base-content/70 text-lg font-medium">You've explored all available profiles for now.</p>
        <div className="mt-8">
          <button className="btn btn-primary btn-wide rounded-full text-lg shadow-lg hover:shadow-primary/50 transition-all font-bold" onClick={getFeed}>Refresh Feed</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className='min-h-screen flex justify-center items-center py-10 bg-gradient-to-br from-base-300 via-base-100 to-base-200 relative overflow-hidden'>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-secondary/10 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[10%] left-[20%] w-[600px] h-[600px] bg-accent/10 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>
      </div>

      <div className="z-10 w-full flex justify-center px-4 animate-fade-in-up">
        <UserCard user={feed[0]} />
      </div>
    </div>
  );
}

export default Feed