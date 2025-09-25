import React, { useState } from 'react';
import ClientexLogo from './ClientexLogo';

/**
 * The navigation bar component, fixed at the top of the page.
 * @returns {React.ReactElement} The rendered navigation bar.
 */
const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = ['Inicio', 'Servicios', 'Sobre Nosotros', 'Contacto'];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-6 py-4">
        <div className="relative bg-slate-900/80 backdrop-blur-lg rounded-xl shadow-lg border border-slate-700/80 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ClientexLogo className="h-12 w-auto" />
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-slate-300 hover:text-cyan-400 transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </nav>
            <button className="hidden md:block bg-cyan-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105">
              Contactar
            </button>
            <button 
              className="md:hidden text-slate-300 p-2 rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
              )}
            </button>
          </div>
          {/* Mobile Menu Dropdown */}
          <div className={`md:hidden overflow-hidden transition-all ease-in-out duration-300 ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
            <nav className="mt-4 pt-4 border-t border-slate-700">
              <ul className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <li key={link}>
                    <a href="#" className="block text-slate-300 hover:text-cyan-400 transition-colors duration-300 text-center py-2 rounded-md hover:bg-slate-800">{link}</a>
                  </li>
                ))}
                <li>
                  <button className="w-full mt-2 bg-cyan-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-cyan-600 transition-all duration-300">Contactar</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;