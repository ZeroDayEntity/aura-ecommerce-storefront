
import { ProductCard } from '@/components/products/ProductCard';
import { getProducts } from '@/lib/products';
import { MotionDiv } from '@/components/ui/MotionDiv';

export const metadata = {
  title: 'All Collections - Aura',
  description: 'Explore our full collection of minimalist luxury goods.',
};

export default function ProductsPage() {
  const products = getProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold">All Collections</h1>
        <p className="mt-2 text-lg text-secondary-text">
          Curated essentials for the discerning individual.
        </p>
      </MotionDiv>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product, i) => (
          <MotionDiv
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <ProductCard product={product} />
          </MotionDiv>
        ))}
      </div>
    </div>
  );
}
