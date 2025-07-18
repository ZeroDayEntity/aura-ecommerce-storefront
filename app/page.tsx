
import { ProductCard } from '@/components/products/ProductCard';
import { getFeaturedProducts } from '@/lib/products';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import { MotionDiv } from '@/components/ui/MotionDiv';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full">
      <Image
  src="https://images.unsplash.com/photo-1593121923419-1588a2455985?q=80&w=2940&auto=format&fit=crop"
  alt="Aura Lifestyle"
  fill
  style={{ objectFit: 'cover' }}
  className="brightness-75"
  priority
/>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-center text-white">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold md:text-6xl">Effortless Luxury</h1>
            <p className="mt-4 max-w-lg text-lg">
              Discover curated essentials, designed for a modern life.
            </p>
            <Button asChild className="mt-8" size="lg">
              <Link href="/products">Explore Collections</Link>
            </Button>
          </MotionDiv>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <MotionDiv
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-8 text-center text-3xl font-bold">
            Featured Collection
          </h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {featuredProducts.map((product, i) => (
               <MotionDiv
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ProductCard product={product} />
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>
      </section>
    </div>
  );
}
