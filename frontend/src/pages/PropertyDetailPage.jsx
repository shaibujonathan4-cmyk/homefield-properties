import { useParams } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import BookingPanel from '../components/BookingPanel.jsx';
import { usePageMeta } from '../hooks/usePageMeta.js';
import './PropertyDetailPage.css';
export default function PropertyDetailPage() {
  const { id } = useParams();
  const { getPropertyById } = useProperties();
  const property = getPropertyById(id);

  if (!property) {
    return (
      <>
        <Navbar />
        <div className="container property-not-found">
          <h2>Property not found</h2>
          <p>This listing may have been booked or removed.</p>
        </div>
        <Footer />
      </>
    );
  }

  const { title, location, price, priceLabel, specs, description, images, category, status } = property;

  usePageMeta(
    title,
    `${title} in ${location}. ${specs.rooms !== '-' ? specs.rooms + ' rooms, ' : ''}${specs.size}. ${description.slice(0, 100)}`
  );

  return (
    <>
      <Navbar />
      <section className="property-detail">
        <div className="container property-detail-inner">
          <div className="property-detail-main">
            <span className="property-detail-tag">{category}</span>
            <h1>{title}</h1>
            <p className="property-detail-location">{location}</p>

            <div className="property-detail-gallery">
              {images.map((src, i) => (
                <img key={i} src={src} alt={`${title} photo ${i + 1}`} />
              ))}
            </div>

            <div className="property-detail-specs">
              <div>
                <span className="spec-label">Rooms</span>
                <span className="spec-value">{specs.rooms}</span>
              </div>
              <div>
                <span className="spec-label">Bathrooms</span>
                <span className="spec-value">{specs.bathrooms}</span>
              </div>
              <div>
                <span className="spec-label">Size</span>
                <span className="spec-value">{specs.size}</span>
              </div>
              <div>
                <span className="spec-label">Extras</span>
                <span className="spec-value">{specs.extras}</span>
              </div>
            </div>

            <div className="property-detail-description">
              <h3>About this property</h3>
              <p>{description}</p>
            </div>
          </div>
<BookingPanel price={price} priceLabel={priceLabel} title={title} id={id} status={status} />
        </div>
      </section>
      <Footer />
    </>
  );
}