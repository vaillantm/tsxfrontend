import { useNavigate } from 'react-router-dom';

// 1. Added 'path' to each category to match your shopData keys exactly
const categories = [
  { name: 'Men', path: 'men', image:'https://res.cloudinary.com/dl4biwzn8/image/upload/v1769515784/imgi_14_Men-120x120_nowyao.jpg'},
  { name: 'Women', path: 'women', image: 'https://res.cloudinary.com/dl4biwzn8/image/upload/v1769516327/imgi_15_women-120x120_dju97g.jpg' },
  { name: 'Shoes', path: 'shoes', image: 'https://res.cloudinary.com/dl4biwzn8/image/upload/v1769516395/imgi_16_Shoes-120x120_ccbzbb.jpg' },
  { name: 'Bags & Backpacks', path: 'bags', image: 'https://res.cloudinary.com/dl4biwzn8/image/upload/v1769516468/imgi_17_Bags-120x120_qcevui.png' },
  { name: 'Watches', path: 'watches', image: 'https://res.cloudinary.com/dl4biwzn8/image/upload/v1769516829/imgi_18_Watch-120x120_mgdevh.jpg' },
  { name: 'Jewellery', path: 'jewellery', image: 'https://res.cloudinary.com/dl4biwzn8/image/upload/v1769516869/imgi_19_Jewellery-120x120_jjrlzh.jpg' },
  { name: 'Accessories', path: 'accessories', image: 'https://res.cloudinary.com/dl4biwzn8/image/upload/v1769516907/imgi_20_Accessories-120x120_tlpq9r.jpg' },
  { name: 'Dresses', path: 'dresses', image: 'https://res.cloudinary.com/dl4biwzn8/image/upload/v1769516965/imgi_21_Women-Khaki-Solid-Top-120x120_q43rqg.jpg' },
  { name: 'Tops', path: 'tops', image: 'https://res.cloudinary.com/dl4biwzn8/image/upload/v1769516995/imgi_22_Women-Off-White-Printed-Top-5-120x120_nvo3xo.jpg' },
  { name: 'Lingerie', path: 'lingerie', image: 'https://res.cloudinary.com/dl4biwzn8/image/upload/v1769517117/imgi_23_Women-Black-Solid-Maxi-Skirt-120x120_fygqut.jpg' },
];

const CategoryNav = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-start items-center py-5 pb-10 overflow-x-auto gap-4 no-scrollbar">
      {categories.map((category, index) => (
        <div 
          key={index} 
          className="group text-center min-w-[85px] cursor-pointer"
          onClick={() => navigate(`/shop/${category.path}`)} // Simple and direct
        >
          {/* Container for the image to handle hover effects cleanly */}
          <div className="relative w-[75px] h-[75px] mx-auto mb-2 overflow-hidden rounded-full border border-gray-200">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <p className="text-[13px] m-0 text-gray-600 font-medium group-hover:text-blue-600 whitespace-nowrap transition-colors">
            {category.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CategoryNav;