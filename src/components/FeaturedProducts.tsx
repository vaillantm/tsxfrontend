import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import CategoryNavRemote from './CategoryNavRemote';
import { useProducts } from '../hooks/useProducts';

const FeaturedProducts = () => {
  const { data: products, isLoading, isError, error } = useProducts();
  const navigate = useNavigate();

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-12 text-center text-gray-500">
        Loading featured products...
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-12 text-center text-red-600">
        {(error as Error)?.message || 'Failed to load featured products'}
      </div>
    );
  }

  const featuredProducts = products ?? [];

  return (
    <div className="max-w-[1200px] mx-auto px-4">
      <CategoryNavRemote />

      <div className="flex justify-between items-center border-b border-gray-200 mb-8">
        <h2 className="text-xl uppercase tracking-wider font-semibold">Featured Products</h2>
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); navigate('/shop'); }}
          className="bg-blue-500 text-white py-2 px-5 no-underline rounded text-xs font-bold uppercase hover:bg-blue-600"
        >
          View All
        </a>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {featuredProducts.map((product) => (
          <div key={product.id} className="relative bg-white cursor-pointer" onClick={() => navigate(`/shop/${product.category}`, { state: { product } })}>
            <div className="relative bg-gray-50 aspect-[4/5] flex items-center justify-center overflow-hidden mb-4 rounded">
              <button className="absolute top-3 right-3 text-gray-400 text-lg cursor-pointer z-10 hover:text-red-500 transition" onClick={(e) => e.stopPropagation()}>
                <FontAwesomeIcon icon={faHeart} />
              </button>
              <img src={product.img || 'https://via.placeholder.com/300x400?text=No+Image'} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-1 font-semibold">
                {product.tags}
              </div>
              <div className="font-semibold text-[13px] text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis leading-snug">
                {product.name}
              </div>
            </div>
          </div>
        ))}
      </div>

      {featuredProducts.length === 0 && (
        <div className="py-12 text-center text-gray-500">
          No featured products available.
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;
