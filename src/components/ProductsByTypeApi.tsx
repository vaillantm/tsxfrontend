import { LayoutGrid, List } from 'lucide-react';
import ProductsGrid from './ProductsGrid';
import { useProductsByCategory } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories'; // Import useCategories

interface Props {
  category: string;
}

const ProductsByTypeApi = ({ category }: Props) => {
  const { data: products, isLoading: productsLoading, isError: productsError, error: productsFetchError } = useProductsByCategory(category);
  const { data: categories, isLoading: categoriesLoading, isError: categoriesError, error: categoriesFetchError } = useCategories();

  const currentCategoryName = categories?.find(cat => cat.path === category)?.name || category;

  if (productsLoading || categoriesLoading) {
    return (
      <div className="py-12">
        <div className="text-center text-gray-500">Loading products and categories...</div>
      </div>
    );
  }

  if (productsError || categoriesError) {
    return (
      <div className="py-12">
        <div className="text-center text-red-600">
          {(productsFetchError as Error)?.message || (categoriesFetchError as Error)?.message || 'Failed to load data'}
        </div>
      </div>
    );
  }

  const count = products?.length ?? 0;

  return (
    <div>
      <div className="flex justify-between items-center mb-10 text-xs font-semibold border-b pb-4 text-gray-500 uppercase">
        <span>Showing {count} Products in {currentCategoryName}</span>
        <div className="flex items-center gap-6">
          <LayoutGrid className="w-4 h-4 text-blue-600" />
          <List className="w-4 h-4" />
        </div>
      </div>
      <ProductsGrid products={products ?? []} categories={categories ?? []} />
    </div>
  );
};

export default ProductsByTypeApi;
