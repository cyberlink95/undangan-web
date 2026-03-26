import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogIn, Heart, Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isInvitationRoute = location.pathname.startsWith('/undangan/');

  // Do not show navbar on the actual invitation page
  if (isInvitationRoute) return null;

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm fixed w-full z-10 top-0 border-b border-slate-100">
      <div className="container mx-auto px-4 max-w-6xl h-16 flex items-center justify-between">
        <Link to="/" className="font-serif font-bold text-xl sm:text-2xl text-teal-800 flex items-center gap-2">
          <Heart className="text-teal-600" size={24} fill="currentColor" />
          <span className="tracking-tight">Ide-Invitation</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="text-slate-600 hover:text-teal-600 font-medium transition-colors">Galeri</Link>
          <Link to="/contact" className="text-slate-600 hover:text-teal-600 font-medium transition-colors">Contact</Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-slate-600 hover:text-teal-600 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 absolute w-full left-0 top-16 shadow-lg">
          <div className="flex flex-col px-4 py-4 space-y-4">
            <Link
              to="/"
              className="text-slate-600 hover:text-teal-600 font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Galeri
            </Link>
            <Link
              to="/contact"
              className="text-slate-600 hover:text-teal-600 font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
