import { useParams, Link } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import PropertyCard from '../components/PropertyCard.jsx';
import './CategoryPage.css';

const CATEGORY_LABELS = {
  homes: 'Homes',
  'self-contained': 'Self Contained',
  shops: 'Shops',
  lands: 'Lands',
};

export default function CategoryPage() {
  const { slug } = useParams();
  const label = CATEGORY_LABELS[slug] || 'Properties';
  const { getPropertiesByCategory } = useProperties();
  const listings = getPropertiesByCategory(slug);
  return (
    <>
      <Navbar />
      <section className="category-page">
        <div className="container">
          <div className="category-page-heading">
            <h1>{label}</h1>
            <p>{listings.length} {listings.length === 1 ? 'listing' : 'listings'} available</p>
          </div>

          {listings.length > 0 ? (
            <div className="category-page-grid">
              {listings.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="category-page-empty">
              <p>No {label.toLowerCase()} available right now.</p>
              <Link to="/#request">Tell us what you're looking for instead</Link>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}