import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCurrentUser, useLogout } from '../hooks/useAuth';

const Header = ({ cartCount }) => {
  const { data: user } = useCurrentUser();
  const logout = useLogout();
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');

  const handleCartClick = () => {
    if (!token) {
      navigate('/login');
    } else {
      navigate('/cart');
    }
  };

  return (
    <header className="flex justify-between items-center h-[70px] px-6 md:px-10 bg-[#141414] border-b border-[#222] text-white">
     
      <Link to="/" className="text-xl font-bold tracking-wide hover:text-purple-400 transition-colors">
        MyStore
      </Link>

   
      <div className="flex items-center gap-5">
     
        <button 
          onClick={handleCartClick} 
          className="flex items-center gap-1.5 bg-none border-none text-white text-base font-medium cursor-pointer hover:text-purple-400 transition-colors relative"
        >
          Savat
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex justify-center items-center font-bold shadow-[0_0_8px_rgba(168,85,247,0.6)]">
              {cartCount}
            </span>
          )}
        </button>

   
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 hidden sm:inline"> {user.name}</span>
            <button 
              onClick={logout} 
              className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-sm font-medium cursor-pointer transition-colors"
            >
              Chiqish
            </button>
          </div>
        ) : (
          <Link 
            to="/login" 
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg shadow-[0_4px_12px_rgba(168,85,247,0.2)] transition-all"
          >
            Kirish
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;