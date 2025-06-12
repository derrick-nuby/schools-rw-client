import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md py-4 mb-6">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-accent-blue">
          amashuri.rw
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-accent-blue">
            Home
          </Link>
          <Link to="/schools" className="hover:text-accent-blue">
            Schools
          </Link>
          <Link to="/search" className="hover:text-accent-blue">
            Search
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
