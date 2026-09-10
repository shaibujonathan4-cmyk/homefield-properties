import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useBookings } from '../context/BookingContext.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import './BookingConfirmPage.css';

const BOOKING_FEE_RATE = 0.10;
const CANCELLATION_FORFEIT_RATE = 0.04;
const PAYSTACK_PUBLIC_KEY = 'pk_test_348905d5b7340ef205ee7145dc9e44ea99b49926';

function formatNaira(amount) {
  return `₦${Math.round(amount).toLocaleString()}`;
}

export default function BookingConfirmPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  const { getPropertyById } = useProperties();
  const { createBooking } = useBookings();

  const property = getPropertyById(id);
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(`/login?redirect=/book/${id}`);
    }
  }, [isLoggedIn, id, navigate]);

  if (!property) {
    return (
      <>
        <Navbar />
        <div className="container booking-confirm-empty">
          <h2>Property not found</h2>
        </div>
        <Footer />
      </>
    );
  }

  if (!isLoggedIn) {
    return null; // redirecting via useEffect
  }

  const { title, price, priceLabel, location, images } = property;
  const bookingFee = price * BOOKING_FEE_RATE;
  const forfeitIfCancelled = price * CANCELLATION_FORFEIT_RATE;
  const refundIfCancelled = bookingFee - forfeitIfCancelled;

  const handleConfirmPay = () => {
    setError('');
    setIsPaying(true);

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: user.email,
      amount: Math.round(bookingFee * 100), // Paystack expects kobo
      currency: 'NGN',
      ref: `homefield-${Date.now()}`,
      callback: (response) => {
        // Payment succeeded on Paystack's side — now verify server-side
        // before trusting it and creating the booking.
        verifyAndCreateBooking(response.reference);
      },
      onClose: () => {
        setIsPaying(false);
      },
    });

    handler.openIframe();
  };

  const verifyAndCreateBooking = async (reference) => {
    try {
      const res = await fetch(`/api/payments/verify/${reference}`);
      const data = await res.json();

      if (!data.verified) {
        setError('Payment could not be verified. Please contact support with your reference: ' + reference);
        setIsPaying(false);
        return;
      }

      await createBooking({
        propertyId: id,
        propertyTitle: title,
        price,
        bookingFee,
        buyerEmail: user.email,
        paymentReference: reference,
      });

      setConfirmedBooking({ propertyId: id });
    } catch (err) {
      setError('Something went wrong confirming your payment. Please contact support with your reference: ' + reference);
    } finally {
      setIsPaying(false);
    }
  };

  if (confirmedBooking) {
    return (
      <>
        <Navbar />
        <section className="booking-confirm-page">
          <div className="container">
            <div className="booking-success">
              <span className="booking-success-icon">✓</span>
              <h1>Booking fee paid</h1>
              <p className="booking-success-status">Status: Pending completion</p>
              <p className="booking-success-text">
                You've reserved <strong>{title}</strong> with a booking fee of{' '}
                {formatNaira(bookingFee)}. We'll be in touch to finalize the deal.
              </p>
              <div className="booking-success-actions">
                <Link to="/" className="booking-success-home">Back to home</Link>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="booking-confirm-page">
        <div className="container booking-confirm-inner">
          <div className="booking-confirm-summary">
            <img src={images[0]} alt={title} />
            <div>
              <h2>{title}</h2>
              <p className="booking-confirm-location">{location}</p>
              <p className="booking-confirm-price">
                {formatNaira(price)}{priceLabel && <span> {priceLabel}</span>}
              </p>
            </div>
          </div>

          <div className="booking-confirm-panel">
            <h1>Confirm your booking</h1>

            <div className="booking-confirm-row">
              <span>Booking fee (10%)</span>
              <span>{formatNaira(bookingFee)}</span>
            </div>

            <div className="booking-confirm-policy">
              <h4>If the deal goes through</h4>
              <p>Your {formatNaira(bookingFee)} is applied to the remaining balance.</p>

              <h4>If you cancel</h4>
              <p>
                A flat 4% ({formatNaira(forfeitIfCancelled)}) is non-refundable.
                The remaining {formatNaira(refundIfCancelled)} is refunded to you.
              </p>
            </div>

            {error && <p className="booking-confirm-error">{error}</p>}

            <button
              className="booking-confirm-cta"
              onClick={handleConfirmPay}
              disabled={isPaying}
            >
              {isPaying ? <span className="spinner" /> : `Confirm & Pay ${formatNaira(bookingFee)}`}
            </button>

            <p className="booking-confirm-test-note">
              Test mode — use card number 4084 0840 8408 4081, any future
              expiry date, CVV 408, and OTP 123456.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}