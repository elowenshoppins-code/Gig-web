import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Download, Smartphone, Apple, AlertCircle } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const DownloadSection = () => {
  const [apkAvailable, setApkAvailable] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkApkAvailability();
  }, []);

  const checkApkAvailability = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/apk/apk-info`);
      setApkAvailable(response.data.exists);
    } catch (error) {
      console.error('Error checking APK availability:', error);
      setApkAvailable(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadAPK = () => {
    if (apkAvailable) {
      window.open(`${BACKEND_URL}/api/apk/download-apk`, '_blank');
    } else {
      alert('El APK no está disponible en este momento. Por favor, intenta más tarde.');
    }
  };

  return (
    <section id="download" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1754765542024-c1320f23b75a?w=1920&h=1080&fit=crop"
          alt="Download background"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0a1628]/95 to-[#0a1628]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Content */}
          <div className="bg-[#1e293b]/80 backdrop-blur-md rounded-3xl p-8 lg:p-12 border border-cyan-500/30 card-glow">
            <div className="mb-8">
              <img 
                src="https://customer-assets.emergentagent.com/job_gif-tools-central/artifacts/n4fk7fqx_icon_192x192.png"
                alt="GIG ZipFinder Logo"
                className="w-24 h-24 mx-auto mb-6 animate-float"
              />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-white">Descarga </span>
                <span className="text-gradient">GIG ZipFinder</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Obtén acceso inmediato a los mejores códigos ZIP <span className="text-yellow-400 font-semibold">SUGERIDOS</span> y comienza a maximizar tus ganancias hoy mismo
              </p>
            </div>

            {/* Download Buttons */}
            <div className="space-y-4 max-w-md mx-auto mb-8">
              {/* APK Download - Available Now or Not */}
              {loading ? (
                <Button 
                  disabled
                  className="w-full bg-cyan-500/50 text-white font-bold text-lg py-6 rounded-full cursor-wait"
                >
                  Verificando disponibilidad...
                </Button>
              ) : apkAvailable ? (
                <Button 
                  onClick={handleDownloadAPK}
                  className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-bold text-lg py-6 rounded-full btn-primary group"
                >
                  <Download className="mr-2 group-hover:animate-bounce" size={24} />
                  Descargar APK para Android
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button 
                    disabled
                    className="w-full bg-gray-500 text-white font-bold text-lg py-6 rounded-full cursor-not-allowed"
                  >
                    <Download className="mr-2" size={24} />
                    APK No Disponible
                  </Button>
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="text-yellow-400 flex-shrink-0 mt-0.5" size={16} />
                      <p className="text-yellow-200 text-sm">
                        El APK aún no ha sido cargado. Vuelve pronto.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Google Play - Coming Soon */}
              <div className="relative">
                <Button 
                  disabled
                  className="w-full bg-[#0f172a] border-2 border-cyan-500/30 text-gray-400 font-bold text-lg py-6 rounded-full cursor-not-allowed"
                >
                  <Smartphone className="mr-2" size={24} />
                  Google Play Store
                </Button>
                <span className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Próximamente
                </span>
              </div>

              {/* App Store - Coming Soon */}
              <div className="relative">
                <Button 
                  disabled
                  className="w-full bg-[#0f172a] border-2 border-cyan-500/30 text-gray-400 font-bold text-lg py-6 rounded-full cursor-not-allowed"
                >
                  <Apple className="mr-2" size={24} />
                  Apple App Store
                </Button>
                <span className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Próximamente
                </span>
              </div>
            </div>

            {/* Additional Info */}
            <div className="border-t border-cyan-500/20 pt-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-cyan-400 font-bold text-xl mb-1">Gratis</div>
                  <div className="text-gray-400 text-sm">Descarga gratuita</div>
                </div>
                <div>
                  <div className="text-cyan-400 font-bold text-xl mb-1">4.8★</div>
                  <div className="text-gray-400 text-sm">Calificación usuarios</div>
                </div>
                <div>
                  <div className="text-cyan-400 font-bold text-xl mb-1">10MB</div>
                  <div className="text-gray-400 text-sm">Tamaño de archivo</div>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="mt-8 bg-[#0f172a] rounded-xl p-4 border border-cyan-500/20">
              <p className="text-gray-300 text-sm">
                <span className="text-cyan-400 font-semibold">Requisitos:</span> Android 8.0 o superior • iOS 13.0 o superior (próximamente)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
