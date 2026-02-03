import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

// Shop UI Components
import TopBar from '../components/TopBar';
import MainHeader from '../components/MainHeader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';

const VendorDashboard: React.FC = () => {
  const { user } = useAuthContext();
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
      {/* 1. Shop Header Section */}
      <header className="flex-none z-50 bg-white">
        <TopBar />
        <MainHeader
          cartItemCount={cartItemCount}
          cartTotal={subtotal}
          wishlistCount={0}
          onCartClick={handleCartOpen}
        />
        <Navbar />
      </header>

      {/* 2. Main Layout with Sidebar and Content */}
      <main className="flex flex-1 items-start bg-[#f8fafc]">
        {/* Sidebar Container - Sticky so it stays pinned while content scrolls */}
        <div className="flex-none hidden lg:block border-r border-slate-200 bg-white">
          <Sidebar userRole={user?.role} />
        </div>

        {/* Scrollable Content Area */}
        <div 
          className="flex-1 min-h-screen p-10" 
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          <Header />
          
          <div className="animate-fadeIn mt-6">
            <Outlet />
          </div>
        </div>
      </main>

      {/* 3. Footer Section */}
      <footer className="flex-none border-t border-gray-100 bg-white">
        <Footer />
      </footer>

      {/* 4. Overlays */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={handleCartClose} 
        items={items} 
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default VendorDashboard;