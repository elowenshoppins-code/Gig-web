import React from 'react';
import { Instagram, Send, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#0f172a] border-t border-cyan-500/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="https://customer-assets.emergentagent.com/job_gif-tools-central/artifacts/n4fk7fqx_icon_192x192.png" 
                alt="GIG ZipFinder" 
                className="h-12 w-12"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-bold">
                  <span className="text-cyan-400">GIG</span>
                  <span className="text-white">ZipFinder</span>
                </span>
                <span className="text-xs text-cyan-400/80">Find Your Gig</span>
              </div>
            </div>
            <p className="text-gray-300 max-w-md mb-6">
              La herramienta definitiva para gig workers. Encuentra los mejores códigos ZIP con disponibilidad en Instacart, DoorDash y Spark Driver usando inteligencia artificial.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              <a 
                href="https://www.tiktok.com/@gigzipfinder?_r=1&_t=ZP-940uhCdyVaR"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1e293b] hover:bg-cyan-500/20 border border-cyan-500/20 hover:border-cyan-500/50 p-3 rounded-full transition-all group"
                aria-label="TikTok"
              >
                <Send className="text-cyan-400 group-hover:scale-110 transition-transform" size={20} />
              </a>
              <a 
                href="https://www.instagram.com/gigzipfinder?igsh=MWt1djhrZzRlZjJmcg=="
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1e293b] hover:bg-cyan-500/20 border border-cyan-500/20 hover:border-cyan-500/50 p-3 rounded-full transition-all group"
                aria-label="Instagram"
              >
                <Instagram className="text-cyan-400 group-hover:scale-110 transition-transform" size={20} />
              </a>
              <a 
                href="mailto:support@gigzipfinder.com"
                className="bg-[#1e293b] hover:bg-cyan-500/20 border border-cyan-500/20 hover:border-cyan-500/50 p-3 rounded-full transition-all group"
                aria-label="Email"
              >
                <Mail className="text-cyan-400 group-hover:scale-110 transition-transform" size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  Características
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  Cómo Funciona
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  Precios
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Supported Apps */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Apps Soportadas</h3>
            <ul className="space-y-3">
              <li className="text-gray-300 flex items-center gap-2">
                <span className="text-green-400">✓</span> Instacart
              </li>
              <li className="text-gray-300 flex items-center gap-2">
                <span className="text-green-400">✓</span> DoorDash
              </li>
              <li className="text-gray-300 flex items-center gap-2">
                <span className="text-green-400">✓</span> Spark Driver
              </li>
              <li className="text-gray-400 flex items-center gap-2">
                <span className="text-cyan-400">⏱</span> Más próximamente
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cyan-500/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} GIG ZipFinder. Todos los derechos reservados.
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                Términos de Servicio
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                Contacto
              </a>
            </div>
          </div>
          
          {/* Location */}
          <div className="text-center mt-6">
            <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
              <MapPin size={16} className="text-cyan-400" />
              <span>Sirviendo a gig workers en todo Estados Unidos 🇺🇸</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"></div>
    </footer>
  );
};
