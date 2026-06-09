
import { Link } from 'react-router-dom';
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import {
  useCartQuery,
  useUpdateQty,
  useRemoveFromCart,
} from '../hooks/useCart';

export const CartPage = () => {
  const { data: items = [], isLoading, isError, refetch } = useCartQuery();
  const updateQty = useUpdateQty();
  const removeFromCart = useRemoveFromCart();

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Savatim</h1>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-xl border border-gray-100 p-4 flex gap-4 animate-pulse">
                <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-8 bg-gray-200 rounded w-28 mt-4" />
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-6 h-fit animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-10 bg-gray-200 rounded w-full mt-4" />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 mb-4">Savat yuklanmadi</p>
        <button
          onClick={() => refetch()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Qayta urinish
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <FiShoppingBag size={64} className="text-gray-200 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Savat bosh</h2>
        <p className="text-gray-400 mb-6">Mahsulotlar qoshishni boshlang</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <FiArrowLeft size={16} />
          Xarid qilish
        </Link>
      </div>
    );
  }

  // ── Hisob-kitob ───────────────────────────────────────────────────────────
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 25000;
  const total = subtotal + deliveryFee;
  const formatPrice = (n) => n.toLocaleString('uz-UZ') + " som";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Sarlavha */}
      <div className="flex items-center gap-3 mb-6">
        <Link to="/" className="text-gray-500 hover:text-blue-600 transition-colors">
          <FiArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">
          Savatim
          <span className="ml-2 text-base font-normal text-gray-400">
            ({items.length} xil tovar)
          </span>
        </h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

      
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const isItemLoading =
              (updateQty.isPending && updateQty.variables?.cartItemId === item.id) ||
              (removeFromCart.isPending && removeFromCart.variables === item.id);

            return (
              <div
                key={item.id}
                className={`bg-white rounded-xl border border-gray-100 p-4 flex gap-4 transition-opacity ${
                  isItemLoading ? 'opacity-60' : ''
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 text-sm mb-1 truncate">
                    {item.title}
                  </h3>
                  <p className="text-blue-600 font-bold text-base mb-3">
                    {formatPrice(item.price)}
                  </p>

                  <div className="flex items-center gap-3">
             
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => {
                          if (item.quantity === 1) {
                            removeFromCart.mutate(item.id);
                          } else {
                            updateQty.mutate({ cartItemId: item.id, newQty: item.quantity - 1 });
                          }
                        }}
                        disabled={isItemLoading}
                        className="px-3 py-1.5 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
                      >
                        <FiMinus size={14} />
                      </button>

                      <span className="px-4 py-1.5 text-sm font-semibold text-gray-800 border-x border-gray-200 min-w-[2.5rem] text-center">
                        {isItemLoading ? (
                          <span className="inline-block w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          item.quantity
                        )}
                      </span>

                      <button
                        onClick={() =>
                          updateQty.mutate({ cartItemId: item.id, newQty: item.quantity + 1 })
                        }
                        disabled={isItemLoading}
                        className="px-3 py-1.5 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
                      >
                        <FiPlus size={14} />
                      </button>
                    </div>

                    {/* O'chirish */}
                    <button
                      onClick={() => removeFromCart.mutate(item.id)}
                      disabled={isItemLoading}
                      className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <FiTrash2 size={16} />
                    </button>

                    {/* Jami narx */}
                    <span className="ml-auto text-sm font-bold text-gray-700">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 h-fit sticky top-20">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Buyurtma xulosasi</h2>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Tovarlar ({items.reduce((s, i) => s + i.quantity, 0)} ta)</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Yetkazib berish</span>
              <span>{formatPrice(deliveryFee)}</span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 mb-5">
            <div className="flex justify-between font-bold text-gray-800">
              <span>Jami</span>
              <span className="text-blue-600">{formatPrice(total)}</span>
            </div>
          </div>

          <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
            Buyurtma berish
          </button>

          <Link
            to="/"
            className="block text-center mt-3 text-sm text-blue-600 hover:underline"
          >
            Xaridni davom ettirish
          </Link>
        </div>
      </div>
    </div>
  );
};