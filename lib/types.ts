
export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
