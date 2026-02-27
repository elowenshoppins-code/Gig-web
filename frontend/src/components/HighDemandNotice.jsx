import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, Clock } from 'lucide-react';

export const HighDemandNotice = () => {
  const { i18n } = useTranslation();
  
  const content = {
    en: {
      title: "Important Notice About Availability",
      message: "Due to the high demand and popularity of our app, suggested ZIP codes fill up quickly. We recommend acting promptly on our suggestions. Please note that availability changes rapidly and is subject to the policies of each delivery platform. Thank you for your patience and understanding."
    },
    es: {
      title: "Aviso Importante sobre Disponibilidad",
      message: "Debido a la alta demanda y popularidad de nuestra aplicación, los códigos ZIP sugeridos se llenan rápidamente. Recomendamos actuar con prontitud sobre nuestras sugerencias. Ten en cuenta que la disponibilidad cambia rápidamente y está sujeta a las políticas de cada plataforma de delivery. Gracias por tu paciencia y comprensión."
    },
    pt: {
      title: "Aviso Importante sobre Disponibilidade",
      message: "Devido à alta demanda e popularidade do nosso aplicativo, os códigos ZIP sugeridos se preenchem rapidamente. Recomendamos agir prontamente com nossas sugestões. Note que a disponibilidade muda rapidamente e está sujeita às políticas de cada plataforma de delivery. Obrigado pela sua paciência e compreensão."
    }
  };

  const currentContent = content[i18n.language] || content.en;

  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-b from-transparent to-[#0f172a]/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/30 rounded-2xl p-8 lg:p-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-yellow-500/20 p-3 rounded-full flex-shrink-0">
                <Clock className="text-yellow-400" size={28} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                  {currentContent.title}
                </h3>
                <p className="text-gray-200 leading-relaxed text-lg">
                  {currentContent.message}
                </p>
              </div>
            </div>
            
            {/* Visual indicator */}
            <div className="mt-6 pt-6 border-t border-yellow-500/20 flex items-center justify-center gap-3 text-yellow-400">
              <AlertTriangle size={20} />
              <span className="font-semibold">High Demand • Act Fast • Limited Availability</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
