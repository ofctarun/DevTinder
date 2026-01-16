import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, email, photoURL, bio, age, gender, skills } = user;

  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();


  const handleRequest = async (requestType, userId) => {
    try {
      const res = await axios.post(BASE_URL + "/request/send/" + requestType + "/" + userId, {}, { withCredentials: true });
      console.log("data sent as : " + requestType + " " + userId);
      console.log("result from axios : ", res);
      dispatch(removeItemFromFeed(userId));
    }
    catch (err) {
      console.log(err);
    }
  }


  return (
    <div className="card bg-base-100/60 backdrop-blur-xl w-full max-w-[22rem] sm:max-w-sm shadow-2xl border border-white/20 hover:scale-[1.02] transition-all duration-500 overflow-visible group">
      {/* Profile Image */}
      <figure className="px-4 pt-4 relative">
        <div className="avatar w-full">
          <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden shadow-lg relative ring-0 group-hover:shadow-2xl transition-all duration-500">
            {/* Gradient Overlay for Text Readability if needed, though we user card-body below */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
            <img
              src={photoURL}
              alt={`${firstName} ${lastName}`}
              className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            {/* Floating Info on Image (Optional, for now keeping typical card layout but enhanced) */}
          </div>
        </div>
        {/* Status indicator or something could go here */}
      </figure>

      <div className="card-body items-center text-center p-6 relative z-20">

        {/* User Info */}
        <div className="space-y-1 w-full">
          <h2 className="card-title text-3xl font-black justify-center tracking-tight">
            {firstName} <span className="text-primary font-light">{age}</span>
          </h2>
          <p className="text-sm font-bold text-base-content/50 uppercase tracking-widest">{gender}</p>
        </div>

        {/* Bio */}
        {bio && (
          <p className="text-base-content/80 text-sm leading-relaxed mt-4 line-clamp-3 italic">
            "{bio}"
          </p>
        )}

        {/* Skills (Horizontal Scroll or Wrap) */}
        {skills && skills.length > 0 && (
          <div className="w-full mt-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {skills.slice(0, 5).map((skill, index) => (
                <div key={index} className="badge badge-lg badge-ghost bg-base-200/50 backdrop-blur-sm border-base-300 font-semibold text-xs sm:text-sm">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="divider my-4 opacity-50"></div>

        {/* Action Buttons */}
        <div className="flex w-full gap-4 justify-center">
          <button
            className="btn btn-circle btn-lg btn-outline border-2 border-red-400 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 shadow-md hover:shadow-red-500/40 transform hover:-translate-y-1"
            onClick={() => handleRequest("ignored", _id)}
            data-tip="Ignore"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            className="btn btn-circle btn-lg btn-secondary text-white shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:bg-secondary-focus transition-all duration-300 transform hover:-translate-y-1 hover:scale-110"
            onClick={() => handleRequest("interested", _id)} // Using secondary color for 'Like' often implies love/heart in this context, but user said 'premium'. Secondary is usually pink/purple which fits.
            data-tip="Connect"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

// Example usage with sample data
// const App = () => {
//   const sampleUser = {
//     firstName: "Sarah",
//     lastName: "Johnson",
//     email: "sarah.johnson@example.com",
//     photoURL: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
//     bio: "Full-stack developer passionate about building scalable web applications. Love working with React and Node.js!",
//     age: 28,
//     gender: "Female",
//     skills: ["React", "Node.js", "TypeScript", "MongoDB", "AWS"]
//   };

//   return (
//     <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
//       <UserCard user={sampleUser} />
//     </div>
//   );
// };

export default UserCard;