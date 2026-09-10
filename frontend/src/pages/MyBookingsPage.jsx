import { useAuth } from '../context/AuthContext.jsx';
import { useBookings } from '../context/BookingContext.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import './MyBookingsPage.css';

function formatNaira(amount) {
  return `₦${Math.round(amount).toLocaleString()}`;
}

function formatDate(timestamp) {
  if (!timestamp?.toDate) return '—';
  return timestamp.toDate().toLocaleDateString();
}

export default function MyBookingsPage() {
  const { user } = useAuth();
  const { bookings, loading, markCancelled } = useBookings();

  const myBookings = bookings.filter((b) => b.buyerEmail === user?.email);

  const handleCancel = (booking) => {
    if (window.confirm(
      `Cancel your booking for "${booking.propertyTitle}"? A 4% fee will be forfeited and the rest refunded to you.`
    )) {
      markCancelled(booking.id, booking);
    }
  };

  return (
    <>
      <Navbar />
      <section className="my-bookings-page">
        <div className="container">
          <h1>My Bookings</h1>

          {loading ? (
            <p>Loading your bookings...</p>
          ) : myBookings.length === 0 ? (
            <p className="my-bookings-empty">
              You haven't booked any properties yet.
            </p>
          ) : (
            <div className="my-bookings-list">
              {myBookings.map((b) => (
                <div className="my-booking-card" key={b.id}>
                  <div className="my-booking-top">
                    <h3>{b.propertyTitle}</h3>
                    <span className={`admin-status admin-status--${b.status}`}>
                      {b.status}
                    </span>
                  </div>

                  <div className="my-booking-row">
                    <span>Booking fee paid</span>
                    <span>{formatNaira(b.bookingFee)}</span>
                  </div>
                  <div className="my-booking-row">
                    <span>Booked on</span>
                    <span>{formatDate(b.bookedAt)}</span>
                  </div>

                  {b.status === 'completed' && (
                    <div className="my-booking-row">
                      <span>Balance due</span>
                      <span>{formatNaira(b.balanceDue)}</span>
                    </div>
                  )}

                  {b.status === 'cancelled' && (
                    <>
                      <div className="my-booking-row">
                        <span>Forfeited (4%)</span>
                        <span>{formatNaira(b.forfeitAmount)}</span>
                      </div>
                      <div className="my-booking-row">
                        <span>Refunded</span>
                        <span>{formatNaira(b.refundAmount)}</span>
                      </div>
                    </>
                  )}

                  {b.status === 'pending' && (
                    <button className="my-booking-cancel" onClick={() => handleCancel(b)}>
                      Cancel booking
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}