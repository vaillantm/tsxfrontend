import React from 'react';
import { useAuthContext } from '../context/AuthContext';

const Header: React.FC = () => {
  const { user } = useAuthContext();
  
  const getRoleDisplayName = (role?: string) => {
    switch (role) {
      case 'admin':
        return 'Administrator';
      case 'vendor':
        return 'Vendor';
      case 'customer':
        return 'Customer';
      default:
        return 'User';
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="flex justify-between items-center mb-10">
      <div className="bg-white border border-slate-200 rounded-xl px-4 py-2 w-96 flex items-center gap-12 shadow-sm">
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-magnifying-glass text-slate-400"></i>
          <input
            type="text"
            className="outline-none text-sm w-full"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-bold text-slate-800">{user?.name || 'User'}</p>
          <p className="text-[11px] text-slate-400 font-medium">{user?.email || ''}</p>
          <p className="text-[10px] text-slate-500 font-medium capitalize">{getRoleDisplayName(user?.role)}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 border-2 border-white shadow-sm flex items-center justify-center text-white font-bold text-sm">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            getInitials(user?.name)
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;