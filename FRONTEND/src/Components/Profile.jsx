import React from 'react'

const Profile = () => {
  const skills = ['React', 'Node.js', 'TypeScript', 'MongoDB', 'TailwindCSS', 'Python']
  const interests = ['Open Source', 'Web3', 'AI/ML', 'Game Dev']
  
  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Profile Card */}
        <div className="card bg-base-100 shadow-xl">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 text-6xl">💻</div>
              <div className="absolute bottom-10 right-20 text-4xl">⚡</div>
              <div className="absolute top-20 right-10 text-5xl">🚀</div>
            </div>
          </div>
          
          <div className="card-body">
            {/* Profile Picture & Basic Info */}
            <div className="flex flex-col sm:flex-row gap-6 -mt-20 mb-4">
              <div className="avatar">
                <div className="w-32 rounded-full ring ring-base-100 ring-offset-base-200 ring-offset-2 bg-base-100">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Profile" />
                </div>
              </div>
              
              <div className="flex-1 mt-16 sm:mt-12">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className='mt-1'>
                    <h2 className="card-title text-3xl font-bold">Sarah Anderson</h2>
                    <p className="text-base-content/70 flex items-center gap-2 mt-1">
                      💼 Full Stack Developer
                    </p>
                    <p className="text-base-content/70 flex items-center gap-2 mt-1">
                      📍 San Francisco, CA
                    </p>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <button className="btn btn-primary">
                      ⭐ Connect
                    </button>
                    <button className="btn btn-outline">
                      ✉️ Message
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="divider"></div>

            {/* About Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  💡 About Me
                </h3>
                <p className="text-base-content/80 leading-relaxed">
                  Passionate full-stack developer with 5+ years of experience building scalable web applications. 
                  Love working with modern JavaScript frameworks and exploring new technologies. Always excited to 
                  collaborate on innovative projects and contribute to open source.
                </p>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-xl font-semibold mb-3">🛠️ Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <div key={index} className="badge badge-lg badge-primary badge-outline">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div>
                <h3 className="text-xl font-semibold mb-3">🎯 Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest, index) => (
                    <div key={index} className="badge badge-lg badge-secondary">
                      {interest}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                <div className="stat bg-base-200 rounded-lg p-4">
                  <div className="stat-title text-xs">Projects</div>
                  <div className="stat-value text-2xl text-primary">42</div>
                </div>
                <div className="stat bg-base-200 rounded-lg p-4">
                  <div className="stat-title text-xs">Contributions</div>
                  <div className="stat-value text-2xl text-secondary">1.2k</div>
                </div>
                <div className="stat bg-base-200 rounded-lg p-4">
                  <div className="stat-title text-xs">Followers</div>
                  <div className="stat-value text-2xl text-accent">856</div>
                </div>
                <div className="stat bg-base-200 rounded-lg p-4">
                  <div className="stat-title text-xs">Rating</div>
                  <div className="stat-value text-2xl">4.9★</div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-xl font-semibold mb-3">🔗 Connect</h3>
                <div className="flex gap-3">
                  <a className="btn btn-circle btn-outline" href="#" aria-label="GitHub">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a className="btn btn-circle btn-outline" href="#" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a className="btn btn-circle btn-outline" href="#" aria-label="Email">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Projects Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">📂 Recent Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body">
                <h4 className="card-title">E-Commerce Platform</h4>
                <p className="text-base-content/70">Full-stack MERN application with payment integration</p>
                <div className="flex gap-2 mt-2">
                  <div className="badge badge-sm">React</div>
                  <div className="badge badge-sm">Node.js</div>
                  <div className="badge badge-sm">MongoDB</div>
                </div>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-sm btn-primary">View Project</button>
                </div>
              </div>
            </div>
            
            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body">
                <h4 className="card-title">AI Chat Assistant</h4>
                <p className="text-base-content/70">Real-time chat app with AI integration</p>
                <div className="flex gap-2 mt-2">
                  <div className="badge badge-sm">Python</div>
                  <div className="badge badge-sm">FastAPI</div>
                  <div className="badge badge-sm">OpenAI</div>
                </div>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-sm btn-primary">View Project</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile