import { useState } from 'react';
import { useCart } from '../context/CartContext';

// Components
import TopBar from '../components/TopBar';
import MainHeader from '../components/MainHeader';
import Navbar from '../components/Navbar';
import Products from '../components/Products';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';


const Shop = () => {
  // 1. Extract global state and functions from CartContext
  const { items, subtotal } = useCart();

  // 2. Local UI state for the Cart Sidebar toggle
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 3. Derived values for the Header indicators
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // 4. Interaction Handlers
  const handleCartOpen = () => setIsCartOpen(true);
  const handleCartClose = () => setIsCartOpen(false);

  return (
    <div className="font-poppins min-h-screen flex flex-col bg-white">
      {/* --- HEADER SECTION --- */}
      <header className="flex-none">
        <TopBar />
        <MainHeader
          cartItemCount={cartItemCount}
          cartTotal={subtotal}
          wishlistCount={0} // Replace with WishlistContext if available
          onCartClick={handleCartOpen}
        />
        <Navbar />
      </header>
      {/* ----------------------- */}

      {/* --- MAIN CONTENT SECTION --- */}
      {/* flex-grow ensures the footer stays at the bottom on empty/short pages */}
      <main className="flex-grow">
        <div className="max-w-[1200px] mx-auto px-4 py-12">
          {/* The Products component usually handles fetching data 
            based on the URL params (e.g., /shop/jewellery) 
          */}
          <Products />
        </div>
      </main>
      {/* ----------------------- */}

      {/* --- FOOTER SECTION --- */}
      <footer className="flex-none border-t border-gray-100">
        <Footer />
      </footer>
      {/* ----------------------- */}

    
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={handleCartClose} 
        items={items} 
      />
    </div>
  );
};

export default Shop;