import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import './BookingPanel.css';

const BOOKING_FEE_RATE = 0.10;
const CANCELLATION_FORFEIT_RATE = 0.04;

function formatNaira(amount) {
  return `₦${Math.round(amount).toLocaleString()}`;
}

export default function BookingPanel({ price, priceLabel, id, status }) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const isBooked = status === 'booked';
  const bookingFee = price * BOOKING_FEE_RATE;
  const forfeitIfCancelled = price * CANCELLATION_FORFEIT_RATE;
  const refundIfCancelled = bookingFee - forfeitIfCancelled;

  const handleBook = () => {
    if (!isLoggedIn) {
      navigate(`/login?redirect=/book/${id}`);
      return;
    }
    navigate(`/book/${id}`);
  };

  return (
    <aside className="booking-panel">
      <div className="booking-panel-price">
        <span className="booking-panel-price-amount">{formatNaira(price)}</span>
        <span className="booking-panel-price-label">{priceLabel}</span>
      </div>

      <div className="booking-panel-fee-row">
        <span>Booking fee (10%)</span>
        <span>{formatNaira(bookingFee)}</span>
      </div>

      {isBooked ? (
        <button className="booking-panel-cta booking-panel-cta--disabled" disabled>
          Already booked
        </button>
      ) : (
        <button className="booking-panel-cta" onClick={handleBook}>
          {isLoggedIn ? 'Book this property' : 'Log in to book'}
        </button>
      )}

      <div className="booking-panel-policy">
        <h4>If the deal goes through</h4>
        <p>Your {formatNaira(bookingFee)} booking fee is applied to the remaining balance.</p>

        <h4>If you cancel</h4>
        <p>
          A flat 4% ({formatNaira(forfeitIfCancelled)}) is kept as a
          non-refundable fee. The remaining{' '}
          {formatNaira(refundIfCancelled)} is refunded to you.
        </p>
      </div>

      <p className="booking-panel-note">
        An account is required to book. You can browse and view all
        property details without one.
      </p>
    </aside>
  );
}