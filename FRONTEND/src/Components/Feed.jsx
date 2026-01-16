import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data || res?.data));
    }
    catch (err) {
      console.log("Error fetching feed: " + err);
    }
  }

  useEffect(() => {
    if (!feed && user) getFeed();
  }, [user]);

  // UI for Unauthenticated Users (Blurred Background)
  if (!user) {
    return (
      <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Blurred Tinder-style Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-rose-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Glassmorphism Card Overlay */}
        <div className="z-10 bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-3xl shadow-2xl text-center max-w-sm mx-4">
          <div className="text-6xl mb-6">🔥</div>
          <h2 className="text-3xl font-black mb-4 bg-gradient-to-r from-rose-500 to-orange-400 bg-clip-text text-transparent">
            DEVTINDER
          </h2>
          <p className="text-lg font-medium mb-8 opacity-80">
            Discover amazing developers nearby.
          </p>
          <Link to="/login" className="btn btn-primary btn-wide rounded-full font-bold shadow-lg hover:scale-105 transition-transform">
            Login to check feed
          </Link>
        </div>
      </div>
    );
  }

  // Loading State
  if (!feed) {
    return (
      <div className="flex justify-center my-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Empty Feed State
  if (feed.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center my-20 opacity-60">
        <div className="text-6xl mb-4">🕵️‍♂️</div>
        <p className="text-xl font-bold">No more profiles found!</p>
      </div>
    );
  }

  return (
    <div className='flex justify-center my-10'>
      <UserCard user={feed[0]}/>
    </div>
  )
}

export default Feed