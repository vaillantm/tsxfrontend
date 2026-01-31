const categories = [
  { name: 'Men', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80' },
  { name: 'Women', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80' },
  { name: 'Shoes', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=150&q=80' },
  { name: 'Bags & Back...', image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=150&h=150&q=80' },
  { name: 'Watches', image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=150&q=80' },
  { name: 'Jewellery', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=150&q=80' },
  { name: 'Accessories', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=150&q=80' },
  { name: 'Dresses', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=150&q=80' },
  { name: 'Tops', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=150&h=150&q=80' },
  { name: 'Lingerie', image: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=150&h=150&q=80' },
];

const CategoryNav = () => {
  return (
    <div className="flex justify-between items-center py-5 pb-10 overflow-x-auto gap-4">
      {categories.map((category, index) => (
        <div key={index} className="text-center min-w-[85px] cursor-pointer">
          <img
            src={category.image}
            alt={category.name}
            className="w-[75px] h-[75px] rounded-full object-cover border border-gray-200 mb-2 transition-transform hover:scale-110"
          />
          <p className="text-[13px] m-0 text-gray-600 whitespace-nowrap">{category.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryNav;
