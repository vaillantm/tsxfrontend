import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { faUser, faHeart } from '@fortawesome/free-regular-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';


interface MainHeaderProps {
  cartItemCount: number;
  cartTotal: number;
  wishlistCount: number;
  onCartClick: () => void;
}

const MainHeader = ({ cartItemCount, cartTotal, wishlistCount, onCartClick }: MainHeaderProps) => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/sign-in');
  };
  
  return (
    <header className="bg-primary-blue py-5 text-white">
      <div className="max-w-[1200px] mx-auto px-4 flex justify-between items-center">
        <div className="text-4xl font-extrabold -tracking-wider">
          kapee<span className="text-[#82ccdd]">.</span>
        </div>

        <div className="flex bg-white rounded-full w-1/2 overflow-hidden h-[45px]">
          <input
            type="text"
            placeholder="Search for products, categories, brands, sku..."
            className="flex-1 border-none px-5 outline-none text-gray-900"
          />
          <select className="border-none border-l border-gray-200 px-4 text-text-gray bg-white outline-none">
            <option>All Categories</option>
          </select>
          <button className="bg-white border-none px-5 text-primary-blue text-lg cursor-pointer hover:bg-gray-50">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>

        <div className="flex gap-6">
          {!user ? (
            <Link to="/sign-in" className="flex items-center gap-2 cursor-pointer hover:opacity-90 no-underline text-white">
              <FontAwesomeIcon icon={faUser} className="text-2xl" />
              <div className="text-[11px] leading-tight">
                HELLO,<br />
                <strong>SIGN IN</strong>
              </div>
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="flex items-center gap-2 no-underline text-white">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-white/30"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <FontAwesomeIcon icon={faUser} className={`text-2xl ${user.avatar ? 'hidden' : ''}`} />
                <div className="text-[11px] leading-tight">
                  HELLO,<br />
                  <strong>{user.username}</strong>
                </div>
              </Link>
              <button onClick={handleLogout} className="ml-2 text-xs uppercase bg-white text-primary-blue px-3 py-1 rounded hover:bg-gray-100 border-none cursor-pointer">
                Sign Out
              </button>
            </div>
          )}

          <div className="flex items-center gap-2 cursor-pointer hover:opacity-90">
            <div className="relative">
              <FontAwesomeIcon icon={faHeart} className="text-2xl" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-primary-blue text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 cursor-pointer hover:opacity-90" onClick={onCartClick}>
            <div className="relative">
              <FontAwesomeIcon icon={faBagShopping} className="text-2xl" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-primary-blue text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </div>
            <div className="text-[11px] leading-tight">
              Cart<br />
              <strong>${cartTotal.toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
