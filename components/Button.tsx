
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all duration-300 ease-in-out disabled:bg-slate-400 disabled:cursor-not-allowed disabled:shadow-none transform hover:scale-105 disabled:scale-100"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
