import React, { useState, useContext } from 'react';
import { FaGoogle, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router';
import { AuthContext } from '../../../Context/AuthContext'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  const { loginUser, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

 
  const from = location.state?.pathname || '/';


  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setLoading(true);

    loginUser(email, password)
      .then((result) => {
        console.log('Logged in user:', result.user);
        toast.success("Successfully Logged In!", {
          position: "top-right",
          autoClose: 2000,
        });
        form.reset();
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Invalid email or password. Please try again.", {
          position: "top-right",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    setLoading(true);

    googleSignIn()
      .then(async (result) => {
        const loggedUser = result.user;
        console.log('Google user success:', loggedUser);

     

        toast.success("Google Login Successful!", {
          position: "top-right",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1000);
      })
      .catch((error) => {
        console.error('Google login error:', error.message);
        toast.error(error.message, {
          position: "top-right",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <ToastContainer />

      <div className="hero-content flex-col w-full max-w-md">
        <div className="text-center lg:text-left mb-2">
          <h1 className="text-3xl font-bold">Login to your Account!</h1>
        </div>
        
        <div className="card shrink-0 w-full shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <FaEnvelope />
                </span>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="email@example.com" 
                  className="input input-bordered w-full pl-10" 
                  required 
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <FaLock />
                </span>
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  placeholder="********" 
                  className="input input-bordered w-full pl-10 pr-10" 
                  required 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              
              <label className="label mt-1">
                <a href="#" className="label-text-alt link link-hover text-sm">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* Login Submit Button */}
            <div className="form-control mt-4">
              <button 
                type="submit" 
                className="btn w-full bg-[#e11d48] hover:bg-[#be123c] text-white border-none" 
                disabled={loading}
              >
                {loading ? <span className="loading loading-spinner loading-sm"></span> : 'Login'}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="divider px-8">OR</div>

          {/* Google Login Button */}
          <div className="px-8 pb-6">
            <button 
              onClick={handleGoogleLogin} 
              type="button"
              disabled={loading}
              className="btn btn-outline w-full flex items-center gap-2 hover:border-[#e11d48] hover:bg-[#e11d48]/10"
            >
              <FaGoogle className="text-red-500 text-lg" />
              <span>Continue with Google</span>
            </button>
            
            <p className="text-center text-sm mt-4">
              New to this website?{' '}
              <Link to="/register" className="text-[#e11d48] font-semibold hover:underline">
                Register here
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;