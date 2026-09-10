import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import Categories from '../components/Categories.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import RequestCTA from '../components/RequestCTA.jsx';
import Footer from '../components/Footer.jsx';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function LandingPage() {
  usePageMeta(
    'Homes, Self Contained, Shops & Land',
    'Browse verified homes, self contained apartments, shops, and land. Book online with a clear 10% booking fee, or tell us what you\'re looking for.'
  );

  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <HowItWorks />
      <RequestCTA />
      <Footer />
    </>
  );
}