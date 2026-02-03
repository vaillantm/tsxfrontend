import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface CartSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  // Accept legacy prop without using it to avoid TS errors where it's still passed
  items?: unknown;
}

const CartSidebar = (props: CartSidebarProps) => {
  const navigate = useNavigate();
  const { isOpen, close, items, updateQty, removeItem, subtotal } = useCart();

  // Back-compat with previous prop-driven usage
  const isOpenDisplay = isOpen || !!props.isOpen;
  const handleClose = () => {
    close();
    props.onClose?.();
  };

  const progress = Math.min(100, Math.round((subtotal / 200) * 100));
  const toFreeShipping = Math.max(0, 200 - subtotal);

  return (
    <>
      <div
        className={`fixed top-0 right-0 w-[360px] h-full bg-white border-l border-gray-200 shadow-[-5px_0_25px_rgba(0,0,0,0.15)] z-[1001] transition-transform duration-300 ease-in-out flex flex-col ${
          isOpenDisplay ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="bg-blue-600 text-white px-4 py-3 flex items-center font-semibold text-base">
          <button
            onClick={handleClose}
            className="bg-transparent border-none text-white text-xl cursor-pointer mr-20 flex items-center hover:opacity-90"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <span>MY CART</span>
        </div>

        {items.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center p-10 text-center">
            <FontAwesomeIcon icon={faBagShopping} className="text-[100px] text-gray-600 mb-6 opacity-80" />
            <p className="text-base font-semibold text-gray-800 mb-8 tracking-wider">
              SHOPPING CART IS EMPTY!
            </p>
            <button
              onClick={() => {
                navigate('/shop/jewellery');
                handleClose();
              }}
              className="bg-blue-600 text-white border-none py-4 px-10 font-bold cursor-pointer w-full uppercase transition hover:bg-blue-700"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              {items.map((item) => (
                <div key={item.productId} className="flex p-4 border-b border-gray-100 items-start">
                  <img src={item.image} alt={item.name} className="w-[75px] h-auto border border-gray-200" />
                  <div className="flex-1 pl-4">
                    <div className="flex justify-between items-start">
                      <div className="text-[14px] text-slate-700 leading-tight pr-2">{item.name}</div>
                      <button
                        className="text-slate-400 text-lg"
                        onClick={() => removeItem(item.productId)}
                      >
                        &times;
                      </button>
                    </div>

                    <div className="flex items-center mt-2 mb-2">
                      <button
                        className="w-8 h-8 border border-gray-200 text-slate-500"
                        onClick={() => updateQty(item.productId, item.quantity - 1)}
                      >
                        -
                      </button>
                      <input
                        className="w-10 h-[30px] border-y border-gray-200 text-center text-slate-600"
                        value={item.quantity}
                        readOnly
                      />
                      <button
                        className="w-8 h-8 border border-gray-200 text-slate-500"
                        onClick={() => updateQty(item.productId, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <div className="text-[15px] text-slate-800">
                      {item.quantity} × <strong className="text-[18px]">${item.price.toFixed(2)}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-100">
              <div className="flex justify-between items-center font-semibold text-slate-700 text-[16px] mb-3">
                <span>SUBTOTAL:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="bg-slate-100 h-3 w-full mb-2">
                <div
                  className="bg-blue-600 h-3 text-white text-[10px] flex items-center justify-center"
                  style={{ width: `${progress}%` }}
                >
                  {progress}%
                </div>
              </div>

              <p className="text-[13px] text-slate-600 text-center mb-4">
                {toFreeShipping > 0 ? (
                  <>
                    Spend <strong>${toFreeShipping.toFixed(2)}</strong> to get free shipping
                  </>
                ) : (
                  <>
                    You have unlocked <strong>free shipping</strong>!
                  </>
                )}
              </p>

              <button
                className="w-full bg-blue-600 text-white font-bold py-3 rounded mb-2"
                onClick={() => {
                  navigate('/cart');
                }}
              >
                VIEW CART
              </button>

              <button
                className="w-full bg-orange-500 text-white font-bold py-3 rounded"
                onClick={() => {
                  navigate('/checkout');
                  handleClose();
                }}
              >
                CHECKOUT
              </button>
            </div>
          </>
        )}
      </div>

      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[1000] ${isOpenDisplay ? 'block' : 'hidden'}`}
        onClick={handleClose}
      />
    </>
  );
};

export default CartSidebar;
