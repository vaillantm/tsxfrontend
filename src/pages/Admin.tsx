import { useCart } from '../context/CartContext';
import TopBar from '../components/TopBar';
import MainHeader from '../components/MainHeader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';

const Admin = () => {
  const {
    isOpen: isCartOpen,
    open: handleCartOpen,
    close: handleCartClose,
    items,
    subtotal,
  } = useCart();

  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="font-poppins min-h-screen flex flex-col bg-white">
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

      <main className="flex-grow">
        <div className="max-w-[1200px] mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-4">Admin</h1>
          <p className="text-gray-600">Role-based placeholder page. Protect this route in the future based on user.role === 'admin'.</p>
        </div>
      </main>

      <footer className="flex-none border-t border-gray-100">
        <Footer />
      </footer>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={handleCartClose} 
        items={items} 
      />
    </div>
  );
};

export default Admin;
