import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex items-center mb-8">
        <AlertTriangle className="w-16 h-16 text-red-600 mr-4" />
        <h1 className="text-6xl md:text-8xl font-title text-primary tracking-wider">404</h1>
      </div>
      
      <div className="max-w-md mx-auto mb-12">
        <div className="text-3xl font-title mb-4 tracking-wide">PAGE NOT FOUND!</div>
        <p className="text-lg mb-6">
          OH HELL NO! The page you're looking for has been chokeslammed into oblivion!
        </p>
        
        <div className="w-full h-3 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 mb-6"></div>
        
        <p className="text-lg mb-6">
          Return to the main event or get ready for another slobberknocker!
        </p>
      </div>
      
      <Link 
        to="/" 
        className="flex items-center bg-primary text-white py-3 px-6 font-bold hover:bg-red-700 transition duration-200"
      >
        <Home className="mr-2" />
        BACK TO DASHBOARD
      </Link>
    </div>
  );
};

export default NotFound; 