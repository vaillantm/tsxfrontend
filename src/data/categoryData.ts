import { CategoryDataMap } from '../types';

export const categoryData: CategoryDataMap = {
  'hats-caps': {
    title: 'Hats & Caps',
    breadcrumb: 'Home / Shop / Accessories / Hats & Caps',
    products: [
      {
        id: 101,
        name: 'Blue Solid Baseball Cap',
        category: 'HATS & CAPS',
        price: 12.0,
        rating: 2,
        reviews: 1,
        image: '/images/levis-cap.png',
      },
    ],
  },
  'beauty-care': {
    title: 'Beauty & Care',
    breadcrumb: 'Home / Shop / Beauty & Care',
    products: [
      {
        id: 201,
        name: 'Green & Off-White Gold-Plated Peacock Earrings',
        category: 'ANKLETS, BEAUTY ACCESSORY, EARRINGS',
        price: 48.0,
        rating: 3,
        reviews: 2,
        image: '/images/earrings.png',
      },
      {
        id: 202,
        name: 'Turquoise Blue Metal Elasticated Bracelet',
        category: 'BRACELETS, MAKEUP KIT, PEARL JEWELRY',
        price: 88.0,
        rating: 5,
        reviews: 1,
        image: '/images/bracelet.png',
      },
    ],
  },
};
