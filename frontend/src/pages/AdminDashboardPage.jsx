import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import AdminListingsTab from '../components/admin/AdminListingsTab.jsx';
import AdminBookingsTab from '../components/admin/AdminBookingsTab.jsx';
import AdminRequestsTab from '../components/admin/AdminRequestsTab.jsx';
import './AdminDashboardPage.css';

const TABS = [
  { id: 'listings', label: 'Listings' },
  { id: 'bookings', label: 'Bookings' },
  { id: 'requests', label: 'Requests' },
];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('listings');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <Link to="/" className="admin-sidebar-brand">Homefield Admin</Link>
        <a href="/" className="admin-view-site">View site →</a>
        <nav className="admin-sidebar-nav">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? 'active' : ''}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <span>{user?.email}</span>
          <button onClick={handleLogout}>Log out</button>
        </div>
      </aside>

      <main className="admin-main">
        {activeTab === 'listings' && <AdminListingsTab />}
        {activeTab === 'bookings' && <AdminBookingsTab />}
        {activeTab === 'requests' && <AdminRequestsTab />}
      </main>
    </div>
  );
}