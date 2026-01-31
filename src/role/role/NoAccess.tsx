import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoAccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
      <p className="text-lg mb-6">You do not have permission to view this page.</p>
      <button
        className="bg-primary-blue text-white px-6 py-3 rounded hover:bg-dark-blue transition"
        onClick={() => navigate('/sign-in')}
      >
        Go to Sign In
      </button>
    </div>
  );
};

export default NoAccess;
