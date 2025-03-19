import React from 'react';

const Card = ({ 
  children, 
  variant = 'default', // default, highlight, secondary
  className = '',
  ...props 
}) => {
  const baseClasses = 'rounded-lg p-6 transition-all';
  
  const variantClasses = {
    default: 'bg-zinc-800 hover:shadow-lg',
    highlight: 'bg-zinc-800 border-l-4 border-wwe-red hover:shadow-lg',
    secondary: 'bg-zinc-900 hover:shadow-lg'
  };
  
  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
