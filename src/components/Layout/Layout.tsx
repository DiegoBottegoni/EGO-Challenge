import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <div className="min-h-screen flex flex-row bg-gray-50 font-sans">
      <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <main className="flex-1 w-full max-w-full pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
