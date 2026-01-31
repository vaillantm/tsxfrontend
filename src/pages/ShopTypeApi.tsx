import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useParams } from 'react-router-dom';

// Components
import TopBar from '../components/TopBar';
import MainHeader from '../components/MainHeader';
import Navbar from '../components/Navbar';
import ProductsByTypeApi from '../components/ProductsByTypeApi';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';

const ShopTypeApi = () => {
  const { items, subtotal } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const handleCartOpen = () => setIsCartOpen(true);
  const handleCartClose = () => setIsCartOpen(false);
  const { type } = useParams<{ type: string }>();

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
          {type ? (
            <ProductsByTypeApi category={type} />
          ) : (
            <div className="text-center text-gray-500">No category specified.</div>
          )}
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

export default ShopTypeApi;
