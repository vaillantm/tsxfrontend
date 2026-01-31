import React, { useState, useEffect } from 'react';
import { useCreateCategory, useUpdateCategory } from '../hooks/useCategories';
import type { Category } from '../models/category';

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryToEdit?: Category | null;
}

const CategoryFormModal: React.FC<CategoryFormModalProps> = ({ isOpen, onClose, categoryToEdit }) => {
  const [name, setName] = useState('');
  const [path, setPath] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();

  useEffect(() => {
    if (categoryToEdit) {
      setName(categoryToEdit.name);
      setPath(categoryToEdit.path);
      setDescription(categoryToEdit.description || '');
      setImage(null);
    } else {
      setName('');
      setPath('');
      setDescription('');
      setImage(null);
    }
  }, [categoryToEdit, isOpen]);

  useEffect(() => {
    if (!categoryToEdit) {
      setPath(name.toLowerCase().replace(/\s+/g, '-'));
    }
  }, [name, categoryToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Category name cannot be empty.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('path', path);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    if (categoryToEdit) {
      await updateCategoryMutation.mutateAsync({ id: categoryToEdit.id, data: formData });
    } else {
      await createCategoryMutation.mutateAsync(formData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{categoryToEdit ? 'Edit Category' : 'Add New Category'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">Category Name</label>
            <input
              type="text"
              id="categoryName"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2c72f1] focus:border-[#2c72f1] sm:text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="categoryPath" className="block text-sm font-medium text-gray-700">Category Path (Slug)</label>
            <input
              type="text"
              id="categoryPath"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              readOnly={!!categoryToEdit} // Allow editing only for new categories indirectly
            />
          </div>
          <div className="mb-4">
            <label htmlFor="categoryDescription" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="categoryDescription"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2c72f1] focus:border-[#2c72f1] sm:text-sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="categoryImage" className="block text-sm font-medium text-gray-700">Image</label>
            {categoryToEdit?.image && !image && (
              <div className="mt-2">
                <img src={categoryToEdit.image} alt="Current category" className="h-20 rounded-md" />
              </div>
            )}
            <input
              type="file"
              id="categoryImage"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#2c72f1] hover:file:bg-blue-100"
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c72f1]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2c72f1] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c72f1]"
            >
              {categoryToEdit ? 'Save Changes' : 'Add Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryFormModal;
