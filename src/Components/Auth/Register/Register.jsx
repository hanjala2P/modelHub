import React, { useState, useContext } from 'react';
import { FaGoogle, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../../Context/AuthContext';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const { createUser, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    
    setErrorMessage('');

   
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log('Registered user:', user);
        form.reset();
        navigate('/'); 
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error.message);
      });
  };

  const handleGoogleLogin = () => {
    console.log("Google login button clicked!"); 
    
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log('Google user success:', user);
        navigate('/');
      })
      .catch((error) => {
        console.error('Google login error code:', error.code);
        console.error('Google login error message:', error.message);
        alert(error.message); 
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col w-full max-w-md">
        <div className="text-center lg:text-left mb-2">
          <h1 className="text-3xl font-bold">Create an Account!</h1>
        </div>
        
        <div className="card shrink-0 w-full shadow-2xl bg-base-100">
          <form onSubmit={handleRegister} className="card-body">
            
            {/* Error Message Display */}
            {errorMessage && (
              <div className="alert alert-error py-2 text-sm text-white">
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <FaUser />
                </span>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Your Name" 
                  className="input input-bordered w-full pl-10" 
                  required 
                />
              </div>
            </div>

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
            <div className="form-control relative">
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
                {/* Show/Hide Password Icon */}
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Register Submit Button */}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">Register</button>
            </div>
          </form>

          {/* Divider */}
          <div className="divider px-8">OR</div>

          {/* Google Login Button */}
          <div className="px-8 pb-6">
            <button 
              onClick={handleGoogleLogin} 
              type="button"
              className="btn btn-outline w-full flex items-center gap-2"
            >
              <FaGoogle className="text-red-500 text-lg" />
              <span>Continue with Google</span>
            </button>
            
            {/* Login Redirect Link */}
            <p className="text-center text-sm mt-4">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Login here
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;