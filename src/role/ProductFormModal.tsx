import React, { useState, useEffect } from 'react';
import { useCreateProduct, useUpdateProduct } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import type { Product } from '../models/product';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({ isOpen, onClose, productToEdit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [categoryId, setCategoryId] = useState('');
  const [images, setImages] = useState<FileList | null>(null);

  const { data: categories } = useCategories();
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setDescription(productToEdit.description);
      setPrice(productToEdit.price);
      setQuantity(productToEdit.quantity);
      setCategoryId(productToEdit.categoryId);
      setImages(null);
    } else {
      setName('');
      setDescription('');
      setPrice(0);
      setQuantity(0);
      setCategoryId('');
      setImages(null);
    }
  }, [productToEdit, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', String(price));
    formData.append('quantity', String(quantity));
    formData.append('categoryId', categoryId);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }

    if (productToEdit) {
      await updateProductMutation.mutateAsync({ id: productToEdit.id, data: formData });
    } else {
      await createProductMutation.mutateAsync(formData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">{productToEdit ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
              <input type="text" id="name" className="mt-1 block w-full input" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <select id="category" className="mt-1 block w-full input" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                <option value="" disabled>Select a category</option>
                {categories?.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
              <input type="number" id="price" step="0.01" className="mt-1 block w-full input" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} required />
            </div>
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
              <input type="number" id="quantity" className="mt-1 block w-full input" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value, 10))} required />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" className="mt-1 block w-full input" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
          </div>
          <div className="mb-4">
            <label htmlFor="images" className="block text-sm font-medium text-gray-700">Images</label>
            {productToEdit?.images && (
              <div className="flex flex-wrap gap-2 mt-2 border p-2 rounded-md">
                {productToEdit.images.map(img => <img key={img} src={img} alt="Product image" className="h-20 rounded-md" />)}
              </div>
            )}
            <input type="file" id="images" multiple className="mt-1 block w-full file-input" onChange={(e) => setImages(e.target.files)} />
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">{productToEdit ? 'Save Changes' : 'Add Product'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
