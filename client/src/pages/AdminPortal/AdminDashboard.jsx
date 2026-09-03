import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'verifications', 'users', 'bookings', 'disputes', 'categories', 'audit'
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tab Data States
  const [professionals, setProfessionals] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [bookingsList, setBookingsList] = useState([]);
  const [disputesList, setDisputesList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);

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
      ] = await Promise.all([
        axios.get('/api/admin/dashboard'),
        axios.get('/api/admin/professionals'),
        axios.get('/api/admin/users'),
        axios.get('/api/admin/bookings'),
        axios.get('/api/admin/disputes'),
        axios.get('/api/services/admin'),
        axios.get('/api/admin/audit-logs'),
      ]);

      if (metricsRes.data.success) setMetrics(metricsRes.data.data);
      if (prosRes.data.success) setProfessionals(prosRes.data.data);
      if (usersRes.data.success) setUsersList(usersRes.data.data);
      if (bookingsRes.data.success) setBookingsList(bookingsRes.data.data);
      if (disputesRes.data.success) setDisputesList(disputesRes.data.data);
      if (servicesRes.data.success) setServicesList(servicesRes.data.data);
      if (auditRes.data.success) setAuditLogs(auditRes.data.data);
    } catch (err) {
      console.error('Admin fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Admin Actions
  const handleVerifyPro = async (proId, status) => {
    try {
      await axios.patch(`/api/admin/professionals/${proId}/verify`, {
        status,
        remarks: verifyRemarks || `Status marked as ${status} by admin`,
      });
      setSelectedProForVerify(null);
      setVerifyRemarks('');
      setActionSuccess(`Professional ${status === 'VERIFIED' ? 'Approved' : status}!`);
      fetchDashboardData();
    } catch (err) {
      alert(err.response?.data?.message || 'Verification update failed');
    }
  };

  const handleToggleUserStatus = async (userId, currentStatus) => {
    const nextStatus = currentStatus === 'active' ? 'suspended' : 'active';
    if (!window.confirm(`Are you sure you want to change account status to ${nextStatus}?`)) return;
    try {
      await axios.patch(`/api/admin/users/${userId}/status`, {
        status: nextStatus,
        reason: 'Administrative action via console',
      });
      fetchDashboardData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update user status');
    }
  };

  const handleUpdateUserRole = async (userId, newRole) => {
    try {
      const res = await axios.patch(`/api/admin/users/${userId}/role`, { role: newRole });
      setActionSuccess(res.data.message || `User role updated to ${newRole}`);
      fetchDashboardData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update user role');
    }
  };

  const handleDeleteUser = async (userId, userName, userEmail) => {
    if (!window.confirm(`⚠️ PERMANENT ACTION: Are you sure you want to permanently delete user "${userName}" (${userEmail})?`)) return;
    try {
      const res = await axios.delete(`/api/admin/users/${userId}`);
      setActionSuccess(res.data.message || 'User deleted successfully');
      fetchDashboardData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete user');
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setCreateUserLoading(true);
    setCreateUserError('');
    try {
      const res = await axios.post('/api/admin/users', {
        name: newUserName,
        email: newUserEmail,
        password: newUserPassword,
        role: newUserRole,
        phone: newUserPhone,
      });
      setShowCreateUserModal(false);
      setNewUserName('');
      setNewUserEmail('');
      setNewUserPassword('');
      setNewUserPhone('');
      setActionSuccess(res.data.message || 'User created successfully');
      fetchDashboardData();
    } catch (err) {
      setCreateUserError(err.response?.data?.message || 'Failed to create user');
    } finally {
      setCreateUserLoading(false);
    }
  };

  const handleResolveDispute = async (disputeId, status) => {
    try {
      await axios.patch(`/api/admin/disputes/${disputeId}`, {
        status,
        actionTaken: status === 'RESOLVED' ? 'Settlement accepted / refund or rework ordered' : 'Dispute rejected upon evidence review',
        notes: disputeNotes || 'Reviewed by admin.',
      });
      setSelectedDispute(null);
      setDisputeNotes('');
      setActionSuccess(`Dispute marked as ${status}`);
      fetchDashboardData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update dispute');
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/services', {
        name: newCatName,
        slug: newCatSlug || newCatName.toLowerCase().replace(/\s+/g, '-'),
        description: newCatDesc,
        basePrice: Number(newCatPrice),
        icon: newCatIcon,
      });
      setNewCatName('');
      setNewCatSlug('');
      setNewCatDesc('');
      setActionSuccess('Service category created successfully!');
      fetchDashboardData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create category');
    }
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
        <button
          onClick={fetchDashboardData}
          className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold flex items-center gap-1.5 transition self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5 text-teal-400" />
          <span>Refresh Data</span>
        </button>
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
                      Target: {log.targetType} (#{log.targetId.slice(-6)})
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
                    <span className="text-white font-semibold">Target: {log.targetType} (#{log.targetId.slice(-6)})</span>
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
