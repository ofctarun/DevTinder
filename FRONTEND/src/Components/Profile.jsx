import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user)
  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  const { firstName, lastName, email, photoURL, bio, age, gender, skills } = user;
  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Profile Card */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-primary to-secondary relative overflow-hidden mb-4">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 text-6xl">💻</div>
              <div className="absolute bottom-10 right-20 text-4xl">⚡</div>
              <div className="absolute top-20 right-10 text-5xl">🚀</div>
            </div>
          </div>

          <div className="card-body">
            {/* Profile Picture & Basic Info */}
            <div className="flex flex-col sm:flex-row gap-6 -mt-20 mb-4">
              <div className="avatar">
                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 bg-base-100">
                  <img src={photoURL} alt={`${firstName} ${lastName}`} />
                </div>
              </div>

              <div className="flex-1 mt-16 sm:mt-12">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h2 className="card-title text-3xl font-bold mb-2">
                      {firstName} {lastName}
                    </h2>

                    {/* Age & Gender */}
                    <div className="flex gap-2 mb-3">
                      <div className="badge badge-primary badge-lg">{age} years</div>
                      <div className="badge badge-secondary badge-lg">{gender}</div>
                    </div>

                    {/* Email */}
                    {email && (
                      <p className="text-base-content/70 flex items-center gap-2 mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {email}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate("/edit-profile")}
                    >
                      Edit Profile
                    </button>

                  </div>
                </div>
              </div>
            </div>

            <div className="divider"></div>

            {/* About Section */}
            <div className="space-y-6">
              {bio && (
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <span className="text-2xl">💡</span>
                    About
                  </h3>
                  <p className="text-base-content/80 leading-relaxed">
                    {bio}
                  </p>
                </div>
              )}

              {/* Skills */}
              {skills && skills.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <span className="text-2xl">🛠️</span>
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <div key={index} className="badge badge-lg badge-outline badge-primary">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Section */}
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <span className="text-2xl">🔗</span>
                  Connect
                </h3>
                <div className="flex gap-3">
                  <a className="btn btn-circle btn-outline" href="#" aria-label="GitHub">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a className="btn btn-circle btn-outline" href="#" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a className="btn btn-circle btn-outline" href={`mailto:${email}`} aria-label="Email">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Quick Stats */}
          <div className="card bg-base-100 shadow-lg border border-base-300">
            <div className="card-body">
              <h3 className="card-title text-lg">Profile Stats</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="stat bg-base-200 rounded-lg p-3">
                  <div className="stat-title text-xs">Age</div>
                  <div className="stat-value text-xl text-primary">{age}</div>
                </div>
                <div className="stat bg-base-200 rounded-lg p-3">
                  <div className="stat-title text-xs">Skills</div>
                  <div className="stat-value text-xl text-secondary">
                    {skills ? skills.length : 0}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="card bg-base-100 shadow-lg border border-base-300">
            <div className="card-body">
              <h3 className="card-title text-lg">Contact Information</h3>
              <div className="space-y-3 mt-2">
                <div className="flex items-center gap-3">
                  <div className="badge badge-primary">Email</div>
                  <span className="text-sm text-base-content/70 truncate">{email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="badge badge-secondary">Gender</div>
                  <span className="text-sm text-base-content/70">{gender}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// // Example usage with sample data
// const App = () => {
//   const sampleUser = {
//     firstName: "Sarah",
//     lastName: "Anderson",
//     email: "sarah.anderson@example.com",
//     photoURL: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
//     bio: "Passionate full-stack developer with 5+ years of experience building scalable web applications. Love working with modern JavaScript frameworks and exploring new technologies. Always excited to collaborate on innovative projects and contribute to open source.",
//     age: 28,
//     gender: "Female",
//     skills: ["React", "Node.js", "TypeScript", "MongoDB", "TailwindCSS", "Python", "Docker", "AWS"]
//   };

//   return <Profile user={sampleUser} />;
// };

export default Profile;