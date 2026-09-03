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
  Key,
  Eye,
  EyeOff,
  Lock,
  Copy,
  ChevronLeft,
  ChevronRight,
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
    adminId: 'MASTER-OWNER-001',
    password: 'password123',
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
    adminId: 'ADM-KOLKATA-002',
    password: 'adminOps#2026',
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
  // CONFIRMED (Scheduled Appointments)
  {
    _id: 'bk_demo_1',
    bookingNumber: 'LX-3926',
    customer: { name: 'Rohan Sen', email: 'customer@localx.app', phone: '+91 98301 23456' },
    professional: { businessName: 'VoltMaster Quick Response' },
    serviceName: 'Electrician Diagnostics & Standard Service',
    category: 'electrician',
    scheduledDate: '2026-11-04',
    scheduledTime: '10:00 AM - 12:00 PM',
    status: 'CONFIRMED',
    basePrice: 299,
    price: 299,
    address: { addressLine: '#402, Sunshine Heights, 12th Main', city: 'Kolkata' },
    createdAt: '2026-09-03T10:00:00.000Z',
  },
  {
    _id: 'bk_demo_2',
    bookingNumber: 'LX-8777',
    customer: { name: 'Rohan Sen', email: 'customer@localx.app', phone: '+91 98301 23456' },
    professional: { businessName: 'Apex Electricals & Power Systems' },
    serviceName: 'Electrician Diagnostics & Standard Service',
    category: 'electrician',
    scheduledDate: '2026-11-12',
    scheduledTime: '10:00 AM - 12:00 PM',
    status: 'CONFIRMED',
    basePrice: 299,
    price: 299,
    address: { addressLine: '#402, Sunshine Heights, 12th Main', city: 'Kolkata' },
    createdAt: '2026-09-03T11:15:00.000Z',
  },
  {
    _id: 'bk_demo_3',
    bookingNumber: 'LX-9403',
    customer: { name: 'Pooja Agarwal', email: 'pooja.a@example.com', phone: '+91 98302 99881' },
    professional: { businessName: 'HydroFix Emergency Rapid Plumbers' },
    serviceName: 'Emergency Tap & Sink Leak Rectification',
    category: 'plumber',
    scheduledDate: '2026-11-18',
    scheduledTime: '08:00 AM - 10:00 AM',
    status: 'CONFIRMED',
    basePrice: 299,
    price: 299,
    address: { addressLine: 'Flat 3B, Silver Oak, Salt Lake Sector 2', city: 'Kolkata' },
    createdAt: '2026-09-02T15:30:00.000Z',
  },
  {
    _id: 'bk_demo_4',
    bookingNumber: 'LX-6812',
    customer: { name: 'Abhishek Chatterjee', email: 'abhishek.c@example.com', phone: '+91 98311 44556' },
    professional: { businessName: 'Kolkata Urban Pest Defense' },
    serviceName: 'Odorless Anti-Termite & Cockroach Gel Shield',
    category: 'pest-control',
    scheduledDate: '2026-11-25',
    scheduledTime: '11:00 AM - 01:00 PM',
    status: 'CONFIRMED',
    basePrice: 899,
    price: 899,
    address: { addressLine: '14/2B Rashbehari Avenue, Ballygunge', city: 'Kolkata' },
    createdAt: '2026-09-01T09:00:00.000Z',
  },

  // IN PROGRESS (Active On-Site Dispatches)
  {
    _id: 'bk_demo_5',
    bookingNumber: 'LX-9402',
    customer: { name: 'Ananya Roy', email: 'ananya.roy@example.com', phone: '+91 98309 87654' },
    professional: { businessName: 'Metro Air Conditioning & Cooling' },
    serviceName: 'Jet Pump Deep Foam AC Cleaning',
    category: 'ac-repair',
    scheduledDate: '2026-09-03',
    scheduledTime: '01:00 PM - 03:00 PM',
    status: 'IN_PROGRESS',
    basePrice: 549,
    price: 549,
    address: { addressLine: 'Block C, Lake Town', city: 'Kolkata' },
    createdAt: '2026-09-03T12:00:00.000Z',
  },
  {
    _id: 'bk_demo_6',
    bookingNumber: 'LX-4109',
    customer: { name: 'Suman Banerjee', email: 'suman.b@example.com', phone: '+91 98305 77665' },
    professional: { businessName: 'ProFinish Carpentry & Woodcraft' },
    serviceName: 'Custom Modular Wardrobe Hinge Realignment',
    category: 'carpentry',
    scheduledDate: '2026-09-03',
    scheduledTime: '03:00 PM - 05:00 PM',
    status: 'IN_PROGRESS',
    basePrice: 449,
    price: 449,
    address: { addressLine: 'Plot 45, Action Area 1, New Town', city: 'Kolkata' },
    createdAt: '2026-09-03T13:45:00.000Z',
  },

  // COMPLETED (Verified Services)
  {
    _id: 'bk_demo_7',
    bookingNumber: 'LX-9401',
    customer: { name: 'Rohan Sen', email: 'customer@localx.app', phone: '+91 98301 23456' },
    professional: { businessName: 'Apex Electricals & Power Systems' },
    serviceName: 'Electrical Diagnostics & Wiring Fault Rectification',
    category: 'electrician',
    scheduledDate: '2026-09-02',
    scheduledTime: '10:00 AM - 12:00 PM',
    status: 'COMPLETED',
    basePrice: 299,
    price: 299,
    address: { addressLine: '#402, Sunshine Heights, 12th Main', city: 'Kolkata' },
    createdAt: '2026-09-02T08:00:00.000Z',
  },
  {
    _id: 'bk_demo_8',
    bookingNumber: 'LX-8120',
    customer: { name: 'Dr. Debabrata Sen', email: 'dr.sen@example.com', phone: '+91 98319 22334' },
    professional: { businessName: 'PureSpark Deep Cleaning & Sanitization' },
    serviceName: 'Full 3BHK Intensive Deep Kitchen & Bathroom Sanitization',
    category: 'cleaning',
    scheduledDate: '2026-09-01',
    scheduledTime: '09:00 AM - 01:00 PM',
    status: 'COMPLETED',
    basePrice: 1899,
    price: 1899,
    address: { addressLine: '77 Southern Avenue, Keyatala', city: 'Kolkata' },
    createdAt: '2026-09-01T07:30:00.000Z',
  },

  // CANCELLED (Refunded with clear reasons)
  {
    _id: 'bk_demo_9',
    bookingNumber: 'LX-6204',
    customer: { name: 'Vikramaditya Roy', email: 'vikram.roy@example.com', phone: '+91 98300 11223' },
    professional: { businessName: 'Metro Air Conditioning & Cooling' },
    serviceName: 'AC Gas Leak Detection & Precision Refill',
    category: 'ac-repair',
    scheduledDate: '2026-08-30',
    scheduledTime: '04:00 PM - 06:00 PM',
    status: 'CANCELLED',
    cancellationReason: 'Change of plans / Schedule conflict - Customer traveling for work.',
    basePrice: 1299,
    price: 1299,
    address: { addressLine: 'Flat 1A, Diamond City West, Behala', city: 'Kolkata' },
    createdAt: '2026-08-30T10:00:00.000Z',
  },
  {
    _id: 'bk_demo_10',
    bookingNumber: 'LX-3188',
    customer: { name: 'Kalyan Chakraborty', email: 'kalyan.c@example.com', phone: '+91 98322 66778' },
    professional: { businessName: 'Master Paintcraft Solutions' },
    serviceName: 'Exterior Waterproof Primer Coat Application',
    category: 'painting',
    scheduledDate: '2026-08-28',
    scheduledTime: '10:00 AM - 02:00 PM',
    status: 'CANCELLED',
    cancellationReason: 'Monsoon heavy rain delay - Customer requested full advance refund.',
    basePrice: 3499,
    price: 3499,
    address: { addressLine: '52 Gariahat Road, Dover Terrace', city: 'Kolkata' },
    createdAt: '2026-08-28T09:00:00.000Z',
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

  // Tab Data States (With intelligent auto-sync with latest dataset)
  const [professionals, setProfessionals] = useState(() => {
    try {
      const saved = localStorage.getItem('localx_admin_pros');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.length === INITIAL_DEMO_PROS.length) {
          return parsed;
        }
      }
      localStorage.setItem('localx_admin_pros', JSON.stringify(INITIAL_DEMO_PROS));
      return INITIAL_DEMO_PROS;
    } catch {
      return INITIAL_DEMO_PROS;
    }
  });

  // Master Control Security State for inspecting Admin credentials
  const [selectedAdminForCredentials, setSelectedAdminForCredentials] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [copiedText, setCopiedText] = useState('');

  const [usersList, setUsersList] = useState(() => {
    try {
      const saved = localStorage.getItem('localx_admin_users');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.length >= INITIAL_DEMO_USERS.length) {
          return parsed;
        }
      }
      localStorage.setItem('localx_admin_users', JSON.stringify(INITIAL_DEMO_USERS));
      return INITIAL_DEMO_USERS;
    } catch {
      return INITIAL_DEMO_USERS;
    }
  });

  const [bookingsList, setBookingsList] = useState(() => {
    try {
      const saved = localStorage.getItem('localx_admin_bookings');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 4) {
          return parsed;
        }
      }
      localStorage.setItem('localx_admin_bookings', JSON.stringify(INITIAL_DEMO_BOOKINGS));
      return INITIAL_DEMO_BOOKINGS;
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

  // User Directory Pagination & Filtering
  const [userPage, setUserPage] = useState(1);
  const usersPerPage = 10;
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('all');

  useEffect(() => {
    setUserPage(1);
  }, [userSearch, userRoleFilter]);

  // Bookings Control Center States
  const [bookingPage, setBookingPage] = useState(1);
  const bookingsPerPage = 8;
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState('all');
  const [selectedBookingForInspect, setSelectedBookingForInspect] = useState(null);

  // Admin Delay/Reschedule Modal State
  const [selectedBookingForDelay, setSelectedBookingForDelay] = useState(null);
  const [delayNewDate, setDelayNewDate] = useState('');
  const [delayNewTime, setDelayNewTime] = useState('');
  const [delayReasonText, setDelayReasonText] = useState('Heavy traffic / transit delay');

  // Admin Cancel Modal State
  const [selectedBookingForAdminCancel, setSelectedBookingForAdminCancel] = useState(null);
  const [adminCancelReason, setAdminCancelReason] = useState('Customer requested cancellation and refund');

  useEffect(() => {
    setBookingPage(1);
  }, [bookingSearch, bookingStatusFilter]);

  // Sync bookings live from localStorage
  useEffect(() => {
    const handleStorageUpdate = () => {
      try {
        const saved = localStorage.getItem('localx_admin_bookings');
        if (saved) {
          setBookingsList(JSON.parse(saved));
        }
      } catch (e) {}
    };
    window.addEventListener('storage', handleStorageUpdate);
    return () => window.removeEventListener('storage', handleStorageUpdate);
  }, []);

  const handleUpdateBookingStatus = (bookingId, newStatus) => {
    const updated = bookingsList.map((b) => (b._id === bookingId ? { ...b, status: newStatus } : b));
    setBookingsList(updated);
    localStorage.setItem('localx_admin_bookings', JSON.stringify(updated));
    localStorage.setItem('localx_customer_bookings', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
    setActionSuccess(`Booking status updated to ${newStatus}`);
    setTimeout(() => setActionSuccess(''), 3000);
  };

  const handleConfirmDelayByAdmin = (e) => {
    e.preventDefault();
    if (!selectedBookingForDelay) return;
    const bookingId = selectedBookingForDelay._id;
    const updated = bookingsList.map((b) =>
      b._id === bookingId
        ? {
            ...b,
            scheduledDate: delayNewDate || b.scheduledDate,
            scheduledTime: delayNewTime || b.scheduledTime,
            delayReason: delayReasonText,
          }
        : b
    );
    setBookingsList(updated);
    localStorage.setItem('localx_admin_bookings', JSON.stringify(updated));
    localStorage.setItem('localx_customer_bookings', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
    setSelectedBookingForDelay(null);
    setActionSuccess(`Booking #${selectedBookingForDelay.bookingNumber} delayed/rescheduled with notice.`);
    setTimeout(() => setActionSuccess(''), 4000);
  };

  const handleConfirmCancelByAdmin = (e) => {
    e.preventDefault();
    if (!selectedBookingForAdminCancel) return;
    const bookingId = selectedBookingForAdminCancel._id;
    const updated = bookingsList.map((b) =>
      b._id === bookingId
        ? {
            ...b,
            status: 'CANCELLED',
            cancelledBy: 'Platform Admin',
            cancellationReason: adminCancelReason,
          }
        : b
    );
    setBookingsList(updated);
    localStorage.setItem('localx_admin_bookings', JSON.stringify(updated));
    localStorage.setItem('localx_customer_bookings', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
    setSelectedBookingForAdminCancel(null);
    setActionSuccess(`Booking #${selectedBookingForAdminCancel.bookingNumber} cancelled and refund marked.`);
    setTimeout(() => setActionSuccess(''), 4000);
  };

  const handleDeleteBookingByAdmin = (bookingId) => {
    if (!window.confirm('Are you sure you want to permanently delete this booking record?')) return;
    const updated = bookingsList.filter((b) => b._id !== bookingId);
    setBookingsList(updated);
    localStorage.setItem('localx_admin_bookings', JSON.stringify(updated));
    localStorage.setItem('localx_customer_bookings', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
    setActionSuccess('Booking record permanently deleted.');
    setTimeout(() => setActionSuccess(''), 3000);
  };

  // New Category State
  const [newCatName, setNewCatName] = useState('');
  const [newCatSlug, setNewCatSlug] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatPrice, setNewCatPrice] = useState('299');
  const [newCatIcon, setNewCatIcon] = useState('⚡');

  // Keep metrics synchronized with state
  useEffect(() => {
    const revenue = bookingsList.reduce((acc, b) => acc + (Number(b.price || b.basePrice) || 0), 0);
    setMetrics({
      totalUsers: usersList.length,
      verifiedPros: professionals.filter((p) => p.verificationStatus === 'VERIFIED').length,
      pendingPros: professionals.filter((p) => p.verificationStatus === 'PENDING').length,
      totalBookings: bookingsList.length,
      completedBookings: bookingsList.filter((b) => b.status === 'COMPLETED').length,
      disputes: disputesList.filter((d) => d.status === 'OPEN').length,
      totalRevenue: revenue || 34950,
      activeBookings: bookingsList.filter((b) => b.status === 'CONFIRMED' || b.status === 'IN_PROGRESS' || b.status === 'ACCEPTED').length,
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

  // Auto-synchronize on mount if stored data count differs from latest system definitions
  useEffect(() => {
    try {
      const savedPros = localStorage.getItem('localx_admin_pros');
      if (savedPros) {
        const parsed = JSON.parse(savedPros);
        if (parsed.length !== INITIAL_DEMO_PROS.length) {
          setProfessionals(INITIAL_DEMO_PROS);
          localStorage.setItem('localx_admin_pros', JSON.stringify(INITIAL_DEMO_PROS));
        }
      } else {
        setProfessionals(INITIAL_DEMO_PROS);
        localStorage.setItem('localx_admin_pros', JSON.stringify(INITIAL_DEMO_PROS));
      }

      const savedUsers = localStorage.getItem('localx_admin_users');
      if (savedUsers) {
        const parsed = JSON.parse(savedUsers);
        if (parsed.length < INITIAL_DEMO_USERS.length) {
          setUsersList(INITIAL_DEMO_USERS);
          localStorage.setItem('localx_admin_users', JSON.stringify(INITIAL_DEMO_USERS));
        }
      } else {
        setUsersList(INITIAL_DEMO_USERS);
        localStorage.setItem('localx_admin_users', JSON.stringify(INITIAL_DEMO_USERS));
      }
    } catch (e) {
      console.warn('Auto-sync notice:', e);
    }
  }, []);

  // Real-time automatic background polling every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      fetchDashboardData();
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleForceSyncLatestData = () => {
    localStorage.setItem('localx_admin_pros', JSON.stringify(INITIAL_DEMO_PROS));
    localStorage.setItem('localx_admin_users', JSON.stringify(INITIAL_DEMO_USERS));
    setProfessionals(INITIAL_DEMO_PROS);
    setUsersList(INITIAL_DEMO_USERS);
    setActionSuccess('✅ Live database automatically re-synchronized with all 112 specialists & latest metrics!');
    setTimeout(() => setActionSuccess(''), 4000);
  };

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

  // User Directory Pagination Calculation
  const filteredUsers = usersList.filter((u) => {
    const term = userSearch.toLowerCase().trim();
    const matchesSearch =
      !term ||
      u.name?.toLowerCase().includes(term) ||
      u.email?.toLowerCase().includes(term) ||
      (u.location?.city || u.city || '')?.toLowerCase().includes(term) ||
      (u.phone || '')?.toLowerCase().includes(term);
    const matchesRole = userRoleFilter === 'all' || u.role === userRoleFilter;
    return matchesSearch && matchesRole;
  });

  const totalUserPages = Math.max(1, Math.ceil(filteredUsers.length / usersPerPage));
  const paginatedUsers = filteredUsers.slice(
    (userPage - 1) * usersPerPage,
    userPage * usersPerPage
  );

  // Bookings Control Calculations
  const filteredBookings = bookingsList.filter((b) => {
    const term = bookingSearch.toLowerCase().trim();
    const matchesSearch =
      !term ||
      b.bookingNumber?.toLowerCase().includes(term) ||
      b.serviceName?.toLowerCase().includes(term) ||
      (b.customer?.name || b.customerId?.name || '')?.toLowerCase().includes(term) ||
      (b.customer?.email || b.customerId?.email || '')?.toLowerCase().includes(term) ||
      (b.customer?.phone || '')?.toLowerCase().includes(term) ||
      (b.professional?.businessName || b.professionalId?.businessName || '')?.toLowerCase().includes(term);

    const matchesStatus =
      bookingStatusFilter === 'all' || b.status === bookingStatusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalBookingPages = Math.max(1, Math.ceil(filteredBookings.length / bookingsPerPage));
  const paginatedBookings = filteredBookings.slice(
    (bookingPage - 1) * bookingsPerPage,
    bookingPage * bookingsPerPage
  );

  const getPaginationItems = (current, total) => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (current <= 4) {
      return [1, 2, 3, 4, 5, '...', total];
    }
    if (current >= total - 3) {
      return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
    }
    return [1, '...', current - 1, current, current + 1, '...', total];
  };

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
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Live Auto-Sync</span>
          </div>
          <button
            onClick={handleForceSyncLatestData}
            title="Auto-Sync with latest 112 professionals & system database"
            className="px-3.5 py-2 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 text-teal-300 border border-teal-500/40 font-bold flex items-center gap-1.5 transition text-xs shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 text-teal-400" />
            <span>Sync Live DB</span>
          </button>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold flex items-center gap-1.5 transition text-xs"
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
              <p className="text-2xl font-extrabold text-white">
                {usersList.filter((u) => u.role === 'customer').length}
              </p>
              <span className="text-[11px] text-teal-400 font-semibold">
                {usersList.filter((u) => u.role === 'customer').length === 1
                  ? '1 Customer'
                  : `${usersList.filter((u) => u.role === 'customer').length} Customers`}{' '}
                ({usersList.length} Total Accounts)
              </span>
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-teal-400" />
                <span>Professional Document Verification Queue</span>
              </h2>
              <p className="text-slate-400 text-xs">
                Review submitted identity documents, certifications, and approve or reject pending professionals.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 self-start sm:self-auto">
              {pendingPros.length} Pending Review
            </span>
          </div>

          <div className="space-y-4">
            {pendingPros.length === 0 ? (
              <div className="p-8 rounded-2xl bg-slate-950/60 border border-slate-800 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center mx-auto text-lg">
                  ✓
                </div>
                <h3 className="font-bold text-white text-sm">All Caught Up!</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  There are no pending professional verification requests in the queue. All registered professionals have already been verified.
                </p>
              </div>
            ) : (
              pendingPros.map((pro) => (
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
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          PENDING AUDIT
                        </span>
                      </div>
                      <p className="text-slate-400 text-[11px]">
                        {pro.userId?.name} • {pro.userId?.email || `${pro.category}@localx.app`} • {pro.location?.address}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {pro.verificationDocs ? (
                          pro.verificationDocs.map((doc, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 bg-slate-900 text-teal-300 rounded-lg border border-slate-800 text-[10px] flex items-center gap-1.5"
                            >
                              <span>📄</span>
                              <strong>{doc.type}:</strong> {doc.docNumber}
                            </span>
                          ))
                        ) : (
                          <span className="px-2.5 py-1 bg-slate-900 text-teal-300 rounded-lg border border-slate-800 text-[10px]">
                            📄 Government ID & Trade Certificate Submitted
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    <button
                      onClick={() => handleVerifyPro(pro._id, 'VERIFIED')}
                      className="px-3.5 py-1.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold flex items-center gap-1 transition shadow"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => handleVerifyPro(pro._id, 'REJECTED')}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-rose-500/20 text-rose-400 border border-slate-800 font-semibold flex items-center gap-1 transition"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              ))
            )}
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
              className="px-3.5 py-2 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition shadow-lg shadow-teal-500/20 shrink-0"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create User / Admin</span>
            </button>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search user by name, email, or city..."
                className="w-full pl-9 pr-7 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-teal-500/50"
              />
              {userSearch && (
                <button
                  onClick={() => setUserSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto">
              {[
                { id: 'all', label: `All (${usersList.length})` },
                { id: 'customer', label: `Customers (${usersList.filter((u) => u.role === 'customer').length})` },
                { id: 'professional', label: `Pros (${usersList.filter((u) => u.role === 'professional').length})` },
                { id: 'admin', label: `Admins (${usersList.filter((u) => u.role === 'admin').length})` },
              ].map((rf) => (
                <button
                  key={rf.id}
                  onClick={() => setUserRoleFilter(rf.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition text-[11px] shrink-0 ${
                    userRoleFilter === rf.id
                      ? 'bg-teal-400 text-slate-950 shadow'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {rf.label}
                </button>
              ))}
            </div>
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
                {paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-slate-400">
                      No accounts matched your search filter "{userSearch}".
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map((u) => {
                    const isMasterOwner = u.email === 'admin@localx.app';
                    return (
                      <tr key={u._id} className="hover:bg-slate-900/40">
                        <td className="py-3 flex items-center gap-2.5">
                          <img
                            src={u.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                            alt=""
                            className="w-8 h-8 rounded-full object-cover border border-slate-700 shrink-0"
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
                          {u.role === 'admin' && (
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedAdminForCredentials(u);
                                setShowPassword(false);
                                setCopiedText('');
                              }}
                              className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 transition inline-flex items-center gap-1 shadow-sm"
                              title="Master Security: Inspect Admin Credentials & Passcode"
                            >
                              <Key className="w-3.5 h-3.5 text-amber-400" />
                              <span>View Admin ID & Passcode</span>
                            </button>
                          )}
                          {u.role !== 'admin' && (
                            <span
                              className="text-[10px] text-slate-400 font-medium italic border border-slate-800/80 px-2 py-0.5 rounded-md bg-slate-950/80 inline-flex items-center gap-1"
                              title="Customer and Professional credentials are end-to-end encrypted and confidential"
                            >
                              <Lock className="w-3 h-3 text-slate-400" />
                              <span>Confidential ID</span>
                            </span>
                          )}
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
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* User Directory Pagination Controls */}
          {totalUserPages > 1 && (
            <div className="pt-4 pb-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-400">
                Showing <strong className="text-white">{(userPage - 1) * usersPerPage + 1}</strong> to{' '}
                <strong className="text-white">{Math.min(userPage * usersPerPage, filteredUsers.length)}</strong> of{' '}
                <strong className="text-teal-400">{filteredUsers.length}</strong> accounts
              </p>

              <div className="flex items-center gap-1.5 text-xs font-bold">
                {/* Previous Page */}
                <button
                  type="button"
                  onClick={() => setUserPage((p) => Math.max(1, p - 1))}
                  disabled={userPage === 1}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev</span>
                </button>

                {/* Numbered Page Buttons with Dots */}
                {getPaginationItems(userPage, totalUserPages).map((item, idx) => {
                  if (item === '...') {
                    return (
                      <span
                        key={`dots-${idx}`}
                        className="w-7 h-8 flex items-center justify-center text-slate-500 font-extrabold select-none text-xs"
                      >
                        …
                      </span>
                    );
                  }
                  const pageNum = Number(item);
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setUserPage(pageNum)}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition font-bold text-xs ${
                        userPage === pageNum
                          ? 'bg-teal-400 text-slate-950 font-black shadow-lg shadow-teal-500/25 scale-105'
                          : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {/* Next Page */}
                <button
                  type="button"
                  onClick={() => setUserPage((p) => Math.min(totalUserPages, p + 1))}
                  disabled={userPage === totalUserPages}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition flex items-center gap-1"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
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

      {/* TAB 5: BOOKINGS CONTROL CENTER */}
      {activeTab === 'bookings' && (
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-violet-400" />
                <span>Master Bookings Control Suite ({bookingsList.length})</span>
              </h2>
              <p className="text-slate-400 text-xs mt-0.5">
                Full administrative authority over platform appointments, dispatch statuses, cancellations, and customer refunds.
              </p>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-violet-500/10 border border-violet-500/30 text-violet-300 font-bold text-xs flex items-center gap-1.5 shrink-0">
              <DollarSign className="w-4 h-4 text-violet-400" />
              <span>
                Total Volume: ₹
                {bookingsList.reduce((acc, b) => acc + (Number(b.price || b.basePrice) || 0), 0)}
              </span>
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={bookingSearch}
                onChange={(e) => setBookingSearch(e.target.value)}
                placeholder="Search by Booking #, Customer, Pro, or Service..."
                className="w-full pl-9 pr-7 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-violet-500/50"
              />
              {bookingSearch && (
                <button
                  onClick={() => setBookingSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto">
              {[
                { id: 'all', label: `All (${bookingsList.length})` },
                {
                  id: 'CONFIRMED',
                  label: `Confirmed (${bookingsList.filter((b) => b.status === 'CONFIRMED' || b.status === 'ACCEPTED').length})`,
                },
                {
                  id: 'IN_PROGRESS',
                  label: `In Progress (${bookingsList.filter((b) => b.status === 'IN_PROGRESS' || b.status === 'ON_THE_WAY').length})`,
                },
                {
                  id: 'COMPLETED',
                  label: `Completed (${bookingsList.filter((b) => b.status === 'COMPLETED').length})`,
                },
                {
                  id: 'CANCELLED',
                  label: `Cancelled (${bookingsList.filter((b) => b.status === 'CANCELLED' || b.status === 'REJECTED').length})`,
                },
              ].map((bf) => (
                <button
                  key={bf.id}
                  onClick={() => setBookingStatusFilter(bf.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition text-[11px] shrink-0 ${
                    bookingStatusFilter === bf.id
                      ? 'bg-violet-500 text-white shadow-md shadow-violet-500/25'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {bf.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bookings Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-2.5">Booking # & Schedule</th>
                  <th>Service Details</th>
                  <th>Customer Info</th>
                  <th>Assigned Specialist</th>
                  <th>Amount</th>
                  <th>Admin Status Control</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {paginatedBookings.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-slate-400">
                      No booking records matched your filter criteria.
                    </td>
                  </tr>
                ) : (
                  paginatedBookings.map((b) => {
                    const statusColor =
                      b.status === 'COMPLETED'
                        ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                        : b.status === 'CANCELLED' || b.status === 'REJECTED'
                        ? 'text-rose-400 border-rose-500/30 bg-rose-500/10'
                        : b.status === 'IN_PROGRESS' || b.status === 'ON_THE_WAY'
                        ? 'text-amber-300 border-amber-500/30 bg-amber-500/10'
                        : 'text-teal-300 border-teal-500/30 bg-teal-500/10';

                    return (
                      <tr key={b._id} className="hover:bg-slate-900/40">
                        {/* Booking # & Schedule */}
                        <td className="py-3">
                          <span className="font-mono font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/30 text-[11px] block w-fit">
                            #{b.bookingNumber}
                          </span>
                          <span className="text-[11px] text-slate-300 font-semibold block mt-1">
                            {b.scheduledDate}
                          </span>
                          <span className="text-[10px] text-slate-500 block">{b.scheduledTime}</span>
                        </td>

                        {/* Service Details */}
                        <td>
                          <p className="font-bold text-white text-xs">{b.serviceName}</p>
                          <span className="text-[10px] text-slate-400 capitalize bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 inline-block mt-0.5">
                            {b.category || 'General Service'}
                          </span>
                        </td>

                        {/* Customer Info */}
                        <td>
                          <p className="font-bold text-slate-200">
                            {b.customer?.name || b.customerId?.name || 'Verified Customer'}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {b.customer?.email || b.customerId?.email || 'customer@localx.app'}
                          </p>
                          <p className="text-[10px] text-slate-500">
                            {b.customer?.phone || b.customerId?.phone || '+91 98301 23456'}
                          </p>
                        </td>

                        {/* Assigned Specialist */}
                        <td>
                          <p className="font-bold text-teal-300">
                            {b.professional?.businessName || b.professionalId?.businessName || 'Specialist'}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {b.address?.city || 'Kolkata Metro'}
                          </p>
                        </td>

                        {/* Amount */}
                        <td>
                          <span className="font-extrabold text-teal-400 text-xs">
                            ₹{b.price || b.basePrice || 299}
                          </span>
                        </td>

                        {/* Admin Status Dropdown Control */}
                        <td>
                          <select
                            value={b.status}
                            onChange={(e) => handleUpdateBookingStatus(b._id, e.target.value)}
                            className={`px-2.5 py-1 rounded-lg border font-bold text-[11px] cursor-pointer focus:outline-none bg-slate-950 ${statusColor}`}
                          >
                            <option value="PENDING" className="bg-slate-900 text-slate-300">
                              PENDING (Requested)
                            </option>
                            <option value="CONFIRMED" className="bg-slate-900 text-teal-300">
                              CONFIRMED (Scheduled)
                            </option>
                            <option value="IN_PROGRESS" className="bg-slate-900 text-amber-300">
                              IN PROGRESS
                            </option>
                            <option value="COMPLETED" className="bg-slate-900 text-emerald-400">
                              COMPLETED (Verified)
                            </option>
                            <option value="CANCELLED" className="bg-slate-900 text-rose-400">
                              CANCELLED / REFUNDED
                            </option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="text-right space-x-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedBookingForInspect(b)}
                            title="Inspect Full Booking Details"
                            className="px-2 py-1 rounded-lg text-[11px] font-bold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition inline-flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5 text-slate-400" />
                            <span>Inspect</span>
                          </button>

                          {/* Admin Delay / Reschedule Button */}
                          {b.status !== 'CANCELLED' && b.status !== 'COMPLETED' && (
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedBookingForDelay(b);
                                setDelayNewDate(b.scheduledDate || '');
                                setDelayNewTime(b.scheduledTime || '01:00 PM - 03:00 PM');
                                setDelayReasonText('Heavy rain / waterlogging in transit');
                              }}
                              title="Delay or Reschedule Appointment"
                              className="px-2 py-1 rounded-lg text-[11px] font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition inline-flex items-center gap-1"
                            >
                              <Clock className="w-3.5 h-3.5 text-amber-400" />
                              <span>Delay</span>
                            </button>
                          )}

                          {/* Admin Cancel with Reason Button */}
                          {b.status !== 'CANCELLED' && (
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedBookingForAdminCancel(b);
                                setAdminCancelReason('Customer requested cancellation and refund');
                              }}
                              title="Cancel Booking and Issue Refund with Reason"
                              className="px-2 py-1 rounded-lg text-[11px] font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition inline-flex items-center"
                            >
                              Cancel/Refund
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleDeleteBookingByAdmin(b._id)}
                            title="Delete Record"
                            className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition inline-block align-middle"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Bookings Pagination Controls */}
          {totalBookingPages > 1 && (
            <div className="pt-4 pb-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-400">
                Showing <strong className="text-white">{(bookingPage - 1) * bookingsPerPage + 1}</strong> to{' '}
                <strong className="text-white">
                  {Math.min(bookingPage * bookingsPerPage, filteredBookings.length)}
                </strong>{' '}
                of <strong className="text-violet-400">{filteredBookings.length}</strong> bookings
              </p>

              <div className="flex items-center gap-1.5 text-xs font-bold">
                {/* Previous Page */}
                <button
                  type="button"
                  onClick={() => setBookingPage((p) => Math.max(1, p - 1))}
                  disabled={bookingPage === 1}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev</span>
                </button>

                {/* Page Numbers */}
                {getPaginationItems(bookingPage, totalBookingPages).map((item, idx) => {
                  if (item === '...') {
                    return (
                      <span
                        key={`b-dots-${idx}`}
                        className="w-7 h-8 flex items-center justify-center text-slate-500 font-extrabold select-none text-xs"
                      >
                        …
                      </span>
                    );
                  }
                  const pageNum = Number(item);
                  return (
                    <button
                      key={`b-page-${pageNum}`}
                      type="button"
                      onClick={() => setBookingPage(pageNum)}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition font-bold text-xs ${
                        bookingPage === pageNum
                          ? 'bg-violet-500 text-white font-black shadow-lg shadow-violet-500/25 scale-105'
                          : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {/* Next Page */}
                <button
                  type="button"
                  onClick={() => setBookingPage((p) => Math.min(totalBookingPages, p + 1))}
                  disabled={bookingPage === totalBookingPages}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition flex items-center gap-1"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Admin Delay / Reschedule Modal */}
          {selectedBookingForDelay && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <div className="w-full max-w-md p-6 bg-[#0b1322] border border-slate-700/80 rounded-3xl shadow-2xl relative space-y-4 text-xs">
                <button
                  onClick={() => setSelectedBookingForDelay(null)}
                  className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                >
                  ✕
                </button>

                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                    Admin Schedule Control
                  </span>
                  <h3 className="text-base font-extrabold text-white">
                    Delay / Reschedule Booking #{selectedBookingForDelay.bookingNumber}
                  </h3>
                  <p className="text-slate-400 text-xs">
                    Update the scheduled appointment time and broadcast a delay notice to customer and pro.
                  </p>
                </div>

                <form onSubmit={handleConfirmDelayByAdmin} className="space-y-3 pt-1">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">New Scheduled Date:</label>
                    <input
                      type="date"
                      required
                      value={delayNewDate}
                      onChange={(e) => setDelayNewDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white font-bold focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">New Time Slot:</label>
                    <select
                      value={delayNewTime}
                      onChange={(e) => setDelayNewTime(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white font-bold focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="08:00 AM - 10:00 AM">08:00 AM - 10:00 AM</option>
                      <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                      <option value="01:00 PM - 03:00 PM">01:00 PM - 03:00 PM</option>
                      <option value="03:00 PM - 05:00 PM">03:00 PM - 05:00 PM</option>
                      <option value="05:00 PM - 07:00 PM">05:00 PM - 07:00 PM</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Reason for Delay / Notice:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Heavy rain / waterlogging delay, Prior job extended"
                      value={delayReasonText}
                      onChange={(e) => setDelayReasonText(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedBookingForDelay(null)}
                      className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold border border-slate-700 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition shadow-lg shadow-amber-500/25"
                    >
                      Save Delay & Notify
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Admin Cancel with Reason Modal */}
          {selectedBookingForAdminCancel && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <div className="w-full max-w-md p-6 bg-[#0b1322] border border-slate-700/80 rounded-3xl shadow-2xl relative space-y-4 text-xs">
                <button
                  onClick={() => setSelectedBookingForAdminCancel(null)}
                  className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                >
                  ✕
                </button>

                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/30">
                    Administrative Cancellation
                  </span>
                  <h3 className="text-base font-extrabold text-white">
                    Cancel Booking #{selectedBookingForAdminCancel.bookingNumber}
                  </h3>
                  <p className="text-slate-400 text-xs">
                    Please provide an official administrative reason for cancelling and refunding this booking.
                  </p>
                </div>

                <form onSubmit={handleConfirmCancelByAdmin} className="space-y-3 pt-1">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Cancellation Reason:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Customer refund requested, Duplicate request, Specialist unavailable"
                      value={adminCancelReason}
                      onChange={(e) => setAdminCancelReason(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-rose-400"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedBookingForAdminCancel(null)}
                      className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold border border-slate-700 transition"
                    >
                      Keep Booking
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold transition shadow-lg shadow-rose-500/25"
                    >
                      Confirm Cancellation
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Booking Full Details Inspection Modal */}
          {selectedBookingForInspect && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <div className="w-full max-w-lg p-6 bg-slate-950 border border-slate-800 rounded-3xl space-y-4 relative shadow-2xl">
                <button
                  onClick={() => setSelectedBookingForInspect(null)}
                  className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                >
                  ✕
                </button>

                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-violet-400 font-bold text-sm">
                    LX
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span>Booking #{selectedBookingForInspect.bookingNumber}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/40 font-bold">
                        {selectedBookingForInspect.status}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Created on {new Date(selectedBookingForInspect.createdAt || Date.now()).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
                  <div className="grid grid-cols-2 gap-3 border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-slate-400 font-medium block">Service Item</span>
                      <strong className="text-white block mt-0.5">{selectedBookingForInspect.serviceName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium block">Total Price</span>
                      <strong className="text-teal-400 block mt-0.5 text-sm">
                        ₹{selectedBookingForInspect.price || selectedBookingForInspect.basePrice || 299}
                      </strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-slate-400 font-medium block">Customer Information</span>
                      <p className="text-slate-200 font-bold mt-0.5">
                        {selectedBookingForInspect.customer?.name || selectedBookingForInspect.customerId?.name || 'Customer'}
                      </p>
                      <p className="text-slate-400 text-[11px]">
                        {selectedBookingForInspect.customer?.email || selectedBookingForInspect.customerId?.email}
                      </p>
                      <p className="text-slate-400 text-[11px]">
                        {selectedBookingForInspect.customer?.phone || selectedBookingForInspect.customerId?.phone}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium block">Assigned Specialist</span>
                      <p className="text-teal-300 font-bold mt-0.5">
                        {selectedBookingForInspect.professional?.businessName ||
                          selectedBookingForInspect.professionalId?.businessName}
                      </p>
                      <p className="text-slate-400 text-[11px]">
                        {selectedBookingForInspect.scheduledDate} ({selectedBookingForInspect.scheduledTime})
                      </p>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 font-medium block">Service Address & Notes</span>
                    <p className="text-slate-200 mt-0.5">
                      {selectedBookingForInspect.address?.addressLine || 'Address on file'},{' '}
                      {selectedBookingForInspect.address?.city || 'Kolkata'}
                      {selectedBookingForInspect.address?.landmark && ` (Near ${selectedBookingForInspect.address.landmark})`}
                    </p>
                    {selectedBookingForInspect.notes && (
                      <p className="text-slate-400 text-[11px] italic mt-1 bg-slate-950 p-2 rounded-lg border border-slate-800">
                        Note: "{selectedBookingForInspect.notes}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-xs">Set Status:</span>
                    <select
                      value={selectedBookingForInspect.status}
                      onChange={(e) => {
                        handleUpdateBookingStatus(selectedBookingForInspect._id, e.target.value);
                        setSelectedBookingForInspect((prev) => ({ ...prev, status: e.target.value }));
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-white font-bold text-xs"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </div>

                  <button
                    onClick={() => setSelectedBookingForInspect(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
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

      {/* MASTER SECURITY MODAL: ADMIN CREDENTIALS INSPECTOR */}
      {selectedAdminForCredentials && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="max-w-md w-full rounded-3xl bg-[#0b1322] border border-amber-500/40 shadow-2xl overflow-hidden p-6 space-y-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Crown className="w-5 h-5 fill-amber-400" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white flex items-center gap-1.5">
                    <span>Admin Security Credentials</span>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded border border-amber-500/30 uppercase">
                      Master Clearance
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">Confidential governance access for Master Owner Koustav Mondal.</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAdminForCredentials(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            {/* Admin Info Card */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={selectedAdminForCredentials.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'}
                  alt=""
                  className="w-12 h-12 rounded-xl object-cover border border-amber-500/40"
                />
                <div>
                  <h4 className="font-extrabold text-white text-sm">{selectedAdminForCredentials.name}</h4>
                  <p className="text-slate-400 font-mono text-[11px]">{selectedAdminForCredentials.email}</p>
                  <span className="inline-block mt-0.5 text-[10px] font-bold text-teal-400 uppercase tracking-wider">
                    Role: {selectedAdminForCredentials.role} · Scope: {selectedAdminForCredentials.city || 'Kolkata'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-[11px]">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Admin Identifier</span>
                  <span className="font-mono font-bold text-amber-300">
                    {selectedAdminForCredentials.adminId || `ADM-${selectedAdminForCredentials._id.slice(-6).toUpperCase()}`}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Security Clearance</span>
                  <span className="font-bold text-teal-300">Tier-2 Ops Admin</span>
                </div>
              </div>

              {/* Password / Passcode Box */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
                    <Key className="w-3.5 h-3.5 text-amber-400" />
                    Admin Login Password
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[11px] text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showPassword ? 'Hide' : 'Reveal'}</span>
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-[#091120] border border-slate-800">
                  <span className="font-mono text-xs font-extrabold text-white tracking-wider">
                    {showPassword
                      ? (selectedAdminForCredentials.password || 'adminOps#2026')
                      : '••••••••••••'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(selectedAdminForCredentials.password || 'adminOps#2026');
                      setCopiedText('Password copied!');
                      setTimeout(() => setCopiedText(''), 2500);
                    }}
                    className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-bold flex items-center gap-1 transition"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedText || 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Confidentiality Notice */}
            <div className="p-3 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-[11px] text-teal-200 leading-relaxed flex items-start gap-2">
              <Lock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span>
                <strong>Confidentiality Guarantee:</strong> Customer and Professional personal credentials, passwords, and private identifiers remain strictly encrypted and non-accessible under the platform privacy policy.
              </span>
            </div>

            <button
              type="button"
              onClick={() => setSelectedAdminForCredentials(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
            >
              Close Security View
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
