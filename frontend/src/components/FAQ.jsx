import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const faqs = [
  {
    question: '¿Cómo funciona el escaneo de códigos ZIP?',
    answer: 'Nuestra inteligencia artificial escanea cada 48 horas todos los códigos postales en Estados Unidos utilizando parámetros y algoritmos avanzados. Analizamos la disponibilidad en Instacart, DoorDash y Spark Driver para encontrar las zonas con mayor probabilidad de aceptación, evitando así las temidas listas de espera.'
  },
  {
    question: '¿El número de teléfono es realmente gratis?',
    answer: '¡Sí! Proporcionamos un número de teléfono completamente gratuito sin ninguna renta mensual. Este número puede recibir llamadas y mensajes de texto (SMS), lo cual es perfecto para registrarte en todas las aplicaciones de gig que necesites sin costo adicional.'
  },
  {
    question: '¿Qué incluye la guía paso a paso?',
    answer: 'Cada guía incluye instrucciones detalladas y específicas para abrir tu cuenta en la aplicación seleccionada (Instacart, DoorDash o Spark Driver). Te mostramos exactamente qué información necesitas, cómo llenar cada campo, qué documentos preparar, y los mejores códigos ZIP para usar basados en nuestro análisis de IA.'
  },
  {
    question: '¿Cuánto cuesta usar GIG ZipFinder?',
    answer: 'GIG ZipFinder cuesta $5.00 USD por cada aplicación que desees abrir. Es un pago único, sin suscripciones ni rentas mensuales. Por ese precio obtienes: 5 códigos postales con alto potencial, guía completa paso a paso, número de teléfono gratuito, y acceso a actualizaciones de nuestra IA cada 48 horas.'
  },
  {
    question: '¿En qué apps funciona GIG ZipFinder?',
    answer: 'Actualmente GIG ZipFinder es compatible con las tres principales aplicaciones de delivery: Instacart (compras y entrega de comestibles), DoorDash (entrega de comida y abarrotes), y Spark Driver (servicio de entrega de Walmart). Estamos trabajando para agregar más aplicaciones próximamente.'
  },
  {
    question: '¿Realmente evito las listas de espera?',
    answer: 'Nuestro sistema de IA identifica códigos ZIP con alta probabilidad de disponibilidad inmediata. Sin embargo, NO podemos garantizar 100% de aceptación ya que las apps cambian constantemente sus criterios y la demanda es muy alta. SUGERIMOS códigos basados en análisis continuo, pero los resultados pueden variar. Por la alta demanda, no garantizamos que los códigos sugeridos permanezcan abiertos o funcionen en todos los casos. Somos una herramienta de ayuda, no socios de las apps mencionadas.'
  },
  {
    question: '¿La app está disponible para iOS y Android?',
    answer: 'La APK para Android está disponible ahora mismo para descarga directa desde nuestra página web. La versión para Google Play Store y Apple App Store estará disponible próximamente. Te notificaremos cuando estén listas estas versiones.'
  },
  {
    question: '¿Cómo se procesa el pago?',
    answer: 'Todos los pagos se procesan de forma segura a través de Stripe, uno de los procesadores de pagos más confiables del mundo. Aceptamos Visa, Mastercard, y American Express. Tus datos financieros están completamente protegidos y encriptados.'
  },
  {
    question: '¿Puedo usar el mismo número para varias apps?',
    answer: 'Sí, el número de teléfono que te proporcionamos puede ser usado para registrarte en múltiples aplicaciones. Recibirás todos los SMS y llamadas necesarios para completar el proceso de verificación en cada una de ellas.'
  },
  {
    question: '¿Qué pasa si el código ZIP no funciona?',
    answer: 'Debido a la alta demanda y cambios constantes en las apps de delivery, NO podemos garantizar que los códigos ZIP sugeridos siempre estarán disponibles o funcionarán en todos los casos. Nuestra IA proporciona SUGERENCIAS basadas en análisis de datos, pero la disponibilidad puede cambiar rápidamente. Somos una herramienta de ayuda INDEPENDIENTE, NO somos afiliados ni socios de Instacart, DoorDash, Spark Driver o cualquier otra plataforma mencionada.'
  }
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-20 lg:py-32 relative overflow-hidden bg-gradient-to-b from-[#0f172a]/50 to-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Preguntas </span>
            <span className="text-gradient">Frecuentes</span>
          </h2>
          <p className="text-lg text-gray-300">
            Todo lo que necesitas saber sobre GIG ZipFinder
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-[#1e293b] rounded-xl border border-cyan-500/20 px-6 data-[state=open]:border-cyan-500/50 transition-all"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6 text-white font-semibold text-lg hover:text-cyan-400 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA - REMOVED */}
      </div>
    </section>
  );
};
