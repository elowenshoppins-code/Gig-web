import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0a1628]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img 
              src="https://customer-assets.emergentagent.com/job_gif-tools-central/artifacts/n4fk7fqx_icon_192x192.png" 
              alt="GIG ZipFinder" 
              className="h-10 w-10 sm:h-12 sm:w-12"
            />
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold">
                <span className="text-cyan-400">GIG</span>
                <span className="text-white">ZipFinder</span>
              </span>
              <span className="text-[10px] sm:text-xs text-cyan-400/80 -mt-1">Find Your Gig</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button onClick={() => scrollToSection('features')} className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">
              Características
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">
              Cómo Funciona
            </button>
            <button onClick={() => scrollToSection('pricing')} className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">
              Precios
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">
              FAQ
            </button>
            <Button 
              onClick={() => scrollToSection('download')}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-2 rounded-full btn-primary"
            >
              Descargar APK
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#0f172a] border-t border-cyan-500/20 py-4 animate-fade-in-up">
            <nav className="flex flex-col space-y-4 px-4">
              <button onClick={() => scrollToSection('features')} className="text-gray-300 hover:text-cyan-400 transition-colors text-left py-2">
                Características
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-gray-300 hover:text-cyan-400 transition-colors text-left py-2">
                Cómo Funciona
              </button>
              <button onClick={() => scrollToSection('pricing')} className="text-gray-300 hover:text-cyan-400 transition-colors text-left py-2">
                Precios
              </button>
              <button onClick={() => scrollToSection('faq')} className="text-gray-300 hover:text-cyan-400 transition-colors text-left py-2">
                FAQ
              </button>
              <Button 
                onClick={() => scrollToSection('download')}
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold w-full rounded-full"
              >
                Descargar APK
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
