import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import TopBar from '../components/TopBar';
import MainHeader from '../components/MainHeader';
import Navbar from '../components/Navbar';
const Cart = () => {
  const navigate = useNavigate();
  const { items, subtotal, updateQty, removeItem } = useCart();

  // Calculate counts for the MainHeader
  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  
  // Optional: Handle the cart click if you want it to trigger a sidebar or redirect
  const handleCartOpen = () => {
    // Since we are already on the Cart page, you might leave this empty 
    // or use it to scroll to top.
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Global Navigation Section */}
      <TopBar />
      <MainHeader
        cartItemCount={cartItemCount}
        cartTotal={subtotal}
        wishlistCount={0} // Update this if you have a wishlist context
        onCartClick={handleCartOpen}
      />
      <Navbar />

      {/* Main Cart Content */}
      <main className="max-w-[1200px] mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        
        {items.length === 0 ? (
          <div className="bg-white p-8 rounded shadow-sm text-center border">
            <p className="text-gray-600 mb-4">Your cart is empty.</p>
            <button
              onClick={() => navigate('/shop/jewellery')}
              className="bg-blue-600 text-white px-5 py-2 rounded font-semibold hover:bg-blue-700 transition-colors"
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
                        <div className="text-sm text-gray-500">{item.category}</div>
                      </div>
                      <button 
                        className="text-gray-400 hover:text-red-500 text-2xl leading-none" 
                        onClick={() => removeItem(item.id)}
                      >
                        &times;
                      </button>
                    </div>
                    
                    <div className="flex items-center mt-4 gap-3">
                      <div className="flex items-center border rounded">
                        <button 
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100" 
                          onClick={() => updateQty(item.id, Math.max(1, item.quantity - 1))}
                        >
                          -
                        </button>
                        <input 
                          readOnly 
                          className="w-10 h-8 text-center border-x text-sm focus:outline-none" 
                          value={item.quantity} 
                        />
                        <button 
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100" 
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
            <div className="bg-white p-6 rounded shadow-sm h-max border sticky top-4">
              <h2 className="text-lg font-bold mb-4 border-b pb-2">Order Summary</h2>
              <div className="flex justify-between mb-6 font-bold text-xl text-gray-800">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="space-y-3">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded transition-colors shadow-sm">
                  Checkout Now
                </button>
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition-colors"
                  onClick={() => navigate('/shop/jewellery')}
                >
                  Continue Shopping
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-4 text-center">
                Taxes and shipping calculated at checkout
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;