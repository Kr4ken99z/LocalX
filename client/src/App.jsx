import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import ErrorBoundary from './components/ErrorBoundary';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactSupportWidget from './components/ContactSupportWidget';

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

// Protected Route Wrapper - Allows seamless demo exploration without bouncing to home
function ProtectedRoute({ children }) {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080f1c]">
        <div className="animate-spin w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return children;
}

function MainLayout() {
  const [selectedCity, setSelectedCity] = useState('Kolkata');
  const location = useLocation();

  // 3 dedicated window background videos per user request:
  // 1. Exploration page -> sea-storm.mp4 (the boat in unknown waters ocean video)
  // 2. Login & Account section (/login, /register, /customer, /professional, /admin) -> purple-desert.mp4
  // 3. Home page -> moon-walk.mp4
  let videoUrl = 'https://storage.getlayers.ai/backgrounds/moon-walk.mp4';
  if (location.pathname.startsWith('/explore')) {
    videoUrl = 'https://storage.getlayers.ai/backgrounds/sea-storm.mp4';
  } else if (
    location.pathname.startsWith('/login') ||
    location.pathname.startsWith('/register') ||
    location.pathname.startsWith('/customer') ||
    location.pathname.startsWith('/professional') ||
    location.pathname.startsWith('/admin')
  ) {
    videoUrl = 'https://storage.getlayers.ai/backgrounds/purple-desert.mp4';
  }

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
                <ProtectedRoute>
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/dashboard"
              element={
                <ProtectedRoute>
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/profile"
              element={
                <ProtectedRoute>
                  <CustomerProfile />
                </ProtectedRoute>
              }
            />

            {/* Professional Portal */}
            <Route
              path="/professional"
              element={
                <ProtectedRoute>
                  <ProDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/professional/dashboard"
              element={
                <ProtectedRoute>
                  <ProDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/professional/services"
              element={
                <ProtectedRoute>
                  <ProServices />
                </ProtectedRoute>
              }
            />
            <Route
              path="/professional/verification"
              element={
                <ProtectedRoute>
                  <ProVerification />
                </ProtectedRoute>
              }
            />

            {/* Admin Governance Portal */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
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

        {/* Floating Contact Us & AI Support Widget (Hovering on left bottom slightly upper) */}
        <ContactSupportWidget />

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
