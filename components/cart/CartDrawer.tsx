
'use client';

import { useCartStore } from '@/lib/store';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    items,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
  } = useCartStore();

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50"
          onClick={closeCart}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-lg"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b p-6">
                <h2 className="text-lg font-medium">Shopping Cart</h2>
                <button
                  onClick={closeCart}
                  className="rounded-full p-2 transition-colors hover:bg-gray-100"
                  aria-label="Close cart"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {items.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center">
                  <p className="text-secondary-text">Your cart is empty.</p>
                  <Button asChild variant="outline" className="mt-4" onClick={closeCart}>
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto p-6">
                    <ul className="-my-6 divide-y divide-border">
                      {items.map((item) => (
                        <li key={item.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border">
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              width={96}
                              height={96}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium">
                                <h3>
                                  <Link href={`/products/${item.slug}`}>{item.name}</Link>
                                </h3>
                                <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="flex items-center border border-border rounded-md">
                                <button onClick={() => decrementQuantity(item.id)} className="px-2 py-1 disabled:opacity-50" disabled={item.quantity <= 1}><Minus size={16} /></button>
                                <p className="w-8 text-center">{item.quantity}</p>
                                <button onClick={() => incrementQuantity(item.id)} className="px-2 py-1"><Plus size={16} /></button>
                              </div>
                              <div className="flex">
                                <button
                                  type="button"
                                  onClick={() => removeFromCart(item.id)}
                                  className="font-medium text-accent hover:text-accent/90"
                                >
                                  <Trash2 size={20} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-border p-6">
                    <div className="flex justify-between text-base font-medium">
                      <p>Subtotal</p>
                      <p>${subtotal.toFixed(2)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-secondary-text">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      <Button size="lg" className="w-full">
                        Checkout
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
