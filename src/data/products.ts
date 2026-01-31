import type { Product } from '../models/product';

export const mockProducts: Product[] = [
  { id: 1, name: 'Gold Peacock Earrings', tags: 'EARRINGS', price: 48, rating: 3, img: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=400' },
  { id: 6, name: 'Blue Mid-Top Sneakers', tags: 'SNEAKERS', price: 45, rating: 5, img: 'https://res.cloudinary.com/dl4biwzn8/image/upload/v1769517444/Men-Blue-Colourblocked-Mid-Top-Sneakers_c19yos.jpg' },
  { id: 12, name: 'Classic White Linen Shirt', tags: 'SHIRTS', price: 55, rating: 5, img: 'https://res.cloudinary.com/dl4biwzn8/image/upload/v1769517259/classic-tshirt-mockup_85212-2025_yuxd0v.jpg' },
];
