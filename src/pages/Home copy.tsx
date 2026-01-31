import { useState } from 'react';

// Components
import TopBar from '../components/TopBar';
import MainHeader from '../components/MainHeader';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
// import Products from '../components/Products';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';

// Types
import { CartItem } from '../types';

const Home = () => {
  // State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems] = useState<CartItem[]>([]);

  // Computed values
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 
    0
  );
  const cartItemCount = cartItems.reduce(
    (sum, item) => sum + item.quantity, 
    0
  );

  // Handlers
  const handleCartOpen = () => setIsCartOpen(true);
  const handleCartClose = () => setIsCartOpen(false);

  return (
    <div className="font-poppins">
 
      <TopBar />
      <MainHeader
        cartItemCount={cartItemCount}
        cartTotal={cartTotal}
        wishlistCount={0}
        onCartClick={handleCartOpen}
      />
      <Navbar />
      <HeroSection />

      <main>
        <section className="my-12">
          <FeaturedProducts />
        </section>

        {/* <section className="my-12">
          <Products />
        </section> */}
      </main>


      <Footer />
      
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={handleCartClose} 
        items={cartItems} 
      />
    </div>
  );
};

export default Home;