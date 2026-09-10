import { Link } from 'react-router-dom';
import './Categories.css';

const categories = [
  {
    id: 'homes',
    label: 'Homes',
    count: '86 available',
    description: 'Detached and semi-detached houses, ready to move in.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=80',
    span: 'wide',
  },
  {
    id: 'self-contained',
    label: 'Self Contained',
    count: '112 available',
    description: 'Single rooms and studio units, often with power and water included.',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=700&q=80',
    span: 'tall',
  },
  {
    id: 'shops',
    label: 'Shops',
    count: '34 available',
    description: 'Storefronts and commercial units on busy streets and in markets.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&q=80',
    span: 'wide',
  },
  {
    id: 'lands',
    label: 'Lands',
    count: '58 available',
    description: 'Titled plots for building, farming, or holding as an investment.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=700&q=80',
    span: 'tall',
  },
];

export default function Categories() {
  return (
    <section className="categories" id="browse">
      <div className="container">
        <div className="categories-heading">
          <h2>Browse by property type</h2>
          <p>Every listing shows full specs, price, and the exact booking fee up front.</p>
        </div>

        <div className="categories-grid">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className={`category-card category-card--${cat.span}`}
            >
              <div className="category-card-image">
                <img src={cat.image} alt={cat.label} />
              </div>
              <div className="category-card-body">
                <div className="category-card-top">
                  <h3>{cat.label}</h3>
                  <span className="category-card-count">{cat.count}</span>
                </div>
                <p>{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}