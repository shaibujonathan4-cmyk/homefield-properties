import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import PropertyDetailPage from './pages/PropertyDetailPage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import BookingConfirmPage from './pages/BookingConfirmPage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';
import AdminRoute from './routes/AdminRoute.jsx';
import MyBookingsPage from './pages/MyBookingsPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/property/:id" element={<PropertyDetailPage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/book/:id" element={<BookingConfirmPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboardPage />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}