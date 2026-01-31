import { useState } from 'react';
import { ChevronDown, ChevronRight, LayoutGrid, List, Star } from 'lucide-react';

interface SubCategory {
  name: string;
  tag: string;
}

interface Product {
  id: number;
  name: string;
  tags: string;
  price: number;
  rating: number;
  img: string;
}

interface CategoryData {
  title: string;
  sub: SubCategory[];
  products: Product[];
}

interface ShopData {
  [key: string]: CategoryData;
}

const shopData: ShopData = {
  men: {
    title: "Men",
    sub: [
      { name: "Shirts", tag: "SHIRTS" },
      { name: "Jackets", tag: "JACKETS" }
    ],
    products: [
      { id: 12, name: "Classic White Linen Shirt", tags: "SHIRTS", price: 55.0, rating: 5, img: "https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?w=400" },
      { id: 13, name: "Canvas Field Jacket", tags: "JACKETS", price: 120.0, rating: 4, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400" }
    ]
  },
  women: {
    title: "Women",
    sub: [
      { name: "Knitwear", tag: "KNITWEAR" },
      { name: "Trousers", tag: "TROUSERS" }
    ],
    products: [
      { id: 14, name: "Beige Oversized Sweater", tags: "KNITWEAR", price: 75.0, rating: 5, img: "https://images.unsplash.com/photo-1574167132757-1447ae94473d?w=400" },
      { id: 15, name: "High-Waist Tailored Pants", tags: "TROUSERS", price: 90.0, rating: 4, img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400" }
    ]
  },
  shoes: {
    title: "Shoes",
    sub: [
      { name: "Sneakers", tag: "SNEAKERS" },
      { name: "Formal Shoes", tag: "FORMAL" }
    ],
    products: [
      { id: 6, name: "Blue Mid-Top Sneakers", tags: "SNEAKERS", price: 45.0, rating: 5, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
      { id: 7, name: "Brown Leather Brogues", tags: "FORMAL", price: 150.0, rating: 4, img: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400" }
    ]
  },
  bags: {
    title: "Bags & Backpack",
    sub: [
      { name: "Backpacks", tag: "BACKPACK" },
      { name: "Handbags", tag: "HANDBAG" }
    ],
    products: [
      { id: 8, name: "Urban Explorer Backpack", tags: "BACKPACK", price: 65.0, rating: 5, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
      { id: 9, name: "Leather Tote Bag", tags: "HANDBAG", price: 120.0, rating: 4, img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400" }
    ]
  },
  watches: {
    title: "Watches",
    sub: [
      { name: "Classic", tag: "CLASSIC" },
      { name: "Digital", tag: "DIGITAL" }
    ],
    products: [
      { id: 16, name: "Silver Minimalist Watch", tags: "CLASSIC", price: 185.0, rating: 5, img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400" },
      { id: 17, name: "Black Smart Watch", tags: "DIGITAL", price: 210.0, rating: 4, img: "https://images.unsplash.com/photo-1508685096489-7aac29625a6b?w=400" }
    ]
  },
  jewellery: {
    title: "Jewellery",
    sub: [
      { name: "Earrings", tag: "EARRINGS" },
      { name: "Necklaces", tag: "NECKLACES" }
    ],
    products: [
      { id: 1, name: "Gold Peacock Earrings", tags: "EARRINGS", price: 48.0, rating: 3, img: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=400" },
      { id: 4, name: "Traditional Necklace", tags: "NECKLACES", price: 115.0, rating: 2, img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400" }
    ]
  },
  accessories: {
    title: "Accessories",
    sub: [
      { name: "Sunglasses", tag: "SUNGLASSES" },
      { name: "Belts", tag: "BELTS" }
    ],
    products: [
      { id: 18, name: "Aviator Sunglasses", tags: "SUNGLASSES", price: 130.0, rating: 5, img: "https://images.unsplash.com/photo-1511499767350-a1590fdb2ca8?w=400" },
      { id: 19, name: "Tan Leather Belt", tags: "BELTS", price: 40.0, rating: 4, img: "https://images.unsplash.com/photo-1624222247344-550fb8ecfbd4?w=400" }
    ]
  },
  dresses: {
    title: "Dresses",
    sub: [
      { name: "Summer", tag: "SUMMER" },
      { name: "Evening", tag: "EVENING" }
    ],
    products: [
      { id: 20, name: "Floral Wrap Dress", tags: "SUMMER", price: 68.0, rating: 5, img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400" },
      { id: 21, name: "Satin Slip Dress", tags: "EVENING", price: 110.0, rating: 4, img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400" }
    ]
  },
  tops: {
    title: "Tops",
    sub: [
      { name: "Blouses", tag: "BLOUSES" },
      { name: "T-Shirts", tag: "TSHIRTS" }
    ],
    products: [
      { id: 22, name: "Silk Button-Up Blouse", tags: "BLOUSES", price: 85.0, rating: 4, img: "https://images.unsplash.com/photo-1564859228273-274232fdb516?w=400" },
      { id: 23, name: "Organic Cotton Tee", tags: "TSHIRTS", price: 25.0, rating: 5, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" }
    ]
  },
  lingerie: {
    title: "Lingerie",
    sub: [
      { name: "Sets", tag: "SETS" },
      { name: "Robes", tag: "ROBES" }
    ],
    products: [
      { id: 24, name: "Lace Intimates Set", tags: "SETS", price: 65.0, rating: 5, img: "https://images.unsplash.com/photo-1516575334481-f8528e94667d?w=400" },
      { id: 25, name: "Silk Satin Robe", tags: "ROBES", price: 95.0, rating: 4, img: "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?w=400" }
    ]
  }
};

const Products = () => {
  const [currentMain, setCurrentMain] = useState<string>('jewellery');
  const [currentSub, setCurrentSub] = useState<string | null>(null);

  const data = shopData[currentMain];
  const filteredProducts = currentSub 
    ? data.products.filter(p => p.tags.includes(currentSub)) 
    : data.products;

  const breadcrumbText = currentSub 
    ? `${data.title} / ${currentSub}` 
    : data.title;

  const switchMain = (key: string) => {
    setCurrentMain(key);
    setCurrentSub(null);
  };

  const switchSub = (tag: string | null) => {
    setCurrentSub(tag);
  };

  return (
    <div className="bg-white min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      <header className="py-12 bg-gray-50 border-b">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
          <nav className="text-xs uppercase tracking-widest text-gray-400 font-medium flex justify-center">
            <span className="after:content-['/'] after:mx-2 after:text-gray-400">Home</span>
            <span className="after:content-['/'] after:mx-2 after:text-gray-400">Shop</span>
            <span className="text-gray-800">{breadcrumbText}</span>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="mb-10">
            <h3 className="text-sm font-bold border-b-2 border-blue-600 pb-2 mb-4 flex justify-between items-center uppercase tracking-wider">
              Product Categories 
              <ChevronDown className="w-4 h-4" />
            </h3>
            <ul className="text-sm text-gray-600 space-y-4">
              {Object.keys(shopData).map(key => (
                <li key={key}>
                  <div 
                    onClick={() => switchMain(key)}
                    className={`flex justify-between items-center cursor-pointer hover:text-blue-600 capitalize ${
                      currentMain === key 
                        ? 'text-blue-600 font-bold border-l-2 border-blue-600 pl-2 -ml-2.5' 
                        : ''
                    }`}
                  >
                    {key} ({shopData[key].products.length})
                    {currentMain === key ? (
                      <ChevronDown className="w-3 h-3" />
                    ) : (
                      <ChevronRight className="w-3 h-3" />
                    )}
                  </div>
                  {currentMain === key && (
                    <ul className="pl-4 mt-3 space-y-2 text-gray-500 font-normal border-l ml-1">
                      <li 
                        onClick={() => switchSub(null)}
                        className={`cursor-pointer hover:text-blue-600 ${
                          !currentSub ? 'text-blue-600 font-bold' : ''
                        }`}
                      >
                        All {key}
                      </li>
                      {data.sub.map(s => (
                        <li 
                          key={s.tag}
                          onClick={() => switchSub(s.tag)}
                          className={`cursor-pointer hover:text-blue-600 ${
                            currentSub === s.tag ? 'text-blue-600 font-bold' : ''
                          }`}
                        >
                          {s.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="flex-1">
          <div className="flex justify-between items-center mb-10 text-xs font-semibold border-b pb-4 text-gray-500 uppercase">
            <span>Showing all {filteredProducts.length} Products</span>
            <div className="flex items-center gap-6">
              <LayoutGrid className="w-4 h-4 text-blue-600" />
              <List className="w-4 h-4" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
            {filteredProducts.map(product => (
              <div key={product.id} className="group">
                <div className="bg-gray-50 aspect-square flex items-center justify-center p-8 mb-4 relative overflow-hidden rounded-md border border-gray-100">
                  <img 
                    src={product.img} 
                    alt={product.name}
                    className="mix-blend-multiply group-hover:scale-110 transition-transform duration-500 max-h-full"
                  />
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">
                    {product.tags}
                  </p>
                  <h4 className="text-sm font-medium mb-1">{product.name}</h4>
                  <div className="flex justify-center text-yellow-400 mb-1">
                    {Array(5).fill(0).map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-3 h-3 ${
                          i < product.rating 
                            ? 'fill-current text-yellow-400' 
                            : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Products;