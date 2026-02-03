import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

import AdminDashboard from './AdminDashboard';

const Admino: React.FC = () => {
  const { user } = useAuthContext();
  const { items, subtotal } = useCart(); // Still keep useCart if any logic here depends on it, but the components are removed.
  const [isCartOpen, setIsCartOpen] = useState(false); // Same for useState.

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const handleCartOpen = () => setIsCartOpen(true);
  const handleCartClose = () => setIsCartOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
     <main className="flex-grow">
        <div className="max-w-[1200px] mx-auto px-4 py-12">
          <AdminDashboard />
        </div>
      </main>

      {/* Global Styles & Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Admino;