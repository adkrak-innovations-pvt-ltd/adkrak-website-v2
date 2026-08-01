import Nav from './components/Nav';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import FounderMatrix from './components/FounderMatrix';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen">
      <Nav />
      <main>
        <Hero />
        <BentoGrid />
        <FounderMatrix />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
