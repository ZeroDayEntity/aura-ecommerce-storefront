
'use client';
import { useState } from 'react';
import { useCartStore } from '@/lib/store';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Check } from 'lucide-react';

type AddToCartButtonProps = {
  product: Product;
};

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart, openCart } = useCartStore();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
    setIsAdded(true);
    setTimeout(() => {
        openCart();
        setIsAdded(false);
    }, 1000);
  };

  return (
    <Button
      onClick={handleAddToCart}
      size="lg"
      className="w-full"
      disabled={isAdded}
    >
      {isAdded ? (
        <>
          <Check className="mr-2 h-5 w-5" /> Added!
        </>
      ) : (
        'Add to Cart'
      )}
    </Button>
  );
}
