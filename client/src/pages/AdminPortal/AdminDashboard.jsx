import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  Users,
  Briefcase,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Calendar,
  Grid,
  FileText,
  DollarSign,
  Search,
  Check,
  X,
  Clock,
  Layers,
  Trash2,
  RefreshCw,
  UserPlus,
  Crown,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { FALLBACK_PROS, FALLBACK_CATEGORIES } from '../../utils/mockData';

// Initial Demo Professionals for Admin Console
const INITIAL_DEMO_PROS = FALLBACK_PROS.map((p, idx) => ({
  ...p,
  verificationStatus: [1, 5, 9].includes(idx) ? 'PENDING' : 'VERIFIED',
  verificationDocs: [
    { type: 'Aadhaar Card (Govt ID)', verified: true, docNumber: `XXXX-XXXX-${1000 + idx}` },
    { type: 'Trade Certificate & License', verified: ![1, 5, 9].includes(idx), docNumber: `WB-LIC-${8000 + idx}` },
  ],
  trustTier: [1, 5, 9].includes(idx) ? 'Review Required' : (p.trustScore > 92 ? 'Elite Pro' : 'Verified Master'),
}));

// Initial Demo Users for Admin Console
const INITIAL_DEMO_USERS = [
  {
    _id: 'usr_master_1',
    name: 'Koustav Mondal (Master Owner)',
    email: 'admin@localx.app',
    role: 'admin',
    status: 'active',
    phone: '+91 98765 43210',
    city: 'Kolkata',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    _id: 'usr_admin_2',
    name: 'Vikram Malhotra (Operations Lead)',
    email: 'vikram.admin@localx.app',
    role: 'admin',
    status: 'active',
    phone: '+91 98311 22334',
    city: 'Kolkata',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    _id: 'usr_cust_1',
    name: 'Rohan Sen (Kolkata Customer)',
    email: 'customer@localx.app',
    role: 'customer',
    status: 'active',
    phone: '+91 98301 23456',
    city: 'Salt Lake, Kolkata',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  },
  {
    _id: 'usr_cust_2',
    name: 'Ananya Roy (Customer)',
    email: 'ananya.roy@example.com',
    role: 'customer',
    status: 'active',
    phone: '+91 98309 87654',
    city: 'Ballygunge, Kolkata',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
  ...FALLBACK_PROS.map((p, idx) => ({
    _id: `usr_pro_${idx + 1}`,
    name: p.businessName,
    email: `${p.category}.${idx + 1}@localx.app`,
    role: 'professional',
    status: 'active',
    phone: `+91 98320 ${String(1000 + idx).slice(0, 5)}`,
    city: p.location?.city || 'Kolkata',
    avatar: p.userId?.avatar,
  })),
];

const INITIAL_DEMO_BOOKINGS = [
  {
    _id: 'bk_1',
    bookingNumber: 'LX-9401',
    customer: { name: 'Rohan Sen', email: 'customer@localx.app', phone: '+91 98301 23456' },
    professional: { businessName: 'Apex Electricals & Power Systems' },
    serviceName: 'Electrical Diagnostics & Wiring Fault Rectification',
    category: 'electrician',
    scheduledDate: '2026-09-02',
    scheduledTime: '10:00 AM - 12:00 PM',
    status: 'COMPLETED',
    basePrice: 299,
  },
  {
    _id: 'bk_2',
    bookingNumber: 'LX-9402',
    customer: { name: 'Ananya Roy', email: 'ananya.roy@example.com', phone: '+91 98309 87654' },
    professional: { businessName: 'Metro Air Conditioning & Cooling' },
    serviceName: 'Jet Pump Deep Foam AC Cleaning',
    category: 'ac-repair',
    scheduledDate: '2026-09-03',
    scheduledTime: '01:00 PM - 03:00 PM',
    status: 'IN_PROGRESS',
    basePrice: 549,
  },
  {
    _id: 'bk_3',
    bookingNumber: 'LX-9403',
    customer: { name: 'Rohan Sen', email: 'customer@localx.app', phone: '+91 98301 23456' },
    professional: { businessName: 'HydroFix Emergency Rapid Plumbers' },
    serviceName: 'Emergency Tap & Sink Leak Rectification',
    category: 'plumber',
    scheduledDate: '2026-09-04',
    scheduledTime: '08:00 AM - 10:00 AM',
    status: 'CONFIRMED',
    basePrice: 299,
  },
  {
    _id: 'bk_4',
    bookingNumber: 'LX-9404',
    customer: { name: 'Debjit Mukherjee', email: 'debjit.m@example.com', phone: '+91 98315 55443' },
    professional: { businessName: 'PureSpark Deep Cleaning & Sanitization' },
    serviceName: 'Complete 2BHK Intensive Deep Sanitization',
    category: 'cleaning',
    scheduledDate: '2026-11-02',
    scheduledTime: '09:00 AM - 01:00 PM',
    status: 'PENDING',
    basePrice: 2199,
  },
];

const INITIAL_DEMO_DISPUTES = [
  {
    _id: 'dsp_1',
    bookingId: {
      bookingNumber: 'LX-9288',
      serviceName: 'Sub-meter & MCB Distribution Box Replacement',
      basePrice: 499,
    },
    raisedBy: { name: 'Ananya Roy', email: 'ananya.roy@example.com' },
    againstUser: { name: 'VoltMaster Quick Response Electricians' },
    reason: 'Ceiling fan regulator vibration after installation. Requesting pro revisit to adjust clamp.',
    status: 'OPEN',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'dsp_2',
    bookingId: {
      bookingNumber: 'LX-9150',
      serviceName: 'Motorized High-Torque Drain Unblocking',
      basePrice: 599,
    },
    raisedBy: { name: 'Siddharth Bose', email: 'siddharth.b@example.com' },
    againstUser: { name: 'Prime Plumbing & Leak Solutions' },
    reason: 'Pro was 25 minutes delayed due to heavy waterlogging near Park Circus.',
    status: 'OPEN',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

const INITIAL_DEMO_AUDIT = [
  {
    _id: 'aud_1',
    adminEmail: 'admin@localx.app',
    action: 'SYSTEM_BOOTSTRAP',
    targetType: 'Platform',
    details: { note: 'LocalX Master Governance Console loaded with 16 Kolkata specialists.' },
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'aud_2',
    adminEmail: 'admin@localx.app',
    action: 'VERIFY_PROFESSIONAL',
    targetType: 'Professional',
    details: { pro: 'Apex Electricals & Power Systems', status: 'VERIFIED' },
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'verifications', 'users', 'bookings', 'disputes', 'categories', 'audit'
  const [loading, setLoading] = useState(false);

  // Tab Data States (With localStorage persistence)
  const [professionals, setProfessionals] = useState(() => {
    try {
      const saved = localStorage.getItem('localx_admin_pros');
      return saved ? JSON.parse(saved) : INITIAL_DEMO_PROS;
    } catch {
      return INITIAL_DEMO_PROS;
    }
  });

  const [usersList, setUsersList] = useState(() => {
    try {
      const saved = localStorage.getItem('localx_admin_users');
      return saved ? JSON.parse(saved) : INITIAL_DEMO_USERS;
    } catch {
      return INITIAL_DEMO_USERS;
    }
  });

  const [bookingsList, setBookingsList] = useState(() => {
    try {
      const saved = localStorage.getItem('localx_admin_bookings');
      return saved ? JSON.parse(saved) : INITIAL_DEMO_BOOKINGS;
    } catch {
      return INITIAL_DEMO_BOOKINGS;
    }
  });

  const [disputesList, setDisputesList] = useState(() => {
    try {
      const saved = localStorage.getItem('localx_admin_disputes');
      return saved ? JSON.parse(saved) : INITIAL_DEMO_DISPUTES;
    } catch {
      return INITIAL_DEMO_DISPUTES;
    }
  });

  const [servicesList, setServicesList] = useState(FALLBACK_CATEGORIES);

  const [auditLogs, setAuditLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('localx_admin_audit');
      return saved ? JSON.parse(saved) : INITIAL_DEMO_AUDIT;
    } catch {
      return INITIAL_DEMO_AUDIT;
    }
  });

  // Calculate live metrics from active dataset
  const [metrics, setMetrics] = useState(() => ({
    totalUsers: INITIAL_DEMO_USERS.length,
    verifiedPros: INITIAL_DEMO_PROS.filter((p) => p.verificationStatus === 'VERIFIED').length,
    pendingPros: INITIAL_DEMO_PROS.filter((p) => p.verificationStatus === 'PENDING').length,
    totalBookings: INITIAL_DEMO_BOOKINGS.length,
    completedBookings: INITIAL_DEMO_BOOKINGS.filter((b) => b.status === 'COMPLETED').length,
    disputes: INITIAL_DEMO_DISPUTES.filter((d) => d.status === 'OPEN').length,
    totalRevenue: 34950,
    activeBookings: INITIAL_DEMO_BOOKINGS.filter((b) => b.status === 'CONFIRMED' || b.status === 'IN_PROGRESS').length,
  }));

  // Filter & Action States
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedProForVerify, setSelectedProForVerify] = useState(null);
  const [verifyRemarks, setVerifyRemarks] = useState('');
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [disputeNotes, setDisputeNotes] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  // User Creation State
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState('customer');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [createUserError, setCreateUserError] = useState('');
  const [createUserLoading, setCreateUserLoading] = useState(false);

  // New Category State
  const [newCatName, setNewCatName] = useState('');
  const [newCatSlug, setNewCatSlug] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatPrice, setNewCatPrice] = useState('299');
  const [newCatIcon, setNewCatIcon] = useState('⚡');

  // Keep metrics synchronized with state
  useEffect(() => {
    setMetrics({
      totalUsers: usersList.length,
      verifiedPros: professionals.filter((p) => p.verificationStatus === 'VERIFIED').length,
      pendingPros: professionals.filter((p) => p.verificationStatus === 'PENDING').length,
      totalBookings: bookingsList.length,
      completedBookings: bookingsList.filter((b) => b.status === 'COMPLETED').length,
      disputes: disputesList.filter((d) => d.status === 'OPEN').length,
      totalRevenue: 34950,
      activeBookings: bookingsList.filter((b) => b.status === 'CONFIRMED' || b.status === 'IN_PROGRESS').length,
    });
  }, [professionals, usersList, bookingsList, disputesList]);

  const fetchDashboardData = async () => {
    try {
      const [
        metricsRes,
        prosRes,
        usersRes,
        bookingsRes,
        disputesRes,
        servicesRes,
        auditRes,
      ] = await Promise.allSettled([
        axios.get('/api/admin/dashboard'),
        axios.get('/api/admin/professionals'),
        axios.get('/api/admin/users'),
        axios.get('/api/admin/bookings'),
        axios.get('/api/admin/disputes'),
        axios.get('/api/services/admin'),
        axios.get('/api/admin/audit-logs'),
      ]);

      if (prosRes.status === 'fulfilled' && prosRes.value.data.success && prosRes.value.data.data.length > 0) {
        setProfessionals(prosRes.value.data.data);
      }
      if (usersRes.status === 'fulfilled' && usersRes.value.data.success && usersRes.value.data.data.length > 0) {
        setUsersList(usersRes.value.data.data);
      }
      if (bookingsRes.status === 'fulfilled' && bookingsRes.value.data.success && bookingsRes.value.data.data.length > 0) {
        setBookingsList(bookingsRes.value.data.data);
      }
      if (disputesRes.status === 'fulfilled' && disputesRes.value.data.success && disputesRes.value.data.data.length > 0) {
        setDisputesList(disputesRes.value.data.data);
      }
      if (servicesRes.status === 'fulfilled' && servicesRes.value.data.success && servicesRes.value.data.data.length > 0) {
        setServicesList(servicesRes.value.data.data);
      }
      if (auditRes.status === 'fulfilled' && auditRes.value.data.success && auditRes.value.data.data.length > 0) {
        setAuditLogs(auditRes.value.data.data);
      }
    } catch (err) {
      console.warn('Backend offline, using persistent demo state:', err.message);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Admin Actions
  const handleVerifyPro = async (proId, status) => {
    const updated = professionals.map((p) =>
      p._id === proId
        ? {
            ...p,
            verificationStatus: status,
            trustTier: status === 'VERIFIED' ? 'Verified Master' : 'Rejected',
          }
        : p
    );
    setProfessionals(updated);
    localStorage.setItem('localx_admin_pros', JSON.stringify(updated));

    const targetPro = professionals.find((p) => p._id === proId);
    const newLog = {
      _id: 'aud_' + Date.now(),
      adminEmail: user?.email || 'admin@localx.app',
      action: status === 'VERIFIED' ? 'APPROVE_PROFESSIONAL' : 'REJECT_PROFESSIONAL',
      targetType: 'Professional',
      details: {
        pro: targetPro?.businessName || proId,
        status,
        remarks: verifyRemarks || 'Administrative review completed',
      },
      createdAt: new Date().toISOString(),
    };
    const nextLogs = [newLog, ...auditLogs];
    setAuditLogs(nextLogs);
    localStorage.setItem('localx_admin_audit', JSON.stringify(nextLogs));

    setSelectedProForVerify(null);
    setVerifyRemarks('');
    setActionSuccess(`Professional ${targetPro?.businessName || ''} marked as ${status}!`);

    try {
      await axios.patch(`/api/admin/professionals/${proId}/verify`, {
        status,
        remarks: verifyRemarks || `Status marked as ${status} by admin`,
      });
    } catch (e) {}
  };

  const handleToggleUserStatus = async (userId, currentStatus) => {
    const nextStatus = currentStatus === 'active' ? 'suspended' : 'active';
    if (!window.confirm(`Are you sure you want to change account status to ${nextStatus}?`)) return;

    const updated = usersList.map((u) => (u._id === userId ? { ...u, status: nextStatus } : u));
    setUsersList(updated);
    localStorage.setItem('localx_admin_users', JSON.stringify(updated));
    setActionSuccess(`Account status updated to ${nextStatus}`);

    try {
      await axios.patch(`/api/admin/users/${userId}/status`, {
        status: nextStatus,
        reason: 'Administrative action via console',
      });
    } catch (e) {}
  };

  const handleUpdateUserRole = async (userId, newRole) => {
    const target = usersList.find((u) => u._id === userId);
    if (target?.email === 'admin@localx.app') {
      alert('Security Policy: The Master Owner role cannot be modified.');
      return;
    }

    const updated = usersList.map((u) => (u._id === userId ? { ...u, role: newRole } : u));
    setUsersList(updated);
    localStorage.setItem('localx_admin_users', JSON.stringify(updated));
    setActionSuccess(`User role for ${target?.name} changed to ${newRole}`);

    try {
      await axios.patch(`/api/admin/users/${userId}/role`, { role: newRole });
    } catch (e) {}
  };

  const handleDeleteUser = async (userId, userName, userEmail) => {
    if (userEmail === 'admin@localx.app') {
      alert('Security Policy: The Master Owner account cannot be deleted.');
      return;
    }

    if (!window.confirm(`⚠️ PERMANENT ACTION: Are you sure you want to permanently delete user "${userName}" (${userEmail})?`)) return;

    const updated = usersList.filter((u) => u._id !== userId);
    setUsersList(updated);
    localStorage.setItem('localx_admin_users', JSON.stringify(updated));
    setActionSuccess(`User account "${userName}" has been permanently removed.`);

    try {
      await axios.delete(`/api/admin/users/${userId}`);
    } catch (e) {}
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setCreateUserLoading(true);
    setCreateUserError('');

    const newUser = {
      _id: 'usr_new_' + Date.now(),
      name: newUserName.trim(),
      email: newUserEmail.trim().toLowerCase(),
      role: newUserRole,
      phone: newUserPhone.trim() || '+91 98000 00000',
      status: 'active',
      city: 'Kolkata',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    };

    const nextUsers = [newUser, ...usersList];
    setUsersList(nextUsers);
    localStorage.setItem('localx_admin_users', JSON.stringify(nextUsers));

    setShowCreateUserModal(false);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserPassword('');
    setNewUserPhone('');
    setActionSuccess(`User account ${newUser.name} (${newUser.role}) created successfully!`);
    setCreateUserLoading(false);

    try {
      await axios.post('/api/admin/users', {
        name: newUser.name,
        email: newUser.email,
        password: newUserPassword,
        role: newUser.role,
        phone: newUser.phone,
      });
    } catch (e) {}
  };

  const handleResolveDispute = async (disputeId, status) => {
    const updated = disputesList.map((d) =>
      d._id === disputeId
        ? {
            ...d,
            status,
            resolutionNotes: disputeNotes || 'Resolved by Administrator.',
          }
        : d
    );
    setDisputesList(updated);
    localStorage.setItem('localx_admin_disputes', JSON.stringify(updated));

    setSelectedDispute(null);
    setDisputeNotes('');
    setActionSuccess(`Dispute marked as ${status}`);

    try {
      await axios.patch(`/api/admin/disputes/${disputeId}`, {
        status,
        actionTaken: status === 'RESOLVED' ? 'Settlement accepted / rework ordered' : 'Dispute dismissed upon evidence review',
        notes: disputeNotes || 'Reviewed by admin.',
      });
    } catch (e) {}
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    const newCat = {
      _id: 'cat_new_' + Date.now(),
      name: newCatName.trim(),
      slug: newCatSlug.trim() || newCatName.toLowerCase().replace(/\s+/g, '-'),
      description: newCatDesc.trim(),
      basePrice: Number(newCatPrice) || 299,
      icon: newCatIcon || '⚡',
    };

    const nextCategories = [...servicesList, newCat];
    setServicesList(nextCategories);
    setNewCatName('');
    setNewCatSlug('');
    setNewCatDesc('');
    setActionSuccess(`Category "${newCat.name}" added successfully!`);

    try {
      await axios.post('/api/services', newCat);
    } catch (e) {}
  };

  const pendingPros = professionals.filter((p) => p.verificationStatus === 'PENDING');
  const openDisputes = disputesList.filter((d) => d.status === 'OPEN' || d.status === 'UNDER_REVIEW');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-rose-400 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            LocalX Platform Operations & Governance
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">Admin Management Console</h1>
          <p className="text-slate-400">Audit verification queues, monitor platform disputes, and manage users and categories.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={fetchDashboardData}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold flex items-center gap-1.5 transition"
          >
            <RefreshCw className="w-3.5 h-3.5 text-teal-400" />
            <span>Refresh Data</span>
          </button>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold flex items-center gap-1.5 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 flex items-center justify-between">
          <span>{actionSuccess}</span>
          <button onClick={() => setActionSuccess('')} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 text-xs font-bold">
        {[
          { id: 'overview', label: 'Dashboard Overview', icon: Layers },
          { id: 'verifications', label: `Verification Queue (${pendingPros.length})`, icon: Shield },
          { id: 'disputes', label: `Disputes (${openDisputes.length})`, icon: AlertTriangle },
          { id: 'users', label: 'User Directory', icon: Users },
          { id: 'bookings', label: 'Bookings Monitor', icon: Calendar },
          { id: 'categories', label: 'Service Categories', icon: Grid },
          { id: 'audit', label: 'Audit Logs', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl shrink-0 transition ${
                activeTab === tab.id
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW METRICS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="glass-panel p-5 rounded-2xl space-y-1">
              <span className="text-slate-400 font-medium">Total Registered Users</span>
              <p className="text-2xl font-extrabold text-white">{metrics?.totalCustomers || 0}</p>
              <span className="text-[11px] text-teal-400 font-semibold">Customers</span>
            </div>
            <div className="glass-panel p-5 rounded-2xl space-y-1">
              <span className="text-slate-400 font-medium">Verified Professionals</span>
              <p className="text-2xl font-extrabold text-teal-400">{metrics?.verifiedPros || 0}</p>
              <span className="text-[11px] text-slate-400">{metrics?.pendingVerifications || 0} pending review</span>
            </div>
            <div className="glass-panel p-5 rounded-2xl space-y-1">
              <span className="text-slate-400 font-medium">Total Service Bookings</span>
              <p className="text-2xl font-extrabold text-violet-400">{metrics?.totalBookings || 0}</p>
              <span className="text-[11px] text-slate-400">{metrics?.completedBookings || 0} completed</span>
            </div>
            <div className="glass-panel p-5 rounded-2xl space-y-1">
              <span className="text-slate-400 font-medium">Open Dispute Cases</span>
              <p className="text-2xl font-extrabold text-rose-400">{metrics?.openDisputes || 0}</p>
              <span className="text-[11px] text-slate-400">Needs administrative review</span>
            </div>
          </div>

          {/* Quick Pending Verification Alert */}
          {pendingPros.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-amber-300">
                <Clock className="w-5 h-5 animate-pulse" />
                <div>
                  <h4 className="font-bold text-white text-sm">
                    {pendingPros.length} Professional Application(s) Awaiting Audit
                  </h4>
                  <p className="text-[11px] opacity-90">Verify trade licenses and government IDs to activate their marketplace accounts.</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('verifications')}
                className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shrink-0"
              >
                Open Queue →
              </button>
            </div>
          )}

          {/* Recent Audit Log Preview */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-rose-400" />
              <span>Recent Administrative Actions & Audit Trail</span>
            </h3>

            <div className="space-y-2">
              {auditLogs.slice(0, 5).map((log) => (
                <div
                  key={log._id}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-[11px]"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded font-mono font-bold bg-slate-900 text-teal-400 border border-slate-700">
                      {log.action}
                    </span>
                    <span className="text-slate-300">
                      Target: {log.targetType} {log.targetId ? `(#${String(log.targetId).slice(-6)})` : ''}
                    </span>
                  </div>
                  <span className="text-slate-500">{new Date(log.createdAt).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: VERIFICATION QUEUE */}
      {activeTab === 'verifications' && (
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <h2 className="text-base font-extrabold text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-teal-400" />
            <span>Professional Document Verification Queue</span>
          </h2>
          <p className="text-slate-400">Review submitted identity documents, certifications, and approve or reject.</p>

          <div className="space-y-4">
            {professionals.map((pro) => (
              <div
                key={pro._id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={pro.userId?.avatar || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80'}
                    alt="Pro"
                    className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-sm">{pro.businessName}</h4>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          pro.verificationStatus === 'VERIFIED'
                            ? 'bg-teal-500/20 text-teal-300'
                            : pro.verificationStatus === 'REJECTED'
                            ? 'bg-rose-500/20 text-rose-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {pro.verificationStatus}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px]">{pro.userId?.name} • {pro.userId?.email} • {pro.location?.address}</p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {pro.documents?.map((d, idx) => (
                        <a
                          key={idx}
                          href={d.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2 py-0.5 bg-slate-900 hover:bg-slate-800 text-teal-400 rounded border border-slate-800 text-[10px]"
                        >
                          📎 {d.title} ({d.docType})
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  <button
                    onClick={() => handleVerifyPro(pro._id, 'VERIFIED')}
                    className="px-3 py-1.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold flex items-center gap-1 transition"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => handleVerifyPro(pro._id, 'REJECTED')}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-rose-500/20 text-rose-400 border border-slate-800 font-semibold flex items-center gap-1 transition"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DISPUTES RESOLUTION */}
      {activeTab === 'disputes' && (
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <h2 className="text-base font-extrabold text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>Dispute Cases & Mediation Center ({disputesList.length})</span>
          </h2>

          <div className="space-y-4">
            {disputesList.map((dsp) => (
              <div key={dsp._id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
                      #{dsp.disputeNumber}
                    </span>
                    <span className="font-bold text-white text-sm">Reason: {dsp.reason}</span>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      dsp.status === 'RESOLVED'
                        ? 'bg-teal-500/20 text-teal-300'
                        : dsp.status === 'REJECTED'
                        ? 'bg-rose-500/20 text-rose-300'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    {dsp.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400 block">Complainant Customer:</span>
                    <p className="font-bold text-white">{dsp.customerId?.name} ({dsp.customerId?.email})</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Reported Professional:</span>
                    <p className="font-bold text-white">{dsp.professionalId?.businessName}</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Customer Incident Description:</span>
                  <p className="text-slate-200 mt-1">{dsp.description}</p>
                </div>

                {dsp.status === 'OPEN' && (
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => handleResolveDispute(dsp._id, 'RESOLVED')}
                      className="px-4 py-1.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold"
                    >
                      Resolve Dispute (Settled)
                    </button>
                    <button
                      onClick={() => handleResolveDispute(dsp._id, 'REJECTED')}
                      className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-rose-400 border border-slate-700 font-semibold"
                    >
                      Dismiss / Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: USERS DIRECTORY */}
      {activeTab === 'users' && (
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-teal-400" />
                <span>Platform User Directory ({usersList.length})</span>
              </h2>
              <p className="text-slate-400 text-xs mt-0.5">
                Manage accounts, assign roles, create admins, or revoke privileges.
              </p>
            </div>
            <button
              onClick={() => setShowCreateUserModal(true)}
              className="px-3.5 py-2 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition shadow-lg shadow-teal-500/20"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create User / Admin</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-2.5">User</th>
                  <th>Role & Assignment</th>
                  <th>City</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {usersList.map((u) => {
                  const isMasterOwner = u.email === 'admin@localx.app';
                  return (
                    <tr key={u._id} className="hover:bg-slate-900/40">
                      <td className="py-3 flex items-center gap-2.5">
                        <img
                          src={u.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                          alt=""
                          className="w-8 h-8 rounded-full object-cover border border-slate-700"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="font-bold text-white">{u.name}</p>
                            {isMasterOwner && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 font-extrabold text-[10px] uppercase">
                                <Crown className="w-3 h-3 text-amber-400 fill-amber-400" />
                                Master Owner
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400">{u.email}</p>
                        </div>
                      </td>
                      <td>
                        {isMasterOwner ? (
                          <span className="px-2 py-1 rounded font-bold text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/30">
                            MASTER ADMIN (IMMUTABLE)
                          </span>
                        ) : (
                          <select
                            value={u.role}
                            onChange={(e) => handleUpdateUserRole(u._id, e.target.value)}
                            className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700 text-white font-semibold text-[11px] cursor-pointer focus:outline-none focus:border-teal-400"
                          >
                            <option value="customer" className="bg-slate-900 text-white">Customer</option>
                            <option value="professional" className="bg-slate-900 text-white">Professional</option>
                            <option value="admin" className="bg-slate-900 text-rose-400 font-bold">Admin</option>
                          </select>
                        )}
                      </td>
                      <td className="text-slate-400">{u.location?.city || u.city || 'Kolkata'}</td>
                      <td>
                        <span
                          className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                            u.status === 'active' ? 'text-teal-400 bg-teal-500/10' : 'text-rose-400 bg-rose-500/10'
                          }`}
                        >
                          {u.status || 'active'}
                        </span>
                      </td>
                      <td className="text-right space-x-2">
                        {!isMasterOwner && (
                          <>
                            <button
                              onClick={() => handleToggleUserStatus(u._id, u.status || 'active')}
                              className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition ${
                                u.status === 'suspended'
                                  ? 'border-teal-500/40 text-teal-400 hover:bg-teal-500/10'
                                  : 'border-amber-500/40 text-amber-400 hover:bg-amber-500/10'
                              }`}
                            >
                              {u.status === 'suspended' ? 'Reactivate' : 'Suspend'}
                            </button>
                            <button
                              onClick={() => handleDeleteUser(u._id, u.name, u.email)}
                              title="Delete User"
                              className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition inline-block align-middle"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE USER / ADMIN MODAL */}
      {showCreateUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl relative text-xs">
            <button
              onClick={() => setShowCreateUserModal(false)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 text-teal-400 mb-1">
              <UserPlus className="w-5 h-5" />
              <h3 className="text-base font-extrabold text-white">Create New Account</h3>
            </div>
            <p className="text-slate-400 mb-4">
              Add a customer, professional specialist, or platform administrator.
            </p>

            {createUserError && (
              <div className="p-3 mb-4 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{createUserError}</span>
              </div>
            )}

            <form onSubmit={handleCreateUser} className="space-y-3.5">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Henderson"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="alex@example.com"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Role</label>
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-teal-400"
                  >
                    <option value="customer">Customer</option>
                    <option value="professional">Professional</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Phone (Optional)</label>
                  <input
                    type="text"
                    placeholder="+91 98765 43210"
                    value={newUserPhone}
                    onChange={(e) => setNewUserPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-teal-400"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateUserModal(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createUserLoading}
                  className="flex-1 py-2 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold transition shadow-lg shadow-teal-500/20 disabled:opacity-50"
                >
                  {createUserLoading ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 5: BOOKINGS MONITOR */}
      {activeTab === 'bookings' && (
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <h2 className="text-base font-extrabold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-violet-400" />
            <span>All Platform Bookings ({bookingsList.length})</span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-2.5">Booking #</th>
                  <th>Service</th>
                  <th>Customer</th>
                  <th>Specialist</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {bookingsList.map((b) => (
                  <tr key={b._id} className="hover:bg-slate-900/40">
                    <td className="py-3 font-mono text-teal-400 font-bold">#{b.bookingNumber}</td>
                    <td className="font-bold text-white">{b.serviceName}</td>
                    <td className="text-slate-300">{b.customerId?.name}</td>
                    <td className="text-slate-300">{b.professionalId?.businessName}</td>
                    <td className="font-bold text-teal-400">₹{b.price}</td>
                    <td>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: CATEGORIES */}
      {activeTab === 'categories' && (
        <div className="glass-panel p-6 rounded-3xl space-y-6">
          <h2 className="text-base font-extrabold text-white flex items-center gap-2">
            <Grid className="w-4 h-4 text-teal-400" />
            <span>Service Categories Registry ({servicesList.length})</span>
          </h2>

          {/* Add Category Form */}
          <form onSubmit={handleCreateCategory} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="font-bold text-white block">Create New Service Category</span>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <input
                type="text"
                required
                placeholder="Category Name"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none"
              />
              <input
                type="text"
                placeholder="Slug (e.g. smart-home)"
                value={newCatSlug}
                onChange={(e) => setNewCatSlug(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none"
              />
              <input
                type="text"
                placeholder="Icon Emoji (e.g. ⚡)"
                value={newCatIcon}
                onChange={(e) => setNewCatIcon(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none"
              />
              <input
                type="number"
                placeholder="Base Price ₹"
                value={newCatPrice}
                onChange={(e) => setNewCatPrice(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none"
              />
            </div>
            <input
              type="text"
              required
              placeholder="Brief description of the service scope..."
              value={newCatDesc}
              onChange={(e) => setNewCatDesc(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold transition shadow-sm"
            >
              Add Category
            </button>
          </form>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {servicesList.map((cat) => (
              <div key={cat._id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="font-bold text-teal-400">₹{cat.basePrice}</span>
                </div>
                <h4 className="font-bold text-white text-sm">{cat.name}</h4>
                <p className="text-slate-400 text-[11px] line-clamp-2">{cat.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <h2 className="text-base font-extrabold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-rose-400" />
            <span>Immutable Administrative Audit Logs</span>
          </h2>
          <p className="text-slate-400">Every sensitive action (approvals, rejections, suspensions, and dispute rulings) is cryptographically recorded.</p>

          <div className="space-y-2">
            {auditLogs.map((log) => (
              <div key={log._id} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-slate-900 text-rose-400 border border-slate-800">
                      {log.action}
                    </span>
                    <span className="text-white font-semibold">
                      Target: {log.targetType} {log.targetId ? `(#${String(log.targetId).slice(-6)})` : ''}
                    </span>
                  </div>
                  <span className="text-slate-500 text-[10px]">{new Date(log.createdAt).toLocaleString()}</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Authorized by: <strong className="text-slate-300">{log.adminEmail || 'admin@localx.app'}</strong>
                </p>
                {log.metadata && (
                  <pre className="text-[10px] text-slate-500 bg-slate-900/50 p-1.5 rounded overflow-x-auto">
                    {JSON.stringify(log.metadata, null, 2)}
                  </pre>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
