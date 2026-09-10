import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import './LoginPage.css';

const PASSWORD_RULE = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;

function friendlyError(code) {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'An account already exists with this email.';
    case 'auth/invalid-email':
      return 'That email address looks invalid.';
    case 'auth/weak-password':
      return 'Password is too weak.';
    default:
      return 'Something went wrong. Please try again.';
  }
}

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === 'password') setPasswordError('');
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!PASSWORD_RULE.test(form.password)) {
      setPasswordError(
        'Password must be at least 6 characters and include a letter, a number, and a special character.'
      );
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    try {
      await signup({ name: form.name, email: form.email, password: form.password });
      navigate('/');
    } catch (err) {
      setFormError(friendlyError(err.code));
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="auth-page">
        <div className="container auth-page-inner">
          <form className="auth-form" onSubmit={handleSubmit}>
            <h1>Create your account</h1>
            <p className="auth-form-subtext">
              You'll need an account to book a property.
            </p>

            <label>
              Full name
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
              />
            </label>

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
              <span className="auth-form-hint">
                At least 6 characters, with a letter, a number, and a special character.
              </span>
              {passwordError && <span className="auth-form-error">{passwordError}</span>}
            </label>

            {formError && <p className="auth-form-error">{formError}</p>}

            <button type="submit" className="auth-form-submit" disabled={isSubmitting}>
              {isSubmitting ? <span className="spinner" /> : 'Create account'}
            </button>

            <p className="auth-form-switch">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}