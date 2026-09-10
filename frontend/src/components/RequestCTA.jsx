import { useState } from 'react';
import { useRequests } from '../context/RequestContext.jsx';
import './RequestCTA.css';

export default function RequestCTA() {
  const { submitRequest } = useRequests();

  const [form, setForm] = useState({
    budget: '',
    area: '',
    details: '',
    name: '',
    contact: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await submitRequest(form);
      setIsSent(true);
    } catch (err) {
      setError('Something went wrong sending your request. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (isSent) {
    return (
      <section className="request-cta" id="request">
        <div className="container">
          <div className="request-cta-success">
            <h2>Request sent</h2>
            <p>We've got your details and will reach out if there's a match.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="request-cta" id="request">
      <div className="container request-cta-inner">
        <div className="request-cta-copy">
          <h2>Can't find what you're looking for?</h2>
          <p>
            Tell us your budget, the specs you need, and your preferred
            area. We'll match you against upcoming listings or go find it.
          </p>
        </div>
        <form className="request-cta-form" onSubmit={handleSubmit}>
          <div className="request-cta-row">
            <input
              type="text"
              name="budget"
              placeholder="Budget (e.g. ₦2,000,000)"
              value={form.budget}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="area"
              placeholder="Preferred area"
              value={form.area}
              onChange={handleChange}
              required
            />
          </div>
          <textarea
            name="details"
            placeholder="What are you looking for? (type, rooms, size, etc.)"
            rows={3}
            value={form.details}
            onChange={handleChange}
            required
          />
          <div className="request-cta-row">
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="contact"
              placeholder="Phone or email"
              value={form.contact}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="request-cta-error">{error}</p>}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <span className="spinner" /> : 'Send request'}
          </button>
        </form>
      </div>
    </section>
  );
}