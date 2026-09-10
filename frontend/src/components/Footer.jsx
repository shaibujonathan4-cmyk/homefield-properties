import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">Homefield</div>
        <p className="footer-note">
          Homes, self contained apartments, shops, and land — verified
          listings with clear pricing and fees.
        </p>
        <div className="footer-links">
          <a href="#browse">Browse</a>
          <a href="#request">Request a property</a>
          <a href="/login">Log in</a>
        </div>
      </div>
    </footer>
  );
}