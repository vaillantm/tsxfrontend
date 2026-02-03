import type { Product } from '../models/product'; // Correct Product import
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { Category } from '../models/category'; // Import Category type

interface Props {
  products: Product[];
  categories: Category[]; // Add categories prop
}

const ProductsGrid = ({ products, categories }: Props) => {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || 'N/A';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
      {products.map(product => (
        <div 
          key={product._id} 
          className="group cursor-pointer"
          onClick={() => navigate(`/product/${product._id}`, { state: { product } })}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/product/${product._id}`, { state: { product } }); }}
        >
          <div className="bg-gray-50 aspect-square flex items-center justify-center p-8 mb-4 relative overflow-hidden rounded-md border border-gray-100">
            <img 
              src={product.images[0] || 'https://via.placeholder.com/400x400?text=No+Image'} 
              alt={product.name}
              className="mix-blend-multiply group-hover:scale-110 transition-transform duration-500 max-h-full object-contain"
            />
          </div>
          <div className="text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">
              {getCategoryName(product.categoryId)}
            </p>
            <h4 className="text-sm font-medium mb-1 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h4>
            {/* Removed rating stars as there is no rating field in the new Product model */}
            <p className="text-sm font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </p>
            <div className="mt-3">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  addItem({
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0] || 'https://via.placeholder.com/400x400?text=No+Image',
                  }, 1);
                }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsGrid;
