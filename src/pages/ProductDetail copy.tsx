import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Maximize, Star, Tag, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';

type LocationState = {
  product?: {
    id: number;
    name: string;
    tags: string;
    price: number;
    rating: number;
    img: string;
  };
};

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const state = (location.state || {}) as LocationState;

  const { addItem } = useCart();

  const p = state.product;
  const productId = id ? Number(id) : undefined;

  if (!p) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
        <h2 className="text-2xl font-bold">Product Not Found{productId ? ` (#${productId})` : ''}</h2>
        <p className="text-gray-600">We couldn't load the product details. Please return to the shop and try again.</p>
        <button
          onClick={() => navigate('/shop/jewellery')}
          className="bg-blue-600 text-white px-5 py-2 rounded font-semibold hover:bg-blue-700"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const price = p.price;
  const oldPrice = Math.max(price * 1.3, price + 1); // synthesize an old price for display
  const discount = Math.round(((oldPrice - price) / oldPrice) * 100);

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-6">
        <nav className="text-xs text-gray-400 flex gap-2 mb-8">
          <span className="cursor-pointer hover:text-gray-600" onClick={() => navigate('/')}>Home</span>
          <span>/</span>
          <span className="cursor-pointer hover:text-gray-600" onClick={() => navigate('/shop/jewellery')}>Shop</span>
          <span>/</span>
          <span className="text-gray-800">{p.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-1/2 flex gap-4">
            <div className="flex flex-col gap-4 w-20">
              {Array(4).fill(0).map((_, idx) => (
                <div key={idx} className="border p-2 rounded cursor-pointer opacity-60 hover:opacity-100">
                  <img src={p.img} alt={p.name} className="mix-blend-multiply" />
                </div>
              ))}
            </div>
            <div className="flex-1 bg-gray-50 border rounded-xl flex items-center justify-center p-12 relative">
              <img src={p.img} alt={p.name} className="mix-blend-multiply max-w-full h-auto" />
              <button className="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow-md">
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{p.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-green-600 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
                {p.rating.toFixed(1)}
                <Star className="w-3 h-3 fill-current" />
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              {[
                ['307', 'Days'],
                ['12', 'Hrs'],
                ['56', 'Mins'],
                ['20', 'Secs'],
              ].map((t) => (
                <div key={t[1]} className="text-center border px-4 py-2 rounded">
                  <div className="text-blue-600 font-bold text-xl">{t[0]}</div>
                  <div className="text-[10px] uppercase text-gray-400 font-bold">{t[1]}</div>
                </div>
              ))}
            </div>

            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-3xl font-bold">${price.toFixed(2)}</span>
              <span className="text-gray-400 line-through">${oldPrice.toFixed(2)}</span>
              <span className="text-green-600 font-bold text-sm">{discount}% Off</span>
            </div>
            <p className="text-green-600 text-xs font-bold mb-6">In Stock</p>

            <div className="space-y-3 mb-8 border-t border-b py-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Tag className="w-4 h-4 text-green-600" />
                Bank Offer 10% instant discount on VISA Cards <a href="#" className="text-blue-600 font-bold">T&C</a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Tag className="w-4 h-4 text-green-600" />
                Special Price Get extra 20% off <a href="#" className="text-blue-600 font-bold">T&C</a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CreditCard className="w-4 h-4 text-green-600" />
                No cost EMI $9/month. <a href="#" className="text-blue-600 font-bold">View Plans</a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
              <div>
                <h4 className="font-bold mb-3 uppercase tracking-tighter text-gray-400">Services:</h4>
                <ul className="space-y-1 list-disc pl-4 text-gray-600">
                  <li>30 Day Return Policy</li>
                  <li>Cash on Delivery available</li>
                  <li>Free Delivery</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-3 uppercase tracking-tighter text-gray-400">Highlights:</h4>
                <ul className="space-y-1 list-disc pl-4 text-gray-600">
                  <li>Adjustable strap/bracelet.</li>
                  <li>Premium finish.</li>
                  <li>High quality materials.</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex border rounded overflow-hidden">
                <button className="px-4 py-2 hover:bg-gray-100 border-r">-</button>
                <input type="text" defaultValue={1} className="w-12 text-center text-sm focus:outline-none" />
                <button className="px-4 py-2 hover:bg-gray-100 border-l">+</button>
              </div>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded flex-1 uppercase tracking-widest text-sm"
                onClick={() => {
                  addItem({
                    id: p.id,
                    name: p.name,
                    category: p.tags,
                    price: p.price,
                    rating: p.rating,
                    reviews: 0,
                    image: p.img,
                  }, 1);
                }}
              >
                Add To Cart
              </button>
              <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded flex-1 uppercase tracking-widest text-sm">Buy Now</button>
            </div>

            <div className="border rounded-lg p-6 bg-gray-50 text-center">
              <p className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider italic">Guaranteed Safe Checkout</p>
              <div className="flex justify-center flex-wrap gap-4 opacity-70">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" className="h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
