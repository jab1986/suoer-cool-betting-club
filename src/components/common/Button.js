import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', // primary, secondary, outlined, danger
  size = 'md', // sm, md, lg
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'rounded-md font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50';
  
  const variantClasses = {
    primary: 'bg-wwe-red hover:bg-red-700 focus:ring-red-500 text-white',
    secondary: 'bg-wwe-gold hover:bg-yellow-600 focus:ring-yellow-500 text-black',
    outlined: 'bg-transparent border-2 border-wwe-red hover:bg-red-900/20 text-wwe-red focus:ring-red-500',
    danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
