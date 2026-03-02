import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Download, Smartphone, Apple, AlertCircle, BookOpen } from 'lucide-react';
import axios from 'axios';
import { trackAPKDownload, trackStoreClick } from '../utils/analytics';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const DownloadSection = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [apkAvailable, setApkAvailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('direct');
  const [storeLinks, setStoreLinks] = useState({
    google_play_url: null,
    apple_store_url: null
  });

  useEffect(() => {
    checkApkAvailability();
    fetchStoreLinks();
  }, []);

  const fetchStoreLinks = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/settings/store-links`);
      setStoreLinks(response.data);
    } catch (error) {
      console.error('Error fetching store links:', error);
    }
  };

  const checkApkAvailability = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/apk/apk-info`);
      setApkAvailable(response.data.exists);
    } catch (error) {
      console.error('Error checking APK:', error);
      setApkAvailable(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadAPK = async () => {
    try {
      trackAPKDownload();
      window.location.href = `${BACKEND_URL}/api/apk/download-apk`;
    } catch (error) {
      console.error('Error downloading APK:', error);
    }
  };

  const handleStoreClick = (store, url) => {
    if (url) {
      trackStoreClick(store);
      window.open(url, '_blank');
    }
  };

  const getInstallGuideUrl = () => {
    const language = i18n.language;
    if (language === 'en') return '/how-to-install';
    if (language === 'pt') return '/como-instalar-pt';
    return '/como-instalar'; // Spanish is default
  };

  return (
    <section id="download" className="py-20 px-4 bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">{t('download.title')} </span>
            <span className="text-gradient">{t('download.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-gray-300">
            {t('download.subtitle')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-[#1e293b] rounded-3xl p-8 lg:p-10 border-2 border-cyan-500/50 card-glow">
            
            {/* Tabs */}
            <div className="flex gap-2 mb-8 border-b border-cyan-500/20 overflow-x-auto">
              <button
                onClick={() => setActiveTab('direct')}
                className={`flex-1 py-4 px-6 font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'direct'
                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                    : 'text-gray-400 hover:text-cyan-400'
                }`}
              >
                <Download className="inline-block mr-2" size={20} />
                Descarga Directa
              </button>
              <button
                onClick={() => setActiveTab('google')}
                className={`flex-1 py-4 px-6 font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'google'
                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                    : 'text-gray-400 hover:text-cyan-400'
                }`}
              >
                <Smartphone className="inline-block mr-2" size={20} />
                Google Play
              </button>
              <button
                onClick={() => setActiveTab('apple')}
                className={`flex-1 py-4 px-6 font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'apple'
                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                    : 'text-gray-400 hover:text-cyan-400'
                }`}
              >
                <Apple className="inline-block mr-2" size={20} />
                App Store
              </button>
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px]">
              
              {/* Direct Download Tab */}
              {activeTab === 'direct' && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <Download className="mx-auto text-cyan-400 mb-4" size={64} />
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {t('download.downloadAPK')}
                    </h3>
                    <p className="text-gray-400">
                      Descarga el archivo APK directamente • 96MB • Android 8.0+
                    </p>
                  </div>

                  {loading ? (
                    <Button 
                      disabled
                      className="w-full bg-cyan-500/50 text-white font-bold text-lg py-6 rounded-full cursor-wait"
                    >
                      {t('download.checking')}
                    </Button>
                  ) : apkAvailable ? (
                    <>
                      <Button 
                        onClick={handleDownloadAPK}
                        className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-bold text-lg py-6 rounded-full btn-primary group"
                      >
                        <Download className="mr-2 group-hover:animate-bounce" size={24} />
                        {t('download.downloadAPK')} (96MB)
                      </Button>
                      
                      {/* Install Guide Button */}
                      <Button 
                        onClick={() => navigate(getInstallGuideUrl())}
                        variant="outline"
                        className="w-full border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/20 font-bold text-base py-5 rounded-full"
                      >
                        <BookOpen className="mr-2" size={20} />
                        {t('download.installGuide')}
                      </Button>

                      <div className="grid grid-cols-3 gap-4 text-center text-sm">
                        <div>
                          <div className="text-cyan-400 font-bold">✓ Gratis</div>
                          <div className="text-gray-500">Sin costo</div>
                        </div>
                        <div>
                          <div className="text-cyan-400 font-bold">✓ Seguro</div>
                          <div className="text-gray-500">Verificado</div>
                        </div>
                        <div>
                          <div className="text-cyan-400 font-bold">✓ Directo</div>
                          <div className="text-gray-500">Sin esperas</div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <Button 
                        disabled
                        className="w-full bg-gray-500 text-white font-bold text-lg py-6 rounded-full cursor-not-allowed"
                      >
                        <Download className="mr-2" size={24} />
                        {t('download.apkNotAvailable')}
                      </Button>
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="text-yellow-400 flex-shrink-0 mt-0.5" size={16} />
                          <p className="text-yellow-200 text-sm">
                            {t('download.apkComingSoon')}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Google Play Tab */}
              {activeTab === 'google' && (
                <div className="space-y-6 text-center">
                  <div className="mb-6">
                    <Smartphone className="mx-auto text-cyan-400 mb-4" size={64} />
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Google Play Store
                    </h3>
                    <p className="text-gray-400">
                      Descarga desde la tienda oficial de Google
                    </p>
                  </div>

                  <Button
                    onClick={() => handleStoreClick('google', storeLinks.google_play_url)}
                    disabled={!storeLinks.google_play_url}
                    className={`w-full font-bold text-lg py-6 rounded-full ${
                      storeLinks.google_play_url
                        ? 'bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white'
                        : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <Smartphone className="mr-2" size={24} />
                    {storeLinks.google_play_url ? 'GET IT ON Google Play' : t('download.comingSoon')}
                  </Button>

                  {!storeLinks.google_play_url && (
                    <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                      <p className="text-cyan-200 text-sm">
                        La versión de Google Play estará disponible próximamente
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* App Store Tab */}
              {activeTab === 'apple' && (
                <div className="space-y-6 text-center">
                  <div className="mb-6">
                    <Apple className="mx-auto text-cyan-400 mb-4" size={64} />
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Apple App Store
                    </h3>
                    <p className="text-gray-400">
                      Descarga desde la App Store de Apple
                    </p>
                  </div>

                  <Button
                    onClick={() => handleStoreClick('apple', storeLinks.apple_store_url)}
                    disabled={!storeLinks.apple_store_url}
                    className={`w-full font-bold text-lg py-6 rounded-full ${
                      storeLinks.apple_store_url
                        ? 'bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white'
                        : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <Apple className="mr-2" size={24} />
                    {storeLinks.apple_store_url ? 'Download on the App Store' : t('download.comingSoon')}
                  </Button>

                  {!storeLinks.apple_store_url && (
                    <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                      <p className="text-cyan-200 text-sm">
                        La versión de iOS estará disponible próximamente
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Requirements */}
            <div className="mt-8 bg-[#0f172a] rounded-xl p-4 border border-cyan-500/20">
              <p className="text-gray-300 text-sm text-center">
                <span className="text-cyan-400 font-semibold">{t('download.requirements')}</span> {t('download.requirementsText')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
