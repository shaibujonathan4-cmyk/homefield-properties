import { Link } from 'react-router-dom';
import './PropertyCard.css';

function formatNaira(amount) {
  return `₦${Math.round(amount).toLocaleString()}`;
}

export default function PropertyCard({ property }) {
  const { id, title, location, price, priceLabel, specs, images, status } = property;
  const bookingFee = price * 0.10;
  const isBooked = status === 'booked';

  return (
    <Link to={`/property/${id}`} className={`property-card ${isBooked ? 'property-card--booked' : ''}`}>
      <div className="property-card-image">
        <img src={images[0]} alt={title} />
        {isBooked && <span className="property-card-badge">Booked</span>}
      </div>
      <div className="property-card-body">
        <h3>{title}</h3>
        <p className="property-card-location">{location}</p>
        <p className="property-card-specs">
          {specs.rooms !== '-' ? `${specs.rooms} rooms · ` : ''}{specs.size}
        </p>
        <div className="property-card-footer">
          <span className="property-card-price">
            {formatNaira(price)}{priceLabel && <span> {priceLabel}</span>}
          </span>
          <span className="property-card-fee">Fee: {formatNaira(bookingFee)}</span>
        </div>
      </div>
    </Link>
  );
}