import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import type { UserRole } from '../models/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole | UserRole[]; // can accept multiple roles
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole,
  redirectTo = '/sign-in' 
}) => {
  const { token, user } = useAuthContext();

  // Not logged in
  if (!token || !user) {
    return <Navigate to={redirectTo} replace />;
  }

  //  array for easy checking
  const roles = Array.isArray(requiredRole) ? requiredRole : requiredRole ? [requiredRole] : [];

  //  check if user's role is allowed
  if (roles.length && !roles.includes(user.role)) {
    // Redirect to actual dashboard instead of denying access
    const dashboardMap: Record<UserRole, string> = {
      admin: '/admin',
      vendor: '/vendor',
      customer: '/customer',
    };
    return <Navigate to={dashboardMap[user.role] || redirectTo} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
