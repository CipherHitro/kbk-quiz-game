import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
const AuthModal = ({ isOpen, onClose, mode, onSwitchMode, setAuthMode }) => {
  const base_API_URL = import.meta.env.VITE_MODE == 'development' ? import.meta.env.VITE_API_URL : '/'
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // New state for password visibility and validation
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value
    };
    setFormData(newFormData);

    // Real-time validation
    const newErrors = { ...errors };

    if (name === 'email' && value) {
      if (!/\S+@\S+\.\S+/.test(value)) {
        newErrors.email = 'Please enter a valid email address';
      } else {
        delete newErrors.email;
      }
    }

    if (name === 'fullName' && mode === 'signup') {
      if (value.trim().length > 0 && value.trim().length < 2) {
        newErrors.fullName = 'Full name must be at least 2 characters';
      } else {
        delete newErrors.fullName;
      }
    }

    if (name === 'password' && value) {
      const passwordErrors = validatePassword(value);
      if (passwordErrors.length > 0) {
        newErrors.password = `Password must contain ${passwordErrors.join(', ')}`;
      } else {
        delete newErrors.password;
      }

      // Check password match if confirm password exists
      if (mode === 'signup' && newFormData.confirmPassword) {
        if (value !== newFormData.confirmPassword) {
          newErrors.passwordMatch = 'Passwords do not match';
        } else {
          delete newErrors.passwordMatch;
        }
      }
    }

    if (name === 'confirmPassword' && mode === 'signup' && value) {
      if (newFormData.password !== value) {
        newErrors.passwordMatch = 'Passwords do not match';
      } else {
        delete newErrors.passwordMatch;
      }
    }

    setErrors(newErrors);
  };

  // Password validation function
  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push('at least 8 characters');
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('one lowercase letter');
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('one uppercase letter');
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push('one number');
    }
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      errors.push('one special character (@$!%*?&)');
    }
    return errors;
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordErrors = validatePassword(formData.password);
      if (passwordErrors.length > 0) {
        newErrors.password = `Password must contain ${passwordErrors.join(', ')}`;
      }
    }

    // Full name validation for signup
    if (mode === 'signup') {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      } else if (formData.fullName.trim().length < 2) {
        newErrors.fullName = 'Full name must be at least 2 characters';
      }

      // Confirm password validation
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.passwordMatch = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (formData) => {
    const response = await fetch(`${base_API_URL}api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(formData)
    })
    const data = await response.json();
    if (response.ok) {
      if (import.meta.env.VITE_MODE == 'development') {
        Cookies.set('uid', data.token, { expires: 7 })
        // console.log("Logged in")
        onClose();
        navigate('/')
      }
      else {
        onClose();
        navigate('/')
      }
    }
    else {
      alert(data.message || 'failed to login')
    }
  }
  const handleSignUp = async (formData) => {
    const response = await fetch(`${base_API_URL}api/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(formData)
    })

    const data = await response.json()
    if (response.ok) {
      setAuthMode('login')
    }
    else {
      alert(data.message || "Failed to Sign up!!")
    }
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    // Handle form submission here
    // console.log('Form submitted:', formData);
    // console.log('Auth mode:', mode);

    if (mode === 'login') {
      handleLogin(formData)

    } else {
      handleSignUp(formData)
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Reset form when switching modes
  const handleSwitchMode = (newMode) => {
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
    onSwitchMode(newMode);
  };

  // Don't render if modal is not open
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-40 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      ></div>

      {/* Auth Modal - Center Popup */}
      <div className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}>
        <div className={`w-full max-w-md mx-4 border border-white/40 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] rounded-2xl p-8 transform transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
          }`}>
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-yellow-400">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <button
              onClick={onClose}
              className="text-white cursor-pointer hover:text-red-500 transition"
              aria-label="Close Auth Modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Subtitle */}
          <p className="text-gray-300 mb-8 text-center">
            {mode === 'login'
              ? 'Login to your account'
              : 'Join us today'
            }
          </p>

          {/* Form */}
          <div className="space-y-6">
            {mode === 'signup' && (
              <div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${errors.fullName ? 'border-red-500' : 'border-gray-600'} text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
                  required
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>
                )}
              </div>
            )}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-600'} text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pr-14 rounded-lg bg-gray-800 border ${errors.password ? 'border-red-500' : 'border-gray-600'} text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <Eye width={20} />
                  ) : (
                    <EyeOff width={20} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {mode === 'signup' && (
              <div>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 pr-14 rounded-lg bg-gray-800 border ${errors.confirmPassword || errors.passwordMatch ? 'border-red-500' : 'border-gray-600'} text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? (
                      <Eye width={20} />
                    ) : (
                      <EyeOff width={20} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
                )}
                {errors.passwordMatch && (
                  <p className="mt-1 text-sm text-red-400">{errors.passwordMatch}</p>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              {mode === 'login' ? 'Login' : 'Create Account'}
            </button>
          </div>

          {/* Switch Mode */}
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              {mode === 'login'
                ? "Don't have an account? "
                : "Already have an account? "
              }
              <button
                onClick={() => handleSwitchMode(mode === 'login' ? 'signup' : 'login')}
                className="text-yellow-400 font-semibold hover:text-yellow-300 focus:outline-none transition-colors duration-200"
              >
                {mode === 'login' ? 'Sign up' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default AuthModal;