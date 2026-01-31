import { useState } from 'react';
import TopBar from '../components/TopBar';
import MainHeader from '../components/MainHeader';
import Navbar from '../components/Navbar';
import CategoryPage from '../components/CategoryPage';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import { CartItem } from '../types';

const Category = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems] = useState<CartItem[]>([]);

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="font-poppins">
      <TopBar />
      <MainHeader
        cartItemCount={cartItemCount}
        cartTotal={cartTotal}
        wishlistCount={0}
        onCartClick={() => setIsCartOpen(true)}
      />
      <Navbar />
      <CategoryPage />
      <Footer />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cartItems} />
    </div>
  );
};

export default Category;
