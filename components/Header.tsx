
import React from 'react';
import { CatIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <CatIcon className="w-10 h-10 text-orange-500" />
        <h1 className="ml-3 text-2xl font-bold text-slate-800 tracking-tight">
          Cat's Animated Movie Day
        </h1>
      </div>
    </header>
  );
};

export default Header;
