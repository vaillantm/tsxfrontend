import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { categoryData } from '../data/categoryData';
import { Product } from '../types';

const CategoryPage = () => {
  const { type = 'hats-caps' } = useParams<{ type: string }>();
  const data = categoryData[type];

  if (!data) {
    return <div className="text-center py-20">Category not found</div>;
  }

  const renderStars = (rating: number) => {
    return (
      <div className="text-[#ffb400] text-xs mb-1">
        {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
      </div>
    );
  };

  return (
    <div className="font-poppins">
      <header className="bg-gray-50 py-12 text-center">
        <h1 className="text-[40px] mb-2 text-gray-800 font-medium">{data.title}</h1>
        <nav className="text-[13px] text-gray-500">{data.breadcrumb}</nav>
      </header>

      <div className="max-w-[1200px] mx-auto my-10 px-4 flex gap-8">
        <aside className="w-[250px] flex-shrink-0">
          <div className="mb-10">
            <h3 className="text-base border-b-2 border-gray-200 pb-2 mb-4">PRODUCT CATEGORIES</h3>
            <ul className="list-none p-0 text-sm text-gray-600 leading-[2.5]">
              <li>
                <Link to="/category/hats-caps" className="no-underline text-gray-600 hover:text-primary-blue">
                  Hats & Caps (1)
                </Link>
              </li>
              <li>
                <Link to="/category/beauty-care" className="no-underline text-gray-600 hover:text-primary-blue">
                  Beauty & Care (2)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base border-b-2 border-gray-200 pb-2 mb-4">FILTER BY PRICE</h3>
            <div className="text-sm text-gray-600">
              <label className="block mb-2 cursor-pointer">
                <input type="radio" name="price" className="mr-2" /> $0.00 - $50.00
              </label>
              <label className="block mb-2 cursor-pointer">
                <input type="radio" name="price" className="mr-2" /> $50.00 - $100.00
              </label>
            </div>
          </div>
        </aside>

        <main className="flex-grow">
          <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
            <span className="text-[13px] text-gray-500">{data.products.length} Product(s) Found</span>
            <div>
              <select className="py-2 px-3 border border-gray-300 text-[13px] bg-white cursor-pointer">
                <option>Default sorting</option>
                <option>Sort by price: low to high</option>
                <option>Sort by price: high to low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-8">
            {data.products.map((product: Product) => (
              <div key={product.id} className="font-poppins">
                <div className="bg-gray-50 p-5 relative rounded overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto transition-transform hover:scale-105"
                  />
                  <button className="absolute top-4 right-4 bg-white border-none rounded-full w-9 h-9 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:bg-gray-100">
                    <FontAwesomeIcon icon={faHeart} className="text-gray-400" />
                  </button>
                </div>
                <div className="pt-4">
                  <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">
                    {product.category}
                  </div>
                  <div className="font-semibold text-[15px] my-1 text-gray-800">{product.name}</div>
                  {renderStars(product.rating ?? 0)}
                  <div className="text-sm text-gray-500 mb-1">({product.reviews ?? 0})</div>
                  <div className="font-bold text-gray-800 text-base">${product.price.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;
