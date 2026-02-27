import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Instagram, Send, MapPin, AlertTriangle } from 'lucide-react';

export const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative overflow-hidden bg-[#0f172a] border-t border-cyan-500/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        {/* Important Disclaimer */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-12">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-yellow-400 flex-shrink-0 mt-0.5" size={20} />
            <div className="text-sm space-y-1">
              <p className="text-yellow-100">
                <span className="font-bold">{t('disclaimer.notPartners')}</span>
              </p>
              <p className="text-yellow-100/80">
                {t('disclaimer.noDataStorage')}
              </p>
            </div>
          </div>
        </div>

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
              {t('footer.description')}
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
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  {t('nav.features')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  {t('nav.howItWorks')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('pricing')}
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  {t('nav.pricing')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('faq')}
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  {t('nav.faq')}
                </button>
              </li>
            </ul>
          </div>

          {/* Supported Apps */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t('footer.supportedApps')}</h3>
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
                <span className="text-cyan-400">⏱</span> {t('footer.moreComingSoon')}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cyan-500/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} GIG ZipFinder. {t('footer.rights')}
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <button 
                onClick={() => navigate('/privacy')} 
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                {t('footer.privacy')}
              </button>
              <button 
                onClick={() => navigate('/terms')} 
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                {t('footer.terms')}
              </button>
            </div>
          </div>
          
          {/* Location */}
          <div className="text-center mt-6">
            <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
              <MapPin size={16} className="text-cyan-400" />
              <span>{t('footer.serving')} 🇺🇸</span>
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
