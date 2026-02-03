import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react'; // Added for sidebar state

// Components
import TopBar from '../components/TopBar';
import MainHeader from '../components/MainHeader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; // Import Footer
import CartSidebar from '../components/CartSidebar';

const Cart = () => {
  const navigate = useNavigate();
  const { items, subtotal, updateQty, removeItem, clear } = useCart();
  
  // State for the sidebar (if someone clicks the cart icon while on the cart page)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Calculate counts for the MainHeader
  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  
  const handleCartOpen = () => {
    setIsSidebarOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-poppins">
      {/* --- HEADER SECTION --- */}
      <header className="flex-none">
        <TopBar />
        <MainHeader
          cartItemCount={cartItemCount}
          cartTotal={subtotal}
          wishlistCount={0}
          onCartClick={handleCartOpen}
        />
        <Navbar />
      </header>

      {/* --- MAIN CONTENT SECTION --- */}
      {/* flex-grow ensures the footer is pushed to the bottom */}
      <main className="flex-grow max-w-[1200px] w-full mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        
        {items.length === 0 ? (
          <div className="bg-white p-12 rounded shadow-sm text-center border">
            <p className="text-gray-600 mb-6 text-lg">Your cart is empty.</p>
            <button
              onClick={() => navigate('/shop/jewellery')}
              className="bg-blue-600 text-white px-8 py-3 rounded font-bold hover:bg-blue-700 transition-colors uppercase tracking-wider text-sm"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Item List */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded shadow-sm flex gap-4 items-start border">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover border rounded" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-gray-800">{item.name}</div>
                      </div>
                      <button 
                        className="text-gray-400 hover:text-red-500 text-2xl leading-none transition-colors" 
                        onClick={() => removeItem(item.id)}
                      >
                        &times;
                      </button>
                    </div>
                    
                    <div className="flex items-center mt-4 gap-3">
                      <div className="flex items-center border rounded bg-gray-50">
                        <button 
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-200" 
                          onClick={() => updateQty(item.id, Math.max(1, item.quantity - 1))}
                        >
                          -
                        </button>
                        <input 
                          readOnly 
                          className="w-10 h-8 text-center border-x text-sm focus:outline-none bg-transparent" 
                          value={item.quantity} 
                        />
                        <button 
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-200" 
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <div className="ml-auto font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-white p-6 rounded shadow-sm border sticky top-4">
                <h2 className="text-lg font-bold mb-4 border-b pb-2">Order Summary</h2>
                <div className="flex justify-between mb-6 font-bold text-xl text-gray-800">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="space-y-3">
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded transition-colors shadow-sm uppercase tracking-widest text-sm">
                    Checkout Now
                  </button>
                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition-colors uppercase tracking-widest text-sm"
                    onClick={() => navigate('/shop/jewellery')}
                  >
                    Continue Shopping
                  </button>
                  <button
                    className="w-full bg-white border border-gray-200 text-gray-700 font-semibold py-3 rounded transition-colors uppercase tracking-widest text-sm hover:bg-gray-50"
                    onClick={clear}
                  >
                    Clear Cart
                  </button>
                </div>
                <p className="text-[11px] text-gray-400 mt-4 text-center leading-relaxed">
                  Shipping, taxes, and discounts will be calculated during checkout.
                </p>
              </div>
            </aside>
          </div>
        )}
      </main>

      {/* --- FOOTER SECTION --- */}
      <footer className="flex-none">
        <Footer />
      </footer>

      {/* --- OVERLAYS --- */}
      <CartSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        items={items} 
      />
    </div>
  );
};

export default Cart;
