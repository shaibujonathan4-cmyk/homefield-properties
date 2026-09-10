import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import Categories from '../components/Categories.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import RequestCTA from '../components/RequestCTA.jsx';
import Footer from '../components/Footer.jsx';

export default function LandingPage() {
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