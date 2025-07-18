
import { getProductBySlug, getProducts } from '@/lib/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { AddToCartButton } from '@/components/cart/AddToCartButton';
import { MotionDiv } from '@/components/ui/MotionDiv';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const products = getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return { title: 'Product Not Found' };
  }
  return {
    title: `${product.name} - Aura`,
    description: product.description,
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
        <MotionDiv
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={800}
              height={800}
              className="h-full w-full object-cover object-center"
              priority
            />
          </div>
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          className="flex flex-col justify-center"
        >
          <h1 className="text-3xl font-bold tracking-tight text-primary-text sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-3xl tracking-tight text-primary-text">
            ${product.price.toFixed(2)}
          </p>
          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <p className="space-y-6 text-base text-secondary-text">
              {product.description}
            </p>
          </div>
          <div className="mt-10">
            <h4 className="text-sm font-medium text-primary-text">Category</h4>
            <p className="mt-2 text-sm text-secondary-text">{product.category}</p>
          </div>
          <div className="mt-10">
            <AddToCartButton product={product} />
          </div>
        </MotionDiv>
      </div>
    </div>
  );
}
