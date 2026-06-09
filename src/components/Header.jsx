

import { Link } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useCartQuery } from '../hooks/useCart';

export const Header = () => {

  const { data: items = [] } = useCartQuery();
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

        
        <Link to="/" className="text-2xl font-bold text-blue-600 no-underline">
          MiniStore
        </Link>


        <nav className="hidden md:flex items-center space-x-6 text-gray-600 font-medium">
          <Link to="/" className="hover:text-blue-600 no-underline">Bosh sahifa</Link>
          <a href="#" className="hover:text-blue-600">Chegirmalar</a>
          <a href="#" className="hover:text-blue-600">Yangi tovarlar</a>
        </nav>

        <div className="flex-1 max-w-md relative hidden sm:block">
          <input
            type="text"
            placeholder="Mahsulotlarni qidirish..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" size={18} />
        </div>

    
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-blue-600 transition-colors">
            <FiHeart size={22} />
          </button>

    
          <Link
            to="/cart"
            className="text-gray-600 hover:text-blue-600 relative transition-colors"
          >
            <FiShoppingCart size={22} />

            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full font-bold leading-none">
                {totalCount > 9 ? '9+' : totalCount}
              </span>
            )}
          </Link>
        </div>

      </div>
    </header>
  );
};