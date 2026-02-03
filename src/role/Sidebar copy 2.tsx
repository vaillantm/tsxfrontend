import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import {
  LuLayoutDashboard,
  LuPackage,
  LuLayers,
  LuShoppingBag,
  LuLogOut,
} from 'react-icons/lu';

export type Section = 'dashboard' | 'products' | 'categories' | 'orders' | 'users';

interface SidebarProps {
  userRole?: 'admin' | 'vendor' | 'customer';
}

type NavItem = {
  id: Section;
  label: string;
  icon: React.ReactNode;
  roles: Array<'admin' | 'vendor' | 'customer'>;
  path: string;
};

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();

  const getPath = (section: Section) => {
    if (section === 'dashboard') return `/${userRole}`;
    return `/${userRole}/${section}`;
  };

  const allItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LuLayoutDashboard className="text-xl" />, roles: ['admin', 'vendor', 'customer'], path: getPath('dashboard') },
    { id: 'products', label: 'Products', icon: <LuPackage className="text-xl" />, roles: ['admin', 'vendor'], path: getPath('products') },
    { id: 'categories', label: 'Categories', icon: <LuLayers className="text-xl" />, roles: ['admin'], path: getPath('categories') },
    { id: 'orders', label: 'Orders', icon: <LuShoppingBag className="text-xl" />, roles: ['admin', 'vendor', 'customer'], path: getPath('orders') },
  ];

  const navItems = allItems.filter(item => !userRole || item.roles.includes(userRole));

  const handleSignOut = () => {
    logout();
    navigate('/sign-in');
  };

  return (
    /* Key Changes:
       1. sticky: Keeps the element in the flow but pins it.
       2. top-0: Pins it to the very top of the viewport.
       3. h-screen: Ensures the sidebar is exactly the height of the screen.
       4. overflow-y-auto: If you have too many links, the sidebar itself scrolls, but stays pinned.
    */
    <aside className="sticky top-0 h-screen w-[280px] bg-white border-r border-slate-200 p-8 flex flex-col z-50 overflow-y-auto">
      <div className="flex items-center gap-3 mb-12 pl-2 flex-none">
        <span className="text-xl font-bold tracking-tight text-[#2c72f1]">
          Kappe Shop
        </span>
      </div>

      <nav className="flex-1">
        {navItems.map(item => (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.id === 'dashboard'}
            className={({ isActive }) =>
              `w-full flex items-center p-3 mb-2 rounded-xl font-medium transition-all gap-3 ${
                isActive
                  ? 'bg-[#2c72f1] text-white shadow-lg'
                  : 'text-slate-500 hover:bg-slate-50'
              }`
            }
          >
            <span className="w-6 flex justify-center">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleSignOut}
        className="flex items-center p-3 rounded-xl text-red-500 font-semibold hover:bg-red-50 transition-all border border-transparent hover:border-red-100 mt-auto gap-3 flex-none"
      >
        <LuLogOut className="text-xl" />
        Sign Out
      </button>
    </aside>
  );
};

export default Sidebar;