import { useNavigate } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories';

const CategoryNavRemote = () => {
  const navigate = useNavigate();
  const { data: categories, isLoading, isError, error } = useCategories();

  if (isLoading) {
    return (
      <div className="flex justify-start items-center py-5 pb-10 overflow-x-auto gap-4 no-scrollbar">
        <div className="text-center text-gray-500">Loading categories...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-start items-center py-5 pb-10 overflow-x-auto gap-4 no-scrollbar">
        <div className="text-center text-red-600">{(error as Error)?.message || 'Failed to load categories'}</div>
      </div>
    );
  }

  return (
    <div className="flex justify-start items-center py-5 pb-10 overflow-x-auto gap-4 no-scrollbar">
      {categories?.map((category, index) => (
        <div
          key={category.id || index}
          className="group text-center min-w-[85px] cursor-pointer"
          onClick={() => navigate(`/shop/${category.path}`)}
        >
          <div className="relative w-[75px] h-[75px] mx-auto mb-2 overflow-hidden rounded-full border border-gray-200 bg-gray-100">
            {category.image ? (
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`w-full h-full flex items-center justify-center text-gray-400 ${category.image ? 'hidden' : ''}`}>
              <span className="text-xs">No Image</span>
            </div>
          </div>
          <p className="text-[13px] m-0 text-gray-600 font-medium group-hover:text-blue-600 whitespace-nowrap transition-colors">
            {category.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CategoryNavRemote;
