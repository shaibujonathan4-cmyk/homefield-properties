import { useBookings } from '../../context/BookingContext.jsx';

function formatNaira(amount) {
  return `₦${Math.round(amount).toLocaleString()}`;
}

function formatDate(timestamp) {
  if (!timestamp?.toDate) return '—';
  return timestamp.toDate().toLocaleDateString();
}

export default function AdminBookingsTab() {
  const { bookings, loading, markCompleted, markCancelled } = useBookings();

  const handleComplete = (booking) => {
    if (window.confirm(`Mark "${booking.propertyTitle}" as completed? The booking fee will be applied to the remaining balance.`)) {
      markCompleted(booking.id, booking);
    }
  };

  const handleCancel = (booking) => {
    if (window.confirm(`Cancel "${booking.propertyTitle}"? A 4% fee will be forfeited and the rest refunded.`)) {
      markCancelled(booking.id, booking);
    }
  };

  return (
    <div>
      <h1>Bookings</h1>

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Buyer</th>
              <th>Booking fee</th>
              <th>Status</th>
              <th>Details</th>
              <th>Booked on</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td data-label="Property">{b.propertyTitle}</td>
                <td data-label="Buyer">{b.buyerEmail}</td>
                <td data-label="Booking fee">{formatNaira(b.bookingFee)}</td>
                <td data-label="Status">
                  <span className={`admin-status admin-status--${b.status}`}>
                    {b.status}
                  </span>
                </td>
                <td data-label="Details" className="admin-table-details">
                  {b.status === 'completed' && (
                    <span>Balance due: {formatNaira(b.balanceDue)}</span>
                  )}
                  {b.status === 'cancelled' && (
                    <span>
                      Forfeited: {formatNaira(b.forfeitAmount)} · Refunded: {formatNaira(b.refundAmount)}
                    </span>
                  )}
                  {b.status === 'pending' && <span>—</span>}
                </td>
                <td data-label="Booked on">{formatDate(b.bookedAt)}</td>
                <td className="admin-table-actions" data-label="">
                  {b.status === 'pending' && (
                    <>
                      <button onClick={() => handleComplete(b)}>Complete</button>
                      <button className="admin-delete" onClick={() => handleCancel(b)}>
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}