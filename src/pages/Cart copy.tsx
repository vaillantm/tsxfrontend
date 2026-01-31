import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { items, subtotal, updateQty, removeItem } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[900px] mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        {items.length === 0 ? (
          <div className="bg-white p-8 rounded shadow-sm text-center">
            <p className="text-gray-600 mb-4">Your cart is empty.</p>
            <button
              onClick={() => navigate('/shop/jewellery')}
              className="bg-blue-600 text-white px-5 py-2 rounded font-semibold hover:bg-blue-700"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded shadow-sm flex gap-4 items-start">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover border" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-gray-800">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.category}</div>
                      </div>
                      <button className="text-gray-400 text-xl" onClick={() => removeItem(item.id)}>&times;</button>
                    </div>
                    <div className="flex items-center mt-3 gap-3">
                      <div className="flex">
                        <button className="w-8 h-8 border text-gray-600" onClick={() => updateQty(item.id, item.quantity - 1)}>-</button>
                        <input readOnly className="w-10 h-8 border-y text-center" value={item.quantity} />
                        <button className="w-8 h-8 border text-gray-600" onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <div className="ml-auto font-semibold text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white p-6 rounded shadow-sm h-max">
              <div className="flex justify-between mb-4 font-semibold">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button className="w-full bg-orange-500 text-white font-bold py-3 rounded mb-2">Checkout</button>
              <button
                className="w-full bg-blue-600 text-white font-bold py-3 rounded"
                onClick={() => navigate('/shop/jewellery')}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
