import React, { useState } from 'react';
import { useProducts, useDeleteProduct } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { LuPlus, LuSearch } from 'react-icons/lu';
import ProductFormModal from './ProductFormModal';
import { Product } from '../models/product';
import { useToast } from '../context/ToastContext';

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { data: products, isLoading, error } = useProducts();
  const { data: categories } = useCategories();
  const deleteProductMutation = useDeleteProduct();
  const { showToast } = useToast();

  const getCategoryName = (categoryId: string) => {
    return categories?.find(cat => cat.id === categoryId)?.name || 'N/A';
  };

  const filteredProducts = products?.filter(product => {
    const term = searchTerm.toLowerCase();
    const categoryName = getCategoryName(product.categoryId).toLowerCase();
    return (
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      categoryName.includes(term)
    );
  }) || [];

  const handleAddNewProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProductMutation.mutateAsync(id);
      showToast('Product deleted successfully', 'success');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Product delete failed', 'error');
    }
  };

  if (isLoading) {
    return (
      <div className="content-section">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Product Management</h1>
            <p className="text-slate-500 mt-1">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-section">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Product Management</h1>
            <p className="text-red-500 mt-1">Error loading products: {error instanceof Error ? error.message : 'Unknown error'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="content-section">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Product Management</h1>
          <p className="text-slate-500 mt-1">Manage your inventory and pricing.</p>
        </div>
        <button
          onClick={handleAddNewProduct}
          className="flex items-center gap-2 px-4 py-2 bg-[#2c72f1] text-white rounded-md shadow-md hover:bg-blue-600 transition-colors"
        >
          <LuPlus />
          Add New Product
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by Name, Description, or Category..."
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c72f1]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center border border-slate-200">
          <p className="text-slate-500">No products found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl p-8 border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredProducts.map((product) => (
                <tr key={product._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {getCategoryName(product.categoryId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="text-[#2c72f1] hover:text-blue-600 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productToEdit={editingProduct}
      />
    </div>
  );
};

export default Products;
