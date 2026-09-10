import { Link } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext.jsx';
import './Hero.css';

function formatNaira(amount) {
  return `₦${Math.round(amount).toLocaleString()}`;
}

export default function Hero() {
  const { properties, loading } = useProperties();
  const featured = properties[0];

  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <h1 className="hero-headline">
            Find land, a home,<br />or a shop worth<br />building on.
          </h1>
          <p className="hero-subtext">
            Browse verified homes, self contained apartments, shops and
            land. Book what you find, or tell us exactly what you're
            looking for and we'll find it for you.
          </p>

          <form className="hero-search" onSubmit={(e) => e.preventDefault()}>
            <select className="hero-search-select" defaultValue="">
              <option value="" disabled>Property type</option>
              <option value="homes">Homes</option>
              <option value="self-contained">Self Contained</option>
              <option value="shops">Shops</option>
              <option value="lands">Lands</option>
            </select>
            <input
              type="text"
              className="hero-search-input"
              placeholder="Area or location"
            />
            <button type="submit" className="hero-search-button">
              Search
            </button>
          </form>

          <div className="hero-stats">
            <div>
              <span className="hero-stat-number">{properties.length}+</span>
              <span className="hero-stat-label">Listings live now</span>
            </div>
            <div>
              <span className="hero-stat-number">10%</span>
              <span className="hero-stat-label">Booking fee to reserve</span>
            </div>
          </div>
        </div>

        <div className="hero-feature">
          {!loading && featured && (
            <Link to={`/property/${featured.id}`} className="hero-feature-card">
              <div className="hero-feature-image">
                <img src={featured.images[0]} alt={featured.title} />
                <span className="hero-feature-tag">{featured.category}</span>
              </div>
              <div className="hero-feature-body">
                <div className="hero-feature-top">
                  <h3>{featured.title}</h3>
                  <p className="hero-feature-price">
                    {formatNaira(featured.price)}
                    {featured.priceLabel && <span> {featured.priceLabel}</span>}
                  </p>
                </div>
                <p className="hero-feature-specs">
                  {featured.specs.rooms !== '-' ? `${featured.specs.rooms} rooms · ` : ''}
                  {featured.specs.size}
                </p>
                <p className="hero-feature-fee">
                  Booking fee: {formatNaira(featured.price * 0.1)} (10%)
                </p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}