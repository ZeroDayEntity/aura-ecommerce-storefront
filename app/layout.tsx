
import type { Metadata } from 'next';
import './global.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { AIAssistant } from '@/components/ai/AIAssistant';

export const metadata: Metadata = {
  title: 'Aura - Effortless Luxury',
  description: 'High-end minimalist goods for the modern connoisseur.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <CartDrawer />
        <AIAssistant />
      </body>
    </html>
  );
}
