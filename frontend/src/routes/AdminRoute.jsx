import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function AdminRoute({ children }) {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return null; // avoid flashing a redirect while Firebase checks auth state
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}