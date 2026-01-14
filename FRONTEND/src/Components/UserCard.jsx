import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromFeed } from "../utils/feedSlice";

const UserCard = ({user}) => {
  const {_id, firstName, lastName, email, photoURL, bio, age, gender, skills} = user;

  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  
  const handleRequest = async (requestType , userId ) => {
    try{
      const res = await axios.post(BASE_URL+"/request/send/" + requestType+"/"+userId , {} , {withCredentials : true});
      console.log("data sent as : "+ requestType + " " + userId);
      console.log("result from axios : ",res);
      dispatch(removeItemFromFeed(userId));
    }
    catch(err){
      console.log(err);
    }
  }


  return (
    <div className="card bg-base-100 w-full max-w-sm shadow-xl border border-base-300 hover:shadow-2xl transition-shadow">
      {/* Profile Image */}
      <figure className="px-6 pt-6 h-100">
        <div className="avatar">
          <div className="w-full rounded-xl ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src={photoURL}
              alt={`${firstName} ${lastName}`} 
            />
          </div>
        </div>
      </figure>
      
      <div className="card-body items-center text-center p-6">
        {/* Name */}
        <h2 className="card-title text-2xl font-bold">
          {firstName} {lastName}
        </h2>
        
        {/* Age & Gender Badge */}
        <div className="flex gap-2 mb-2">
          <div className="badge badge-primary badge-lg">{age} years</div>
          <div className="badge badge-secondary badge-lg">{gender}</div>
        </div>
        
        {/* Bio */}
        {bio && (
          <p className="text-base-content/80 leading-relaxed mb-4">
            {bio}
          </p>
        )}
        
        {/* Email */}
        {email && (
          <div className="flex items-center gap-2 text-sm text-base-content/60 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {email}
          </div>
        )}
        
        {/* Skills (if available) */}
        {skills && skills.length > 0 && (
          <div className="w-full mb-4">
            <div className="text-sm font-semibold mb-2 text-base-content/80">Skills</div>
            <div className="flex flex-wrap gap-2 justify-center">
              {skills.slice(0, 4).map((skill, index) => (
                <div key={index} className="badge badge-outline">
                  {skill}
                </div>
              ))}
              {skills.length > 4 && (
                <div className="badge badge-outline">
                  +{skills.length - 4} more
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="divider my-2"></div>
        
        {/* Action Buttons */}
        <div className="card-actions w-full gap-2">
          <button className="btn btn-outline btn-error flex-1" onClick={() => handleRequest("ignored",_id)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Ignore
          </button>
          <button className="btn btn-primary flex-1" onClick={() => handleRequest("interested",_id)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            Interested
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