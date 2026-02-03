import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, LayoutGrid, List } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts, useProductsByCategory } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';

const Products = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const currentMain = type || '';
  const isAll = !type;
  const [currentSub, setCurrentSub] = useState<string | null>(null);

  useEffect(() => {
    setCurrentSub(null);
    window.scrollTo(0, 0);
  }, [type]);

  const { data: allApiProducts, isLoading: loadingAll, isError: errAll } = useProducts();
  const { data: catApiProducts, isLoading: loadingCat, isError: errCat } = useProductsByCategory(currentMain);

  const products = isAll ? (allApiProducts ?? []) : (catApiProducts ?? []);
  const loading = isAll ? loadingAll : loadingCat;
  const hasError = isAll ? errAll : errCat;

  const { data: categories } = useCategories();

  if (!isAll && !currentMain) return null;

  const filteredProducts = products;

  const getCategoryName = (categoryId: string) => {
    return categories?.find((cat) => cat._id === categoryId)?.name || 'Products';
  };

  const activeCategoryName = isAll
    ? 'All Products'
    : categories?.find((c) => c.path === currentMain)?.name || currentMain.replace(/-/g, ' ');

  const breadcrumbText = currentSub ? `${activeCategoryName} / ${currentSub}` : activeCategoryName;

  const switchMain = (key: string) => {
    navigate(`/shop/${key}`);
  };

  return (
    <div className="bg-white min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      <header className="py-12 bg-gray-50 border-b">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">{activeCategoryName}</h1>
          <nav className="text-xs uppercase tracking-widest text-gray-400 font-medium flex justify-center">
            <span
              className="after:content-['/'] after:mx-2 after:text-gray-400 cursor-pointer hover:text-gray-600"
              onClick={() => navigate('/')}
            >
              Home
            </span>
            <span className="after:content-['/'] after:mx-2 after:text-gray-400">Shop</span>
            <span className="text-gray-800">{breadcrumbText}</span>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="mb-10">
            <h3 className="text-sm font-bold border-b-2 border-blue-600 pb-2 mb-4 flex justify-between items-center uppercase tracking-wider">
              Product Categories
              <ChevronDown className="w-4 h-4" />
            </h3>

            <ul className="text-sm text-gray-600 space-y-4">
              <li>
                <div
                  onClick={() => navigate('/shop')}
                  className={`flex justify-between items-center cursor-pointer hover:text-blue-600 capitalize ${
                    isAll ? 'text-blue-600 font-bold border-l-2 border-blue-600 pl-2 -ml-2.5' : ''
                  }`}
                >
                  All ({allApiProducts?.length ?? 0})
                  {isAll ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                </div>
              </li>

              {categories?.map((cat) => (
                <li key={cat.path}>
                  <div
                    onClick={() => switchMain(cat.path)}
                    className={`flex justify-between items-center cursor-pointer hover:text-blue-600 capitalize ${
                      currentMain === cat.path ? 'text-blue-600 font-bold border-l-2 border-blue-600 pl-2 -ml-2.5' : ''
                    }`}
                  >
                    {cat.name}
                    {currentMain === cat.path ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="flex-1">
          <div className="flex justify-between items-center mb-10 text-xs font-semibold border-b pb-4 text-gray-500 uppercase">
            {loading ? (
              <span>Loading products...</span>
            ) : hasError ? (
              <span className="text-red-600">Failed to load products</span>
            ) : (
              <span>Showing {filteredProducts.length} Products</span>
            )}

            <div className="flex items-center gap-6">
              <LayoutGrid className="w-4 h-4 text-blue-600" />
              <List className="w-4 h-4" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="group cursor-pointer"
                onClick={() => navigate(`/product/${product._id}`, { state: { product } })}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') navigate(`/product/${product._id}`, { state: { product } });
                }}
              >
                <div className="bg-gray-50 aspect-square flex items-center justify-center p-8 mb-4 relative overflow-hidden rounded-md border border-gray-100">
                  <img
                    src={product.images?.[0] || 'https://via.placeholder.com/400x400?text=No+Image'}
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

                  <p className="text-sm font-bold text-gray-900">${product.price.toFixed(2)}</p>

                  <div className="mt-3">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        addItem(
                          {
                            productId: product._id,
                            name: product.name,
                            price: product.price,
                            image: product.images?.[0] || 'https://via.placeholder.com/400x400?text=No+Image',
                          },
                          1
                        );
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Products;
