
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-bold">Aura</h3>
            <p className="mt-2 text-sm text-secondary-text">
              Effortless Luxury. Curated for modern living.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div>
              <h4 className="font-semibold">Shop</h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/products" className="text-sm text-secondary-text hover:text-primary-text">Collections</Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-secondary-text hover:text-primary-text">New Arrivals</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">About</h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-sm text-secondary-text hover:text-primary-text">Our Story</Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-secondary-text hover:text-primary-text">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-secondary-text">
          <p>&copy; {currentYear} Aura. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
