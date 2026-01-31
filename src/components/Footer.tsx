import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faEnvelope, faClock } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faXTwitter, faLinkedinIn, faInstagram, faPinterestP, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faRss } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-[#1a2234] text-white pt-16 pb-5 text-sm">
      <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-5 gap-10 mb-12">
        <div className="col-span-1">
          <h2 className="text-[32px] mb-4 font-bold">kapee.</h2>
          <p className="text-[#b0b5be] leading-relaxed mb-6">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
          </p>
          <ul className="list-none p-0 m-0">
            <li className="flex items-start mb-4 leading-snug">
              <FontAwesomeIcon icon={faLocationDot} className="mr-3 text-base w-5 pt-0.5" />
              Lorem Ipsum, 2046 Lorem Ipsum
            </li>
            <li className="flex items-start mb-4 leading-snug">
              <FontAwesomeIcon icon={faPhone} className="mr-3 text-base w-5 pt-0.5" />
              576-245-2478
            </li>
            <li className="flex items-start mb-4 leading-snug">
              <FontAwesomeIcon icon={faEnvelope} className="mr-3 text-base w-5 pt-0.5" />
              info@kapee.com
            </li>
            <li className="flex items-start mb-4 leading-snug">
              <FontAwesomeIcon icon={faClock} className="mr-3 text-base w-5 pt-0.5" />
              Mon - Fri / 9:00 AM - 6:00 PM
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-base uppercase mb-6 tracking-wider font-semibold">Information</h3>
          <ul className="list-none p-0 m-0">
            <li className="mb-3">
              <a href="#" className="text-white no-underline hover:text-blue-500 transition">About Us</a>
            </li>
            <li className="mb-3">
              <a href="#" className="text-white no-underline hover:text-blue-500 transition">Store Location</a>
            </li>
            <li className="mb-3">
              <a href="#" className="text-white no-underline hover:text-blue-500 transition">Contact Us</a>
            </li>
            <li className="mb-3">
              <a href="#" className="text-white no-underline hover:text-blue-500 transition">Shipping & Delivery</a>
            </li>
            <li className="mb-3">
              <a href="#" className="text-white no-underline hover:text-blue-500 transition">Latest News</a>
            </li>
            <li className="mb-3">
              <a href="#" className="text-white no-underline hover:text-blue-500 transition">Our Sitemap</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-base uppercase mb-6 tracking-wider font-semibold">Our Service</h3>
          <ul className="list-none p-0 m-0">
            <li className="mb-3">
              <a href="#" className="text-white no-underline hover:text-blue-500 transition">Privacy Policy</a>
            </li>
            <li className="mb-3">
              <a href="#" className="text-white no-underline hover:text-blue-500 transition">Terms of Sale</a>
            </li>
            <li className="mb-3">
              <a href="#" className="text-white no-underline hover:text-blue-500 transition">Customer Service</a>
            </li>
            <li className="mb-3">
              <a href="#" className="text-white no-underline hover:text-blue-500 transition">Delivery Information</a>
            </li>
            <li className="mb-3">
              <a href="#" className="text-white no-underline hover:text-blue-500 transition">Payments</a>
            </li>
            <li className="mb-3">
              <a href="#" className="text-white no-underline hover:text-blue-500 transition">Saved Cards</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-base uppercase mb-6 tracking-wider font-semibold">My Account</h3>
          <ul className="list-none p-0 m-0">
            <li className="mb-3">
              <a href="#" className="text-white no-underline hover:text-blue-500 transition">My Account</a>
            </li>
            <li className="mb-3">
              <a href="#" className="text-white no-underline hover:text-blue-500 transition">My Shop</a>
            </li>
            <li className="mb-3">
              <a href="#" className="text-white no-underline hover:text-blue-500 transition">My Cart</a>
            </li>
            <li className="mb-3">
              <a href="#" className="text-white no-underline hover:text-blue-500 transition">Checkout</a>
            </li>
            <li className="mb-3">
              <a href="#" className="text-white no-underline hover:text-blue-500 transition">My Wishlist</a>
            </li>
            <li className="mb-3">
              <a href="#" className="text-white no-underline hover:text-blue-500 transition">Tracking Order</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-base uppercase mb-6 font-semibold">Newsletter</h3>
          <p className="text-[#b0b5be] mb-5 leading-relaxed">
            Subscribe to our mailing list to get the new updates!
          </p>
          <div className="flex mb-6">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 py-3 px-4 border-none outline-none text-sm bg-white text-gray-900"
              required
            />
            <button className="bg-[#2b78f1] text-white border-none px-6 font-bold uppercase cursor-pointer hover:bg-[#1a62d8]">
              Sign Up
            </button>
          </div>
          <div className="flex gap-2 flex-wrap">
            <a href="#" className="w-8 h-8 flex items-center justify-center text-white no-underline rounded-sm text-sm bg-[#3b5998] hover:opacity-80">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="w-8 h-8 flex items-center justify-center text-white no-underline rounded-sm text-sm bg-black hover:opacity-80">
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
            <a href="#" className="w-8 h-8 flex items-center justify-center text-white no-underline rounded-sm text-sm bg-[#0077b5] hover:opacity-80">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
            <a href="#" className="w-8 h-8 flex items-center justify-center text-white no-underline rounded-sm text-sm bg-[#e4405f] hover:opacity-80">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="w-8 h-8 flex items-center justify-center text-white no-underline rounded-sm text-sm bg-[#bd081c] hover:opacity-80">
              <FontAwesomeIcon icon={faPinterestP} />
            </a>
            <a href="#" className="w-8 h-8 flex items-center justify-center text-white no-underline rounded-sm text-sm bg-[#f26522] hover:opacity-80">
              <FontAwesomeIcon icon={faRss} />
            </a>
            <a href="#" className="w-8 h-8 flex items-center justify-center text-white no-underline rounded-sm text-sm bg-[#cd201f] hover:opacity-80">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[#2d3748] pt-6">
        <div className="max-w-[1200px] mx-auto px-5 flex justify-between items-center">
          <div className="text-[#b0b5be]">
            Kapee © 2026 by PressLayouts All Rights Reserved.
          </div>
          <div className="flex gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6 bg-white py-0.5 px-1 rounded object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6 bg-white py-0.5 px-1 rounded object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" className="h-6 bg-white py-0.5 px-1 rounded object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Maestro" className="h-6 bg-white py-0.5 px-1 rounded object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="Mastercard" className="h-6 bg-white py-0.5 px-1 rounded object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" alt="Amex" className="h-6 bg-white py-0.5 px-1 rounded object-contain" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
