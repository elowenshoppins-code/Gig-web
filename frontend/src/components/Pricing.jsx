import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

export const Pricing = () => {
  const features = [
    'Te sugiere GRATIS 5 códigos postales con alta disponibilidad',
    'Guía completa paso a paso para abrir cuenta',
    'Te enseñamos cómo obtener un número de teléfono gratis',
    'Actualizaciones de IA cada 48 horas',
    'Aviso importante sobre disponibilidad'
  ];

  const scrollToDownload = () => {
    document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Precios </span>
            <span className="text-gradient">Transparentes</span>
          </h2>
          <p className="text-lg text-gray-300">
            Pago único por app. Sin suscripciones. Sin sorpresas.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-lg mx-auto">
          <div className="relative">
            {/* Popular Badge */}
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-green-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
              <Sparkles size={16} />
              OFERTA DE LANZAMIENTO
            </div>

            <div className="bg-[#1e293b] rounded-3xl p-8 lg:p-10 border-2 border-cyan-500/50 card-glow animate-pulse-glow mt-6">
              {/* Price */}
              <div className="text-center mb-8">
                <div className="text-gray-400 mb-2">Pago por App</div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-5xl lg:text-6xl font-bold text-white">$5.00</span>
                  <span className="text-2xl text-gray-400">USD</span>
                </div>
                <div className="text-cyan-400 font-medium">
                  Pago único • Sin rentas mensuales
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <div className="text-white font-semibold text-lg mb-4">Tu compra incluye:</div>
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-cyan-500/20 rounded-full p-1 mt-0.5">
                      <Check className="text-cyan-400" size={16} />
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Payment Info */}
              <div className="bg-[#0f172a] rounded-xl p-4 mb-6 border border-cyan-500/20">
                <div className="flex items-center gap-3 text-cyan-400 mb-2">
                  <Check size={20} />
                  <span className="font-semibold">Pago seguro con Stripe</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Procesamiento seguro de pagos. Tus datos están protegidos. <span className="text-yellow-400 font-semibold">No almacenamos ni guardamos datos de pago o tarjetas.</span>
                </p>
              </div>

              {/* CTA Button */}
              <Button 
                onClick={scrollToDownload}
                className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-bold text-lg py-6 rounded-full btn-primary"
              >
                Descargar y Empezar Ahora
              </Button>

              <p className="text-center text-gray-400 text-sm mt-4">
                Descarga gratis • Paga solo cuando elijas tu app
              </p>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">Métodos de pago aceptados:</p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            <div className="bg-white px-6 py-3 rounded-lg border border-cyan-500/20 flex items-center">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" 
                alt="Visa" 
                className="h-6 w-auto"
              />
            </div>
            <div className="bg-[#1e293b] px-6 py-3 rounded-lg border border-cyan-500/20 flex items-center">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" 
                alt="Mastercard" 
                className="h-8 w-auto"
              />
            </div>
            <div className="bg-[#1e293b] px-6 py-3 rounded-lg border border-cyan-500/20 flex items-center">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" 
                alt="American Express" 
                className="h-7 w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
