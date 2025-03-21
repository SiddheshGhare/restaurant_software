import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import MenuItemForm from '../../components/management/MenuItemForm';
import { restaurants } from '../../data/restaurants';
import { useAuth } from '../../context/AuthContext';
import { Restaurant, Category, MenuItem } from '../../types';

const MenuManagement: React.FC = () => {
  const { user } = useAuth();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  
  useEffect(() => {
    if (user?.restaurantId) {
      const foundRestaurant = restaurants.find(r => r.id === user.restaurantId);
      if (foundRestaurant) {
        setRestaurant(foundRestaurant);
        setCategories(foundRestaurant.categories);
        if (foundRestaurant.categories.length > 0) {
          setActiveCategory(foundRestaurant.categories[0].id);
        }
      }
    }
  }, [user]);
  
  const handleAddItem = (item: Omit<MenuItem, 'id'>) => {
    // In a real app, this would send the data to an API
    const newItem: MenuItem = {
      ...item,
      id: `${activeCategory}-${Date.now()}`
    };
    
    setCategories(prevCategories => 
      prevCategories.map(category => 
        category.id === activeCategory
          ? { ...category, items: [...category.items, newItem] }
          : category
      )
    );
    
    setIsAddingItem(false);
  };
  
  const handleUpdateItem = (updatedItem: Omit<MenuItem, 'id'> & { id?: string }) => {
    if (!updatedItem.id) return;
    
    setCategories(prevCategories => 
      prevCategories.map(category => ({
        ...category,
        items: category.items.map(item => 
          item.id === updatedItem.id ? { ...updatedItem as MenuItem } : item
        )
      }))
    );
    
    setEditingItem(null);
  };
  
  const handleDeleteItem = (itemId: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setCategories(prevCategories => 
        prevCategories.map(category => ({
          ...category,
          items: category.items.filter(item => item.id !== itemId)
        }))
      );
    }
  };
  
  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    
    const newCategory: Category = {
      id: `new-${Date.now()}`,
      name: newCategoryName,
      items: []
    };
    
    setCategories(prev => [...prev, newCategory]);
    setActiveCategory(newCategory.id);
    setNewCategoryName('');
    setIsAddingCategory(false);
  };
  
  const activeItems = categories.find(cat => cat.id === activeCategory)?.items || [];
  
  return (
    <div className="bg-[#1c2756] rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-[#2a3563]">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Menu Management</h2>
          <button 
            onClick={() => setIsAddingCategory(true)}
            className="px-4 py-2 bg-[#6c63ff] hover:bg-[#5a52d5] rounded-md flex items-center"
          >
            <Plus size={18} className="mr-1" />
            Add Category
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {isAddingCategory ? (
          <div className="mb-6 bg-[#2a3563] p-4 rounded-md">
            <h3 className="font-medium mb-2">Add New Category</h3>
            <div className="flex">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Category name"
                className="flex-1 px-4 py-2 rounded-l bg-[#1c2756] border border-[#3b4784] text-white focus:outline-none focus:border-[#6c63ff]"
              />
              <button 
                onClick={handleAddCategory}
                className="px-4 py-2 bg-[#6c63ff] hover:bg-[#5a52d5] rounded-r"
              >
                Add
              </button>
            </div>
            <div className="flex justify-end mt-2">
              <button 
                onClick={() => setIsAddingCategory(false)}
                className="text-sm text-gray-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : null}
        
        {categories.length > 0 ? (
          <>
            <div className="flex overflow-x-auto pb-4 mb-6 scrollbar-hide">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 mr-2 rounded-full whitespace-nowrap ${
                    activeCategory === category.id
                      ? 'bg-[#6c63ff] text-white'
                      : 'bg-[#2a3563] text-gray-300 hover:bg-[#3b4784]'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            <div className="mb-6 flex justify-between items-center">
              <h3 className="text-lg font-medium">
                {categories.find(cat => cat.id === activeCategory)?.name} Items
              </h3>
              <button 
                onClick={() => setIsAddingItem(true)}
                className="px-4 py-2 bg-[#6c63ff] hover:bg-[#5a52d5] rounded-md flex items-center"
              >
                <Plus size={18} className="mr-1" />
                Add Item
              </button>
            </div>
            
            {isAddingItem && (
              <div className="mb-6">
                <MenuItemForm 
                  categoryId={activeCategory}
                  onSubmit={handleAddItem}
                  onCancel={() => setIsAddingItem(false)}
                />
              </div>
            )}
            
            {editingItem && (
              <div className="mb-6">
                <MenuItemForm 
                  item={editingItem}
                  categoryId={activeCategory}
                  onSubmit={handleUpdateItem}
                  onCancel={() => setEditingItem(null)}
                />
              </div>
            )}
            
            {activeItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeItems.map(item => (
                  <div key={item.id} className="bg-[#2a3563] rounded-lg overflow-hidden shadow-md">
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                        <span className="text-[#6c63ff] font-bold">${item.price.toFixed(2)}</span>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">{item.description}</p>
                      
                      <div className="flex justify-between items-center">
                        <span className={`px-2 py-1 rounded text-xs ${
                          item.available ? 'bg-green-500 bg-opacity-20 text-green-300' : 'bg-red-500 bg-opacity-20 text-red-300'
                        }`}>
                          {item.available ? 'Available' : 'Out of Stock'}
                        </span>
                        
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => setEditingItem(item)}
                            className="p-2 bg-[#3b4784] hover:bg-[#4b5794] rounded-md"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-2 bg-red-500 bg-opacity-20 hover:bg-opacity-30 rounded-md"
                          >
                            <Trash2 size={16} className="text-red-300" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-[#2a3563] rounded-lg">
                <p className="text-gray-400 mb-4">No items in this category yet.</p>
                <button 
                  onClick={() => setIsAddingItem(true)}
                  className="px-4 py-2 bg-[#6c63ff] hover:bg-[#5a52d5] rounded-md"
                >
                  Add Your First Item
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8 bg-[#2a3563] rounded-lg">
            <p className="text-gray-400 mb-4">No categories yet. Create your first category to get started.</p>
            <button 
              onClick={() => setIsAddingCategory(true)}
              className="px-4 py-2 bg-[#6c63ff] hover:bg-[#5a52d5] rounded-md"
            >
              Create Category
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuManagement;