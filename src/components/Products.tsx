import { products } from '../data/products';
import ProductPanel from './ProductPanel';
import Reveal from './Reveal';

export default function Products() {
  return (
    <section id="products" className="relative px-4 md:px-6 pb-8">
      <Reveal className="max-w-3xl mx-auto text-center py-20 md:py-28">
        <h2 className="font-display text-4xl md:text-6xl font-bold tracking-[-0.025em] text-[#0d2b4d] leading-[1.04]">
          Six pillars. One promise.
        </h2>
        <p className="mt-6 text-[17px] md:text-lg text-[#2c5479] leading-relaxed">
          Every product is built to the same brief &mdash; clean, opinionated software
          that saves the person who uses it fifteen minutes a day, or it doesn&rsquo;t ship.
        </p>
      </Reveal>

      <div className="max-w-[1180px] mx-auto space-y-5 md:space-y-6">
        {products.map((p, i) => (
          <ProductPanel key={p.code} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}
