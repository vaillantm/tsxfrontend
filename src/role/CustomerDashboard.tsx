import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import TopBar from '../components/TopBar';
import MainHeader from '../components/MainHeader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';





const CustomerDashboard: React.FC = () => {
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

    <main className="flex h-screen overflow-hidden">
  <Sidebar userRole={user?.role} />

  <div
    className="flex-1 overflow-y-auto bg-[#f8fafc]"
    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
  >
    <div className="p-10 min-h-screen">
      <Header />

        <div className="animate-fadeIn">
               <Outlet />
             </div>
           </div>
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

export default CustomerDashboard;