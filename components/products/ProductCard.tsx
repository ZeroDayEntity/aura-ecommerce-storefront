
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { type Product } from '@/lib/types';
import { motion } from 'framer-motion';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 8px 20px rgb(0 0 0 / 0.1)' }}
      transition={{ duration: 0.2 }}
      className="group relative"
    >
      <Link href={`/products/${product.slug}`}>
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={400}
            className="h-full w-full object-cover object-center transition-transform group-hover:scale-105"
          />
        </div>
        <div className="mt-4 flex justify-between">
  <div>
    <h3 className="text-sm text-foreground font-medium">
      <span aria-hidden="true" className="absolute inset-0" />
      {product.name}
    </h3>
    <p className="mt-1 text-sm text-muted-foreground">
      {product.category}
    </p>
  </div>
  <p className="text-sm font-medium text-foreground">
    ${product.price.toFixed(2)}
  </p>
</div>
      </Link>
    </motion.div>
  );
}
