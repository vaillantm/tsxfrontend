import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { 
  LuLayoutDashboard, 
  LuPackage, 
  LuLayers, 
  LuShoppingBag, 
  LuLogOut 
} from "react-icons/lu";

export type Section =
  | 'dashboard'
  | 'products'
  | 'categories'
  | 'order-status'
  | 'users'; // Added 'users'

interface SidebarProps {
  activeSection: Section;
  onNavigate: React.Dispatch<React.SetStateAction<Section>>; // Updated type
  userRole?: 'admin' | 'vendor' | 'customer';
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onNavigate, userRole }) => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();

  const allNavItems: { id: Section; icon: React.ReactNode; label: string; roles: string[] }[] = [
    {
      id: 'dashboard',
      icon: <LuLayoutDashboard className="text-xl" />,
      label: 'Dashboard',
      roles: ['admin', 'vendor', 'customer']
    },
    {
      id: 'products',
      icon: <LuPackage className="text-xl" />,
      label: 'Product Management',
      roles: ['admin', 'vendor']
    },
    {
      id: 'categories',
      icon: <LuLayers className="text-xl" />,
      label: 'Category Management',
      roles: ['admin']
    },
    {
      id: 'order-status',
      icon: <LuShoppingBag className="text-xl" />,
      label: 'Order Status Tracker',
      roles: ['admin']
    },
  ];

  const navItems = allNavItems.filter(item => 
    !userRole || item.roles.includes(userRole)
  );

  const handleSignOut = () => {
    logout();
    navigate('/sign-in');
  };

  return (
    <aside className="w-[280px] h-screen fixed bg-white border-r border-slate-200 p-8 flex flex-col z-50">
      <div className="flex items-center gap-3 mb-12 pl-2">
        <span className="text-xl font-bold tracking-tight text-[#2c72f1]">Kappe Shop</span>
      </div>

      <nav className="flex-1">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center p-3 mb-2 rounded-xl font-medium cursor-pointer transition-all gap-3 ${
              activeSection === item.id
                ? 'bg-[#2c72f1] text-white shadow-lg'
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <span className="w-6 flex justify-center">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <button
        onClick={handleSignOut}
        className="flex items-center p-3 rounded-xl text-red-500 font-semibold hover:bg-red-50 transition-all border border-transparent hover:border-red-100 mt-auto gap-3"
      >
        <LuLogOut className="text-xl" />
        Sign Out
      </button>
    </aside>
  );
};

export default Sidebar;
