
import { Product } from './types';

const products: Product[] = [
  {
    id: '1',
    name: 'Aura Leather Wallet',
    slug: 'aura-leather-wallet',
    price: 120.0,
    description:
      'A timeless bifold wallet crafted from full-grain Italian leather. Designed to develop a rich patina over time, it features six card slots and a full-length bill compartment. The essence of minimalist elegance.',
    category: 'Leather Goods',
    imageUrl:
      'https://images.unsplash.com/photo-1620625515032-6ed0a1740634?q=80&w=2940&auto=format&fit=crop',
    featured: true,
  },
  {
    id: '2',
    name: 'Aura Laptop Sleeve',
    slug: 'aura-laptop-sleeve',
    price: 95.0,
    description:
      'Protect your device in style with our minimalist laptop sleeve. Made from durable, water-resistant canvas with a soft, padded interior. Fits most 13-inch and 14-inch laptops. Its dimensions are 13.5 x 9.5 inches.',
    category: 'Tech Accessories',
    imageUrl:
      'https://images.unsplash.com/photo-1587280501635-397de3910542?q=80&w=2942&auto=format&fit=crop',
    featured: true,
  },
  {
    id: '3',
    name: 'Titanium Key Organizer',
    slug: 'titanium-key-organizer',
    price: 75.0,
    description:
      'A sleek and silent key organizer forged from grade 5 titanium. Eliminates key jingle and protects your pockets. Holds up to 7 keys and includes a loop for your car fob.',
    category: 'Accessories',
    imageUrl:
      'https://images.unsplash.com/photo-1619149651249-a114f4aa7c5c?q=80&w=2940&auto=format&fit=crop',
    featured: true,
  },
  {
    id: '4',
    name: 'Minimalist Ballpoint Pen',
    slug: 'minimalist-ballpoint-pen',
    price: 60.0,
    description:
      'A perfectly weighted and balanced pen, precision-machined from a single block of aluminum. Its satisfying twist mechanism and smooth German ink refill make writing a pleasure.',
    category: 'Stationery',
    imageUrl:
      'https://images.unsplash.com/photo-1606805728135-6490356543fc?q=80&w=2864&auto=format&fit=crop',
  },
   {
    id: '5',
    name: 'Canvas Tech Dopp Kit',
    slug: 'canvas-tech-dopp-kit',
    price: 85.0,
    description:
      'Organize your chargers, cables, and tech essentials in this structured dopp kit. Made from rugged waxed canvas with leather accents and smart elastic loops inside.',
    category: 'Tech Accessories',
    imageUrl:
      'https://images.unsplash.com/photo-1621495094263-a20786f5641c?q=80&w=2940&auto=format&fit=crop',
  },
  {
    id: '6',
    name: 'Leather Card Holder',
    slug: 'leather-card-holder',
    price: 65.0,
    description:
      'For the true minimalist. A slim card holder made from the same premium Italian leather as our wallet. Features two slots for your most essential cards and a central pocket for folded cash.',
    category: 'Leather Goods',
    imageUrl:
      'https://images.unsplash.com/photo-1615220839958-942dd13453df?q=80&w=2940&auto=format&fit=crop',
  },
];

export function getProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
