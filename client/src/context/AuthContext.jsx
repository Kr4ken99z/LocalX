import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [professionalProfile, setProfessionalProfile] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('localx_token') || null);
  const [loading, setLoading] = useState(true);

  // Set default axios header
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }

  // Load user from token on mount
  useEffect(() => {
    const fetchMe = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get('/api/auth/me');
        if (res.data.success) {
          setUser(res.data.user);
          setProfessionalProfile(res.data.professionalProfile);
        }
      } catch (err) {
        console.error('Failed to fetch user with token:', err.response?.data?.message || err.message);
        localStorage.removeItem('localx_token');
        setToken(null);
        setUser(null);
        setProfessionalProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      if (res.data.success) {
        localStorage.setItem('localx_token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        setProfessionalProfile(res.data.professionalProfile);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        return { success: true, user: res.data.user };
      }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Login failed. Please check credentials.',
      };
    }
  };

  const register = async (formData) => {
    try {
      const res = await axios.post('/api/auth/register', formData);
      if (res.data.success) {
        localStorage.setItem('localx_token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        setProfessionalProfile(res.data.professionalProfile);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        return { success: true, user: res.data.user };
      }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Registration failed.',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('localx_token');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
    setProfessionalProfile(null);
  };

  // Instant 1-click Demo Switcher for fast testing across all 3 portals
  const quickDemoLogin = async (role = 'customer') => {
    const creds = {
      customer: { email: 'customer@localx.app', password: 'password123' },
      professional: { email: 'pro@localx.app', password: 'password123' },
      admin: { email: 'admin@localx.app', password: 'password123' },
    };
    const target = creds[role] || creds.customer;
    return await login(target.email, target.password);
  };

  const refreshProfile = async () => {
    try {
      const res = await axios.get('/api/auth/me');
      if (res.data.success) {
        setUser(res.data.user);
        setProfessionalProfile(res.data.professionalProfile);
      }
    } catch (e) {}
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        professionalProfile,
        token,
        loading,
        login,
        register,
        logout,
        quickDemoLogin,
        refreshProfile,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
