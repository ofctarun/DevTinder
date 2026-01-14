import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: 'ofctarun@gmail.com',
    password: 'Ofctarun@123',
    agreed: false
  })
  const [errorMessage, setErrorMessage] = useState("");


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors

    // Basic validation for signup
    if (!isLogin && !formData.agreed) {
      setErrorMessage("Please agree to the Terms of Service");
      return;
    }

    try {
      // 1. Determine the endpoint based on isLogin state
      const endpoint = isLogin ? "/login" : "/signup";

      // 2. Prepare the payload
      // Note: Backend signup expects 'firstName', but your state uses 'name'
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : {
          firstName: formData.name,
          email: formData.email,
          password: formData.password
        };

      const response = await axios.post(
        BASE_URL + endpoint,
        payload,
        { withCredentials: true }
      );

      // 3. Update Redux store with user data
      // Your backend returns { message: "...", data: savedUser } for signup
      const userData = isLogin ? response.data : response.data.data;
      dispatch(addUser(userData));

      // 4. Conditional Navigation
      if (isLogin) {
        navigate("/"); // Navigate to Feed on Login
      } else {
        navigate("/profile"); // Navigate to Profile on Signup
      }

    } catch (err) {
      // Extract exact error message from backend
      const errorMsg = err?.response?.data?.message || err?.response?.data || "Something Went Wrong!!";
      setErrorMessage(errorMsg.replace("Error is : ", ""));
      console.error("Auth error:", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center">

        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col justify-center space-y-6 lg:space-y-8 p-6 lg:p-8">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              DEVTINDER
            </h1>
            <div className="w-16 lg:w-20 h-1 bg-gradient-to-r from-emerald-600 to-teal-600"></div>
            <p className="text-xl lg:text-2xl font-semibold text-slate-700">
              Professional Developer Network
            </p>
            <p className="text-base lg:text-lg text-slate-600">
              Connect with talented developers, collaborate on projects, and grow your career.
            </p>
          </div>

          <div className="space-y-3 lg:space-y-4">
            <div className="flex items-start gap-3 lg:gap-4 p-3 lg:p-4 border-l-4 border-emerald-600 bg-white rounded-r-lg shadow-sm">
              <div className="text-2xl lg:text-3xl">💼</div>
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-slate-800 mb-1">Career Growth</h3>
                <p className="text-sm lg:text-base text-slate-600">Find opportunities and build meaningful connections</p>
              </div>
            </div>
            <div className="flex items-start gap-3 lg:gap-4 p-3 lg:p-4 border-l-4 border-emerald-600 bg-white rounded-r-lg shadow-sm">
              <div className="text-2xl lg:text-3xl">🤝</div>
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-slate-800 mb-1">Collaboration</h3>
                <p className="text-sm lg:text-base text-slate-600">Team up with developers who share your vision</p>
              </div>
            </div>
            <div className="flex items-start gap-3 lg:gap-4 p-3 lg:p-4 border-l-4 border-emerald-600 bg-white rounded-r-lg shadow-sm">
              <div className="text-2xl lg:text-3xl">📈</div>
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-slate-800 mb-1">Skill Development</h3>
                <p className="text-sm lg:text-base text-slate-600">Learn from experienced professionals in your field</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 lg:gap-4 pt-4">
            <div className="text-center p-3 lg:p-4 bg-white rounded-lg shadow-sm border border-slate-200">
              <div className="text-2xl lg:text-3xl font-bold text-emerald-600">50K+</div>
              <div className="text-xs lg:text-sm text-slate-600 mt-1">Developers</div>
            </div>
            <div className="text-center p-3 lg:p-4 bg-white rounded-lg shadow-sm border border-slate-200">
              <div className="text-2xl lg:text-3xl font-bold text-emerald-600">1M+</div>
              <div className="text-xs lg:text-sm text-slate-600 mt-1">Connections</div>
            </div>
            <div className="text-center p-3 lg:p-4 bg-white rounded-lg shadow-sm border border-slate-200">
              <div className="text-2xl lg:text-3xl font-bold text-emerald-600">150+</div>
              <div className="text-xs lg:text-sm text-slate-600 mt-1">Countries</div>
            </div>
          </div>
        </div>

        {/* Right Side - Login/Signup Form */}
        <div className="w-full max-w-md mx-auto px-4 sm:px-0">
          <div className="bg-white shadow-xl border border-slate-200 rounded-2xl overflow-hidden">
            <div className="p-6 sm:p-8">
              {/* Tabs */}
              <div className="flex gap-1 mb-6 bg-slate-100 p-1 rounded-lg">
                <button
                  className={`flex-1 py-2.5 px-4 rounded-md font-medium transition-all text-sm sm:text-base ${isLogin
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-800'
                    }`}
                  onClick={() => {
                    setIsLogin(true);
                    setFormData({
                      name: '',
                      email: 'ofctarun@gmail.com',
                      password: 'Ofctarun@123',
                      agreed: false
                    })
                  }
                  }
                >
                  Login
                </button>
                <button
                  className={`flex-1 py-2.5 px-4 rounded-md font-medium transition-all text-sm sm:text-base ${!isLogin
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-800'
                    }`}
                 
                   onClick={() => {
                    setIsLogin(false);
                    setFormData({
                      name: '',
                      email: '',
                      password: '',
                      agreed: false
                    })
                  }}
                >
                  Sign Up
                </button>
              </div>

              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-sm sm:text-base text-slate-600">
                  {isLogin ? 'Enter your credentials to continue' : 'Join thousands of developers worldwide'}
                </p>
              </div>

              <div className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block mb-2">
                      <span className="text-sm font-medium text-slate-700">Full Name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-slate-800"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                )}

                <div>
                  <label className="block mb-2">
                    <span className="text-sm font-medium text-slate-700">Email Address</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-slate-800"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block mb-2">
                    <span className="text-sm font-medium text-slate-700">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-slate-800"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  {isLogin && (
                    <>
                      <div className="mt-2 text-right">
                        <a className="text-sm text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer">
                          Forgot password?
                        </a>
                      </div>
                      <p className='text-red-500 text-center'>{errorMessage}</p>
                    </>
                  )}
                </div>

                {!isLogin && (
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="agreed"
                      className="mt-1 w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                      checked={formData.agreed}
                      onChange={handleInputChange}
                    />
                    <span className="text-sm text-slate-600">
                      I agree to the Terms of Service and Privacy Policy
                    </span>
                  </div>
                )}

                <button
                  className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-lg hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all shadow-sm"
                  onClick={handleSubmit}
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </button>
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-500">OR</span>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full py-2.5 px-4 border border-slate-300 rounded-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-3 text-slate-700 font-medium">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  <span className="text-sm sm:text-base">Continue with Google</span>
                </button>

                <button className="w-full py-2.5 px-4 border border-slate-300 rounded-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-3 text-slate-700 font-medium">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="text-sm sm:text-base">Continue with GitHub</span>
                </button>
              </div>

              <p className="text-center text-sm text-slate-600 mt-6">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <a
                  className="text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </a>
              </p>
            </div>
          </div>

          {/* Mobile Trust Indicators */}
          <div className="lg:hidden text-center mt-6 space-y-3">
            <p className="text-sm text-slate-600">Trusted by developers at</p>
            <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
              <span className="px-3 py-1.5 border border-slate-300 text-slate-700 text-xs sm:text-sm font-medium rounded-full">Google</span>
              <span className="px-3 py-1.5 border border-slate-300 text-slate-700 text-xs sm:text-sm font-medium rounded-full">Microsoft</span>
              <span className="px-3 py-1.5 border border-slate-300 text-slate-700 text-xs sm:text-sm font-medium rounded-full">Amazon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login