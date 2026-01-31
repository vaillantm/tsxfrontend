import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Category from './pages/Category';
import SignIn from './pages/SignIn';
import ShopApi from './pages/ShopApi';
import ShopTypeApi from './pages/ShopTypeApi';
import ProductDetail from './pages/ProductDetail';
import { CartProvider } from './context/CartContext';
import Profile from './pages/Profile';
import CartSidebar from './components/CartSidebar';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminDashboard from './role/AdminDashboard';
import VendorDashboard from './role/VendorDashboard';
import CustomerDashboard from './role/CustomerDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Admino from './role/Admino';
import NoAccess from './role/role/NoAccess';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/category/:type" element={<Category />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/admino" element={<Admino />} />
          <Route path="/shop/:type" element={<ShopTypeApi />} />
          <Route path="/shop" element={<ShopApi />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/noaccess" element={<NoAccess />} />

          {/* Protected dashboards */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer"
            element={
              <ProtectedRoute requiredRole="customer">
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vendor"
            element={
              <ProtectedRoute requiredRole="vendor">
                <VendorDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* Global cart */}
        <CartSidebar />
      </Router>
    </CartProvider>
  );
}

export default App;
