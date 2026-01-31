import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faCircleQuestion, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useAuthContext } from '../context/AuthContext';

const TopBar = () => {
  const { user } = useAuthContext();
  return (
    <div className="bg-primary-blue text-white text-xs py-2 border-b border-white/10">
      <div className="max-w-[1200px] mx-auto px-4 flex justify-between items-center">
        <div className="flex gap-4">
          <span className="flex items-center gap-1">
            ENGLISH <FontAwesomeIcon icon={faChevronDown} className="text-[8px]" />
          </span>
          <span className="flex items-center gap-1">
            $ DOLLAR (US) <FontAwesomeIcon icon={faChevronDown} className="text-[8px]" />
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span>{user ? `Hello, ${user.username}` : 'WELCOME TO OUR STORE!'}</span>
          <a href="#" className="hover:underline flex items-center gap-1">
            <FontAwesomeIcon icon={faNewspaper} /> BLOG
          </a>
          <a href="#" className="hover:underline flex items-center gap-1">
            <FontAwesomeIcon icon={faCircleQuestion} /> FAQ
          </a>
          <a href="#" className="hover:underline flex items-center gap-1">
            <FontAwesomeIcon icon={faEnvelope} /> CONTACT US
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
