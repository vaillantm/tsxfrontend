import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-[1200px] mx-auto px-4 flex justify-start items-center">
        <div className="py-4 px-5 border-r border-gray-200 font-semibold text-sm flex items-center gap-2">
          <FontAwesomeIcon icon={faBars} /> SHOP BY DEPARTMENT
        </div>
        <ul className="flex gap-6 ml-8 list-none font-semibold text-[13px]">
          <li>
            <Link to="/" className="no-underline text-gray-800 hover:text-primary-blue flex items-center gap-1">
              HOME <FontAwesomeIcon icon={faChevronDown} className="text-[8px]" />
            </Link>
          </li>
          <li>
            <Link to="/shop/jewellery" className="no-underline text-gray-800 hover:text-primary-blue flex items-center gap-1">
              SHOP <FontAwesomeIcon icon={faChevronDown} className="text-[8px]" />
            </Link>
          </li>
          <li>
            <a href="#" className="no-underline text-gray-800 hover:text-primary-blue flex items-center gap-1">
              PAGES <FontAwesomeIcon icon={faChevronDown} className="text-[8px]" />
            </a>
          </li>
          <li>
            <a href="#" className="no-underline text-gray-800 hover:text-primary-blue flex items-center gap-1">
              BLOG <FontAwesomeIcon icon={faChevronDown} className="text-[8px]" />
            </a>
          </li>
          <li>
            <a href="#" className="no-underline text-gray-800 hover:text-primary-blue flex items-center gap-1">
              ELEMENTS <FontAwesomeIcon icon={faChevronDown} className="text-[8px]" />
            </a>
          </li>
          <li>
            <a href="#" className="no-underline text-gray-800 hover:text-primary-blue">
              BUY NOW
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
