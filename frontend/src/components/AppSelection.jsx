import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ShoppingCart, MapPin, TrendingUp, Star } from 'lucide-react';

export const AppSelection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const apps = [
    {
      name: 'instacart',
      title: 'Instacart',
      description: t('appSelection.instacart.description'),
      icon: '🛒',
      color: 'from-green-500 to-green-600',
      features: [
        t('appSelection.instacart.feature1'),
        t('appSelection.instacart.feature2'),
        t('appSelection.instacart.feature3')
      ]
    },
    {
      name: 'doordash',
      title: 'DoorDash',
      description: t('appSelection.doordash.description'),
      icon: '🚗',
      color: 'from-red-500 to-red-600',
      features: [
        t('appSelection.doordash.feature1'),
        t('appSelection.doordash.feature2'),
        t('appSelection.doordash.feature3')
      ]
    },
    {
      name: 'spark',
      title: 'Spark Driver',
      description: t('appSelection.spark.description'),
      icon: '⚡',
      color: 'from-yellow-500 to-yellow-600',
      features: [
        t('appSelection.spark.feature1'),
        t('appSelection.spark.feature2'),
        t('appSelection.spark.feature3')
      ]
    }
  ];

  const handlePurchase = (appName) => {
    navigate(`/purchase/${appName}`);
  };

  return (
    <section id="buy-now" className="py-20 lg:py-32 relative overflow-hidden bg-gradient-to-b from-[#0f172a]/50 to-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 text-cyan-400 text-sm font-medium mb-6">
            <Star size={16} />
            <span>{t('appSelection.badge')}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">{t('appSelection.title')} </span>
            <span className="text-gradient">{t('appSelection.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-gray-300">
            {t('appSelection.subtitle')}
          </p>
        </div>

        {/* Apps Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {apps.map((app, index) => (
            <div
              key={app.name}
              className="bg-[#1e293b] rounded-2xl p-8 border border-cyan-500/20 card-glow hover:scale-105 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* App Icon & Title */}
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{app.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{app.title}</h3>
                <p className="text-gray-400">{app.description}</p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {app.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <MapPin size={18} className="text-cyan-400 flex-shrink-0 mt-1" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-white mb-1">$20.00</div>
                <p className="text-sm text-gray-400">{t('appSelection.priceSubtitle')}</p>
              </div>

              {/* CTA Button */}
              <Button
                onClick={() => handlePurchase(app.name)}
                className={`w-full bg-gradient-to-r ${app.color} hover:opacity-90 text-white font-bold text-lg py-6 rounded-full btn-primary group`}
              >
                <ShoppingCart size={20} className="mr-2" />
                {t('appSelection.cta')}
              </Button>

              {/* Benefits */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="flex items-center justify-center gap-2 text-sm text-cyan-400">
                  <TrendingUp size={16} />
                  <span>{t('appSelection.benefit')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <p className="text-gray-400 text-sm">
            {t('appSelection.additionalInfo')}
          </p>
        </div>
      </div>
    </section>
  );
};
