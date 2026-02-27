import React from 'react';
import { MapPin, Phone, BookOpen, Zap, Shield, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: MapPin,
    title: 'IA Sugiere ZIP Codes',
    description: 'Nuestra inteligencia artificial escanea cada 48 horas todos los códigos postales en Estados Unidos con parámetros y algoritmos avanzados para SUGERIR disponibilidad. Por la alta demanda, NO garantizamos que los códigos duren abiertos mucho tiempo.',
    color: 'cyan',
    image: 'https://images.unsplash.com/photo-1584254520678-31fe4dce5306?w=500&h=400&fit=crop'
  },
  {
    icon: Phone,
    title: 'Te Enseñamos Número Gratis',
    description: 'Te enseñamos cómo obtener un número de teléfono completamente gratis sin mensualidades que recibe llamadas y mensajes de texto para registrarte en todas las apps.',
    color: 'green',
    image: 'https://images.unsplash.com/photo-1609162554108-6490759499ef?w=500&h=400&fit=crop'
  },
  {
    icon: BookOpen,
    title: 'Guías Paso a Paso',
    description: 'Te ayudamos a abrir aplicaciones de gig paso a paso. Instrucciones detalladas para Instacart, DoorDash, Spark Driver y más.',
    color: 'cyan',
    image: 'https://images.unsplash.com/photo-1753939440535-f530718250ae?w=500&h=400&fit=crop'
  },
  {
    icon: Zap,
    title: 'Sugerencias Inmediatas',
    description: 'Accede a códigos ZIP SUGERIDOS con probabilidad de disponibilidad. *Sujeto a disponibilidad por alta demanda de descarga.',
    color: 'green',
  },
  {
    icon: Shield,
    title: 'Seguro y Confiable',
    description: 'Todos los números y datos están protegidos. Trabajamos con las mejores prácticas de seguridad para mantener tu información privada. NO almacenamos ni guardamos datos de pago o tarjetas de crédito.',
    color: 'cyan',
  },
  {
    icon: TrendingUp,
    title: 'Maximiza Ganancias',
    description: 'Encuentra las mejores oportunidades en las zonas con mayor demanda y aumenta tus ingresos significativamente.',
    color: 'green',
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-green-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Todo lo que Necesitas en</span>{' '}
            <span className="text-gradient">Una Sola App</span>
          </h2>
          <p className="text-lg text-gray-300">
            GIG ZipFinder te proporciona todas las herramientas necesarias para tener éxito en el mundo del delivery y gig economy
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isLargeCard = index < 3;
            
            return (
              <div
                key={index}
                className={`feature-card bg-[#1e293b] rounded-2xl p-6 lg:p-8 border border-cyan-500/20 card-glow ${
                  isLargeCard ? 'relative overflow-hidden' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {isLargeCard && feature.image && (
                  <div className="absolute inset-0 opacity-10">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] to-transparent"></div>
                  </div>
                )}

                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-xl mb-4 ${
                    feature.color === 'cyan' 
                      ? 'bg-cyan-500/20 text-cyan-400' 
                      : 'bg-green-500/20 text-green-400'
                  }`}>
                    <Icon size={28} />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Apps Supported */}
        <div className="mt-20 text-center">
          <p className="text-gray-400 mb-8 text-lg">Apps Compatibles:</p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            {[
              { name: 'Instacart', icon: '🛒', color: 'green' },
              { name: 'DoorDash', icon: '🍕', color: 'red' },
              { name: 'Spark Driver', icon: '🚗', color: 'yellow' },
            ].map((app, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 bg-[#1e293b] px-6 py-4 rounded-full border border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:scale-105"
              >
                <span className="text-3xl">{app.icon}</span>
                <span className="text-white font-semibold text-lg">{app.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
