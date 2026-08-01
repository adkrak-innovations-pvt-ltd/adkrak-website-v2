import Nav from './components/Nav';
import Hero from './components/Hero';
import Products from './components/Products';
import FounderMatrix from './components/FounderMatrix';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Products />
        <FounderMatrix />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
