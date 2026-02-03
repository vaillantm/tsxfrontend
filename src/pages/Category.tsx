import { useState } from 'react';
import TopBar from '../components/TopBar';
import MainHeader from '../components/MainHeader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
// import CategoryPage from '../components/CategoryPage';
import { useCart } from '../context/CartContext';

const Category = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { items, subtotal } = useCart();
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="font-poppins">
      <TopBar />
      <MainHeader
        cartItemCount={cartItemCount}
        cartTotal={subtotal}
        wishlistCount={0}
        onCartClick={() => setIsCartOpen(true)}
      />
      <Navbar />
      {/* <CategoryPage /> */}
      <Footer />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items}
      />
    </div>
  );
};

export default Category;
