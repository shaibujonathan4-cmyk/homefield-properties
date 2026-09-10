import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import './Navbar.css';

export default function Navbar() {
  const { isLoggedIn, user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">Homefield</Link>
        <nav className="navbar-links">
          <a href="#homes">Homes</a>
          <a href="#self-contained">Self Contained</a>
          <a href="#shops">Shops</a>
          <a href="#lands">Lands</a>
          <a href="#request">Request a property</a>
        </nav>
        <div className="navbar-actions">
{isLoggedIn ? (
            <>
              {isAdmin && <Link to="/admin/dashboard" className="navbar-login">Admin</Link>}
              <Link to="/my-bookings" className="navbar-login">My Bookings</Link>
              <span className="navbar-greeting">Hi, {user.name || user.email.split('@')[0]}</span>
              <button className="navbar-logout" onClick={handleLogout}>Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-login">Log in</Link>
              <Link to="/signup" className="navbar-signup">Create account</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}