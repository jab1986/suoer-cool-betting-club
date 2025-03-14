import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-metal-gray border-t-4 border-primary py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-title text-primary">
              <span className="text-secondary">SUPER COOL</span> BETTING CLUB
            </h2>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-light">
              &copy; {currentYear} Super Cool Betting Club | All Rights Reserved
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Tracking Joe, Gaz, Sean & Dean's betting adventures
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 