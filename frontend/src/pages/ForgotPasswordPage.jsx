import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase.js';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import './LoginPage.css';

function friendlyError(code) {
  switch (code) {
    case 'auth/invalid-email':
      return 'That email address looks invalid.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Try again in a moment.';
    default:
      return 'Something went wrong. Please try again.';
  }
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await sendPasswordResetEmail(auth, email);
      setIsSent(true);
    } catch (err) {
      // Firebase throws auth/user-not-found for unregistered emails.
      // Showing the same success screen either way avoids leaking
      // which emails have accounts.
      if (err.code === 'auth/user-not-found') {
        setIsSent(true);
      } else {
        setError(friendlyError(err.code));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="auth-page">
        <div className="container auth-page-inner">
          {isSent ? (
            <div className="auth-form">
              <h1>Check your email</h1>
              <p className="auth-form-subtext">
                If an account exists for {email}, a password reset link has
                been sent. Check your inbox (and spam folder).
              </p>
              <p className="auth-form-switch">
                <Link to="/login">Back to log in</Link>
              </p>
            </div>
          ) : (
            <form className="auth-form" onSubmit={handleSubmit}>
              <h1>Reset your password</h1>
              <p className="auth-form-subtext">
                Enter your email and we'll send you a link to reset your password.
              </p>

              <label>
                Email
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="you@example.com"
                />
                {error && <span className="auth-form-error">{error}</span>}
              </label>

              <button type="submit" className="auth-form-submit" disabled={isSubmitting}>
                {isSubmitting ? <span className="spinner" /> : 'Send reset link'}
              </button>

              <p className="auth-form-switch">
                Remembered it? <Link to="/login">Log in</Link>
              </p>
            </form>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}