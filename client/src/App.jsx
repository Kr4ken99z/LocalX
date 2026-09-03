import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import ErrorBoundary from './components/ErrorBoundary';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import QuickRoleBar from './components/QuickRoleBar';

// Pages
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import ProfessionalProfilePage from './pages/ProfessionalProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CustomerDashboard from './pages/CustomerPortal/CustomerDashboard';
import CustomerProfile from './pages/CustomerPortal/CustomerProfile';
import ProDashboard from './pages/ProfessionalPortal/ProDashboard';
import ProServices from './pages/ProfessionalPortal/ProServices';
import ProVerification from './pages/ProfessionalPortal/ProVerification';
import AdminDashboard from './pages/AdminPortal/AdminDashboard';
import ChatPage from './pages/ChatPage';

// Protected Route Wrapper
function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080f1c]">
        <div className="animate-spin w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function MainLayout() {
  const [selectedCity, setSelectedCity] = useState('Kolkata');
  const location = useLocation();

  const isHome = location.pathname === '/' || location.pathname === '';
  const videoUrl = isHome
    ? 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663881845200/JaabPndEbiPjucfU.mp4'
    : 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663881845200/CqoPdbDWLUHNoBie.mp4';

  return (
    <div className="min-h-screen flex flex-col bg-[#080f1c] text-slate-100 antialiased selection:bg-teal-500 selection:text-white relative">
      {/* Background Video matching Demo Site */}
      <video
        key={videoUrl}
        className="page-bg-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      <div className="page-video-overlay" />

      {/* Page Content Container */}
      <div className="page-content-wrapper flex flex-col min-h-screen">
        {/* 3-Portal Sandbox Demo Bar */}
        <QuickRoleBar />

        {/* Main Navbar */}
        <Navbar selectedCity={selectedCity} onSelectCity={setSelectedCity} />

        {/* Routes View */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage selectedCity={selectedCity} onSelectCity={setSelectedCity} />} />
            <Route path="/explore" element={<ExplorePage selectedCity={selectedCity} onSelectCity={setSelectedCity} />} />
            <Route path="/professionals/:id" element={<ProfessionalProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Customer Portal */}
            <Route
              path="/customer"
              element={
                <ProtectedRoute allowedRoles={['customer', 'admin']}>
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/profile"
              element={
                <ProtectedRoute allowedRoles={['customer', 'admin']}>
                  <CustomerProfile />
                </ProtectedRoute>
              }
            />

            {/* Professional Portal */}
            <Route
              path="/professional"
              element={
                <ProtectedRoute allowedRoles={['professional', 'admin']}>
                  <ProDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/professional/services"
              element={
                <ProtectedRoute allowedRoles={['professional', 'admin']}>
                  <ProServices />
                </ProtectedRoute>
              }
            />
            <Route
              path="/professional/verification"
              element={
                <ProtectedRoute allowedRoles={['professional', 'admin']}>
                  <ProVerification />
                </ProtectedRoute>
              }
            />

            {/* Admin Governance Portal */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Real-time Socket.IO Chat */}
            <Route
              path="/messages"
              element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <SocketProvider>
          <Router>
            <MainLayout />
          </Router>
        </SocketProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
