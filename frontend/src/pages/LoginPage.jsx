import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import './LoginPage.css';

function friendlyError(code) {
  switch (code) {
    case 'auth/invalid-email':
      return 'That email address looks invalid.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect email or password.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Try again in a moment.';
    default:
      return 'Something went wrong. Please try again.';
  }
}

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await login({ email: form.email, password: form.password });
      navigate(redirectTo);
    } catch (err) {
      setError(friendlyError(err.code));
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="auth-page">
        <div className="container auth-page-inner">
          <form className="auth-form" onSubmit={handleSubmit}>
            <h1>Log in</h1>
            <p className="auth-form-subtext">
              Log in to book a property or check your existing bookings.
            </p>

            <label>
              Email
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </label>

            <label>
              Password
              <div className="password-field">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {error && <span className="auth-form-error">{error}</span>}
            </label>

            <Link to="/forgot-password" className="auth-form-forgot">
              Forgot password?
            </Link>

            <button type="submit" className="auth-form-submit" disabled={isSubmitting}>
              {isSubmitting ? <span className="spinner" /> : 'Log in'}
            </button>

            <p className="auth-form-switch">
              Don't have an account? <Link to="/signup">Create one</Link>
            </p>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}