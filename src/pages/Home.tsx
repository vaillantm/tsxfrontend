import { useState } from 'react';
import { useCart } from '../context/CartContext';

// Layout Components
import TopBar from '../components/TopBar';
import MainHeader from '../components/MainHeader';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';

const Home = () => {

  const { items, subtotal } = useCart();

  
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-white font-poppins">
      {/* --- HEADER SECTION --- */}
      <header className="flex-none">
        <TopBar />
        <MainHeader
          cartItemCount={cartItemCount}
          cartTotal={subtotal}
          wishlistCount={0}
          onCartClick={() => setIsCartOpen(true)} // Opens the sidebar logic
        />
        <Navbar />
      </header>

       <HeroSection />
      <div className="my-12" />

      {/* --- MAIN CONTENT SECTION --- */}
      <main className="flex-grow">
      
        <section className="my-12">
          <div className="max-w-[1200px] mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center lg:text-left">
            Categories
            </h2>
            <FeaturedProducts />
          </div>
        </section>
      
      </main>
         


      {/* --- FOOTER --- */}
      <footer className="flex-none">
        <Footer />
      </footer>

      
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={items} 
      />
    </div>
  );
};

export default Home;