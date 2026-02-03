import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Maximize, Tag, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProduct } from '../hooks/useProducts';
import type { Product } from '../models/product';

// Layout Components
import TopBar from '../components/TopBar';
import MainHeader from '../components/MainHeader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';

type LocationState = {
  product?: Product;
};

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const state = (location.state || {}) as LocationState;

  // Global Cart Logic
  const { addItem, items, subtotal } = useCart();
  
  // UI States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const pFromState = state.product;
  const { data: pFromApi, isLoading } = useProduct(id || '');
  const p = pFromState || pFromApi;

  // Derived Values for Header
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (!p && isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading product...
      </div>
    );
  }

  if (!p) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
        <h2 className="text-2xl font-bold">Product Not Found</h2>
        <p className="text-gray-600">We couldn't load the product details. Please return to the shop.</p>
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
  const oldPrice = Math.max(price * 1.3, price + 1);
  const discount = Math.round(((oldPrice - price) / oldPrice) * 100);
  const primaryImage = p.images?.[0] || 'https://via.placeholder.com/600x600?text=No+Image';

  return (
    <div className="min-h-screen flex flex-col bg-white font-poppins">
      {/* --- HEADER SECTION --- */}
      <TopBar />
      <MainHeader
        cartItemCount={cartItemCount}
        cartTotal={subtotal}
        wishlistCount={0}
        onCartClick={() => setIsCartOpen(true)}
      />
      <Navbar />

      {/* --- PRODUCT CONTENT --- */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <nav className="text-xs text-gray-400 flex gap-2 mb-8">
            <span className="cursor-pointer hover:text-gray-600" onClick={() => navigate('/')}>Home</span>
            <span>/</span>
            <span className="cursor-pointer hover:text-gray-600" onClick={() => navigate('/shop/jewellery')}>Shop</span>
            <span>/</span>
            <span className="text-gray-800">{p.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Image Gallery */}
            <div className="w-full lg:w-1/2 flex gap-4">
              <div className="hidden md:flex flex-col gap-4 w-20">
                {Array(4).fill(0).map((_, idx) => (
                  <div key={idx} className="border p-2 rounded cursor-pointer opacity-60 hover:opacity-100">
                    <img src={primaryImage} alt={p.name} className="mix-blend-multiply" />
                  </div>
                ))}
              </div>
              <div className="flex-1 bg-gray-50 border rounded-xl flex items-center justify-center p-8 md:p-12 relative">
                <img src={primaryImage} alt={p.name} className="mix-blend-multiply max-w-full h-auto" />
                <button className="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow-md">
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="w-full lg:w-1/2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{p.name}</h1>

              {/* Countdown */}
              <div className="flex gap-3 mb-6">
                {[['307', 'Days'], ['12', 'Hrs'], ['56', 'Mins'], ['20', 'Secs']].map((t) => (
                  <div key={t[1]} className="text-center border px-3 py-2 rounded bg-gray-50">
                    <div className="text-blue-600 font-bold text-lg leading-tight">{t[0]}</div>
                    <div className="text-[9px] uppercase text-gray-400 font-bold">{t[1]}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-3xl font-bold">${price.toFixed(2)}</span>
                <span className="text-gray-400 line-through">${oldPrice.toFixed(2)}</span>
                <span className="text-green-600 font-bold text-sm">{discount}% Off</span>
              </div>
              <p className="text-green-600 text-xs font-bold mb-6 italic">● In Stock - Ready to ship</p>

              {/* Offers */}
              <div className="space-y-3 mb-8 border-t border-b py-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Tag className="w-4 h-4 text-green-600" />
                  <span>Bank Offer 10% instant discount on VISA Cards</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CreditCard className="w-4 h-4 text-green-600" />
                  <span>No cost EMI starts at $9/month.</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                <div className="flex border rounded h-12 overflow-hidden w-full sm:w-auto">
                  <button 
                    className="px-4 hover:bg-gray-100 border-r"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  >-</button>
                  <input 
                    type="text" 
                    value={quantity} 
                    readOnly
                    className="w-12 text-center text-sm focus:outline-none bg-white" 
                  />
                  <button 
                    className="px-4 hover:bg-gray-100 border-l"
                    onClick={() => setQuantity(q => q + 1)}
                  >+</button>
                </div>
                
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 px-8 rounded flex-1 uppercase tracking-widest text-sm transition-colors"
                  onClick={() => {
                    addItem({
                      id: p._id,
                      name: p.name,
                      price: p.price,
                      image: primaryImage,
                    }, quantity);
                    setIsCartOpen(true); // Open sidebar to show success
                  }}
                >
                  Add To Cart
                </button>
                
                <button className="bg-gray-900 hover:bg-black text-white font-bold h-12 px-8 rounded flex-1 uppercase tracking-widest text-sm transition-colors">
                  Buy Now
                </button>
              </div>

              {/* Trust Badge */}
              <div className="border rounded-lg p-6 bg-gray-50 text-center">
                <p className="text-[10px] font-bold text-gray-400 mb-4 uppercase tracking-widest">Guaranteed Safe Checkout</p>
                <div className="flex justify-center items-center flex-wrap gap-6 opacity-60 grayscale hover:grayscale-0 transition-all">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" className="h-3" alt="Visa" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" className="h-5" alt="Mastercard" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" className="h-4" alt="Paypal" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <Footer />

      {/* --- SIDEBAR --- */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={items} 
      />
    </div>
  );
};

export default ProductDetail;
