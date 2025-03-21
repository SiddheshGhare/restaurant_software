import React, { useState, useEffect } from 'react';
import { MenuItem } from '../../types';

interface MenuItemFormProps {
  item?: MenuItem;
  categoryId: string;
  onSubmit: (item: Omit<MenuItem, 'id'> & { id?: string }) => void;
  onCancel: () => void;
}

const MenuItemForm: React.FC<MenuItemFormProps> = ({ 
  item, 
  categoryId, 
  onSubmit, 
  onCancel 
}) => {
  const [formData, setFormData] = useState<Omit<MenuItem, 'id'> & { id?: string }>({
    name: '',
    description: '',
    price: 0,
    image: '',
    available: true
  });

  useEffect(() => {
    if (item) {
      setFormData({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        available: item.available
      });
    }
  }, [item]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'price') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#1c2756] p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-white mb-4">
        {item ? 'Edit Menu Item' : 'Add New Menu Item'}
      </h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-300 mb-1">Item Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-[#2a3563] border border-[#3b4784] text-white focus:outline-none focus:border-[#6c63ff]"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-gray-300 mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-2 rounded bg-[#2a3563] border border-[#3b4784] text-white focus:outline-none focus:border-[#6c63ff]"
          />
        </div>
        
        <div>
          <label htmlFor="price" className="block text-gray-300 mb-1">Price ($)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full px-4 py-2 rounded bg-[#2a3563] border border-[#3b4784] text-white focus:outline-none focus:border-[#6c63ff]"
          />
        </div>
        
        <div>
          <label htmlFor="image" className="block text-gray-300 mb-1">Image URL</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-[#2a3563] border border-[#3b4784] text-white focus:outline-none focus:border-[#6c63ff]"
          />
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="available"
            name="available"
            checked={formData.available}
            onChange={handleChange}
            className="w-4 h-4 mr-2"
          />
          <label htmlFor="available" className="text-gray-300">Available</label>
        </div>
      </div>
      
      <div className="flex justify-end space-x-4 mt-6">
        <button 
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md"
        >
          Cancel
        </button>
        <button 
          type="submit"
          className="px-4 py-2 bg-[#6c63ff] hover:bg-[#5a52d5] text-white rounded-md"
        >
          {item ? 'Update Item' : 'Add Item'}
        </button>
      </div>
    </form>
  );
};

export default MenuItemForm;