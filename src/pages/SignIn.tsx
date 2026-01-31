import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import TopBar from '../components/TopBar';
import MainHeader from '../components/MainHeader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import { useLogin, useRegister, useForgotPassword } from '../hooks/useAuth';
import { useToast } from '../context/ToastContext';

type FormType = 'login' | 'signup' | 'forgot';

const SignIn = () => {
  const navigate = useNavigate();
  const [formType, setFormType] = useState<FormType>('login');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState<'admin' | 'vendor' | 'customer'>('customer');
  const [forgotEmail, setForgotEmail] = useState('');
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const forgotMutation = useForgotPassword();
  const { showToast } = useToast();
  const { user, token } = useAuthContext();

  useEffect(() => {
    if (user && token) {
      // Redirect based on user role if already logged in
      const role = user.role;
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'vendor') {
        navigate('/vendor');
      } else if (role === 'customer') {
        navigate('/customer');
      } else {
        navigate('/noaccess');
      }
    }
  }, [user, token, navigate]);

  const getSidebarContent = () => {
    switch (formType) {
      case 'login':
        return {
          title: 'Login',
          description: 'Get access to your Orders, Wishlist and Recommendations.',
        };
      case 'signup':
        return {
          title: 'Sign Up',
          description: 'Join us today to manage your orders and personalized settings.',
        };
      case 'forgot':
        return {
          title: 'Reset',
          description: "Don't worry, happens to the best of us. Let's get you back in.",
        };
    }
  };

  const content = getSidebarContent();

  return (
    <div>
      <TopBar />
      <MainHeader cartItemCount={0} cartTotal={0} wishlistCount={0} onCartClick={() => setIsCartOpen(true)} />
      <Navbar />

      <header className="w-full text-center py-16 bg-white">
        <h1 className="text-[3.5rem] mb-2 font-medium text-gray-800">My account</h1>
        <div className="text-sm text-gray-500 capitalize">Home / Shop / My account</div>
      </header>

      <main className="w-full max-w-[900px] flex bg-white shadow-[0_15px_35px_rgba(0,0,0,0.05)] border border-gray-200 my-12 mx-auto min-h-[450px]">
        <div className="bg-primary-blue text-white w-2/5 p-12 flex flex-col">
          <h2 className="text-4xl mb-5 font-medium">{content.title}</h2>
          <p className="leading-relaxed text-[1.05rem] opacity-90">{content.description}</p>
        </div>

        <div className="w-3/5 p-12">
          {formType === 'login' && (
            <form onSubmit={(e) => {
              e.preventDefault();
              loginMutation.mutate(
                { email: loginEmail, password: loginPassword },
                {
                  onSuccess: (data) => {
                    showToast('Logged in successfully', 'success');
                    // Redirect based on user role
                    const role = data.data.user.role;
                    if (role === 'admin') {
                      navigate('/admin');
                    } else if (role === 'vendor') {
                      navigate('/vendor');
                    } else if (role === 'customer') {
                      navigate('/customer');
                    } else {
                      navigate('/noaccess');
                    }
                  },
                  onError: (err: unknown) => {
                    const message = err instanceof Error ? err.message : 'Login failed';
                    showToast(message, 'error');
                  },
                }
              );
            }}>
              <div className="mb-4 flex">
                <input
                  type="email"
                  placeholder="Enter Email address"
                  className="w-full p-4 border border-gray-200 text-base outline-none focus:border-primary-blue transition"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="mb-4 flex">
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="w-full p-4 border border-gray-200 border-r-0 text-base outline-none focus:border-primary-blue transition"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="bg-primary-blue text-white border-none w-16 text-lg cursor-pointer hover:bg-dark-blue"
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
              </div>
              <div className="flex justify-between items-center my-4 mb-6">
                <label className="flex items-center gap-2 text-primary-blue text-sm cursor-pointer">
                  <input type="checkbox" className="w-[18px] h-[18px]" /> Remember me
                </label>
                <button
                  type="button"
                  onClick={() => setFormType('forgot')}
                  className="text-primary-blue no-underline text-sm hover:underline bg-transparent border-none cursor-pointer"
                >
                  Lost your password?
                </button>
              </div>
              <button className="w-full bg-primary-blue text-white border-none py-4 text-base font-bold cursor-pointer uppercase hover:bg-dark-blue transition">
                LOG IN
              </button>
              <p className="text-center mt-5 text-sm">
                New here?{' '}
                <button
                  type="button"
                  onClick={() => setFormType('signup')}
                  className="text-primary-blue no-underline hover:underline bg-transparent border-none cursor-pointer"
                >
                  Create an account
                </button>
              </p>
            </form>
          )}

          {formType === 'signup' && (
            <form onSubmit={(e) => {
              e.preventDefault();
              registerMutation.mutate(
                { name: regName, username: regUsername, email: regEmail, password: regPassword, role: regRole },
                {
                  onSuccess: (data) => {
                    showToast('Account created successfully', 'success');
                    // Auto-login and redirect based on role
                    const role = data.data.user.role;
                    if (role === 'admin') {
                      navigate('/admin');
                    } else if (role === 'vendor') {
                      navigate('/vendor');
                    } else if (role === 'customer') {
                      navigate('/customer');
                    } else {
                      navigate('/noaccess');
                    }
                  },
                  onError: (err: unknown) => {
                    const message = err instanceof Error ? err.message : 'Registration failed';
                    showToast(message, 'error');
                  },
                }
              );
            }}>
              <div className="mb-4 flex">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-4 border border-gray-200 text-base outline-none focus:border-primary-blue transition"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                />
              </div>
              <div className="mb-4 flex">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full p-4 border border-gray-200 text-base outline-none focus:border-primary-blue transition"
                  required
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                />
              </div>
              <div className="mb-4 flex">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full p-4 border border-gray-200 text-base outline-none focus:border-primary-blue transition"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
              </div>
              <div className="mb-4 flex">
                <input
                  type="password"
                  placeholder="Create Password"
                  className="w-full p-4 border border-gray-200 text-base outline-none focus:border-primary-blue transition"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />
              </div>
              <div className="mb-4 flex">
                <select
                  className="w-full p-4 border border-gray-200 text-base outline-none focus:border-primary-blue transition bg-white"
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value as any)}
                  required
                >
                  <option value="customer">Customer</option>
                  <option value="vendor">Vendor</option>
                  {/* <option value="admin">Admin</option> */}
                </select>
              </div>
              <button className="w-full bg-primary-blue text-white border-none py-4 text-base font-bold cursor-pointer uppercase hover:bg-dark-blue transition">
                REGISTER
              </button>
              <p className="text-center mt-5 text-sm">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setFormType('login')}
                  className="text-primary-blue no-underline hover:underline bg-transparent border-none cursor-pointer"
                >
                  Log In
                </button>
              </p>
            </form>
          )}

          {formType === 'forgot' && (
            <form onSubmit={(e) => {
              e.preventDefault();
              if (!forgotEmail) return;
              forgotMutation.mutate(
                { email: forgotEmail },
                {
                  onSuccess: () => {
                    showToast('Reset link sent to your email', 'success');
                  },
                  onError: (err: unknown) => {
                    const message = err instanceof Error ? err.message : 'Failed to send reset link';
                    showToast(message, 'error');
                  },
                }
              );
            }}>
              <p className="mb-5 text-[0.95rem] text-gray-600">
                Please enter your username or email address. You will receive a link to create a new password via email.
              </p>
              <div className="mb-4 flex">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full p-4 border border-gray-200 text-base outline-none focus:border-primary-blue transition"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                />
              </div>
              <button className="w-full bg-primary-blue text-white border-none py-4 text-base font-bold cursor-pointer uppercase hover:bg-dark-blue transition">
                RESET PASSWORD
              </button>
              <p className="text-center mt-5 text-sm">
                Remembered?{' '}
                <button
                  type="button"
                  onClick={() => setFormType('login')}
                  className="text-primary-blue no-underline hover:underline bg-transparent border-none cursor-pointer"
                >
                  Back to Login
                </button>
              </p>
            </form>
          )}
        </div>
      </main>

      <Footer />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={[]} />
    </div>
  );
};

export default SignIn;
