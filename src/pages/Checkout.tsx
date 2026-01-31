import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import TopBar from '../components/TopBar';
import MainHeader from '../components/MainHeader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, subtotal } = useCart();
  const shipping = items.length > 0 ? 5 : 0;
  const total = subtotal + shipping;

  const cartItemCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="font-poppins min-h-screen flex flex-col bg-white">
      <header>
        <TopBar />
        <MainHeader
          cartItemCount={cartItemCount}
          cartTotal={subtotal}
          wishlistCount={0}
          onCartClick={() => navigate('/cart')}
        />
        <Navbar />
      </header>

      <main className="flex-1">
        <div className="max-w-[1200px] mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Billing details */}
          <section className="lg:col-span-2 bg-white p-6 border rounded">
            <h2 className="text-xl font-semibold mb-4">Billing details</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold">First name *</label>
                <input className="w-full border px-3 py-2 mt-1" />
              </div>
              <div>
                <label className="text-sm font-semibold">Last name *</label>
                <input className="w-full border px-3 py-2 mt-1" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-semibold">Company name (optional)</label>
                <input className="w-full border px-3 py-2 mt-1" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-semibold">Country / Region *</label>
                <select className="w-full border px-3 py-2 mt-1">
                  <option>United States (US)</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-semibold">Street address *</label>
                <input placeholder="House number and street name" className="w-full border px-3 py-2 mt-1" />
                <input placeholder="Apartment, suite, unit, etc. (optional)" className="w-full border px-3 py-2 mt-2" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-semibold">Town / City *</label>
                <input className="w-full border px-3 py-2 mt-1" />
              </div>
              <div>
                <label className="text-sm font-semibold">State *</label>
                <select className="w-full border px-3 py-2 mt-1">
                  <option>California</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold">ZIP Code *</label>
                <input className="w-full border px-3 py-2 mt-1" />
              </div>
              <div>
                <label className="text-sm font-semibold">Phone *</label>
                <input className="w-full border px-3 py-2 mt-1" />
              </div>
              <div>
                <label className="text-sm font-semibold">Email address *</label>
                <input className="w-full border px-3 py-2 mt-1" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-semibold">Order notes (optional)</label>
                <textarea className="w-full border px-3 py-2 mt-1" rows={4} placeholder="Notes about your order, e.g. special notes for delivery." />
              </div>
            </form>
          </section>

          {/* Order Summary */}
          <aside className="bg-white p-6 border rounded h-max">
            <h3 className="text-lg font-semibold mb-4">Your order</h3>
            <div className="divide-y">
              {items.map((item) => (
                <div key={item.id} className="py-4 flex items-start gap-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover border" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-800">{item.name} × {item.quantity}</div>
                  </div>
                  <div className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Flat rate: ${shipping.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-600 border-t pt-4">
              Sorry, it seems that there are no available payment methods. Please contact us if you require assistance or wish to make alternate arrangements.
            </div>

            <button className="mt-4 w-full bg-orange-500 text-white font-bold py-3 rounded">PLACE ORDER</button>
          </aside>
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Checkout;
