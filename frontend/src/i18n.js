import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translations
const resources = {
  en: {
    translation: {
      // Header
      "nav.features": "Features",
      "nav.howItWorks": "How It Works",
      "nav.pricing": "Pricing",
      "nav.faq": "FAQ",
      "nav.downloadAPK": "Download APK",
      "nav.tagline": "Find Your Gig",
      
      // Hero
      "hero.badge": "Maximize your delivery earnings",
      "hero.title.find": "Find",
      "hero.title.zipCodes": "ZIP Codes",
      "hero.title.withAvailability": "with High Availability",
      "hero.description": "Our AI scans every 48 hours across the United States to suggest the best ZIP codes with availability on Instacart, DoorDash and Spark Driver.",
      "hero.conditions": "Terms and availability apply",
      "hero.cta.download": "Download Free APK",
      "hero.cta.howItWorks": "How It Works",
      "hero.stats.scan": "AI Scan",
      "hero.stats.price": "Per App",
      "hero.stats.waitlist": "Waitlists",
      
      // Features
      "features.title.everything": "Everything You Need in",
      "features.title.oneApp": "One App",
      "features.subtitle": "GIG ZipFinder provides all the tools you need to succeed in delivery and gig economy",
      
      "features.ai.title": "AI Scans ZIP Codes",
      "features.ai.description": "Our artificial intelligence scans every 48 hours all ZIP codes in the United States with advanced parameters and algorithms to suggest availability. Due to high demand, we do not guarantee codes will remain open for long.",
      
      "features.phone.title": "We Teach You Free Number",
      "features.phone.description": "We teach you how to get a completely free phone number with no monthly fees that receives calls and text messages to register on all apps.",
      
      "features.guides.title": "Step-by-Step Guides",
      "features.guides.description": "We help you open gig applications step by step. Detailed instructions for Instacart, DoorDash, Spark Driver and more.",
      
      "features.immediate.title": "Immediate Results",
      "features.immediate.description": "Access suggested ZIP codes with high probability of availability and start working immediately without waitlists.",
      
      "features.secure.title": "Safe and Reliable",
      "features.secure.description": "All numbers and data are protected. We work with best security practices to keep your information private. We do not store or save payment or card data.",
      
      "features.earnings.title": "Maximize Earnings",
      "features.earnings.description": "Find the best opportunities in areas with highest demand and significantly increase your income.",
      
      "features.apps": "Compatible Apps:",
      "features.moreComingSoon": "More coming soon",
      
      // How It Works
      "howItWorks.title": "How It",
      "howItWorks.title2": "Works",
      "howItWorks.subtitle": "In just 4 simple steps, you'll be ready to start working in the best areas",
      
      "howItWorks.step1.title": "Download GIG ZipFinder",
      "howItWorks.step1.description": "Download the APK directly from our website. Compatible with Android and iOS coming soon.",
      
      "howItWorks.step2.title": "Select Your Gig App",
      "howItWorks.step2.description": "Choose between Instacart, DoorDash or Spark Driver. Our AI has already scanned the best available ZIP codes.",
      
      "howItWorks.step3.title": "Follow Step-by-Step Guide",
      "howItWorks.step3.description": "Use our detailed guides and learn how to get a free phone number to complete your registration without problems.",
      
      "howItWorks.step4.title": "Start Earning",
      "howItWorks.step4.description": "Ready! Start working in areas with high availability and maximize your earnings from day one.",
      
      "howItWorks.badge": "Simple, fast and effective!",
      
      // Pricing
      "pricing.title": "Transparent",
      "pricing.title2": "Pricing",
      "pricing.subtitle": "One-time payment per app. No subscriptions. No surprises.",
      "pricing.badge": "LAUNCH OFFER",
      "pricing.perApp": "Payment per App",
      "pricing.oneTime": "One-time payment • No monthly fees",
      "pricing.includes": "Your purchase includes:",
      
      "pricing.feature1": "Suggests you FREE 5 ZIP codes with high availability",
      "pricing.feature2": "Complete step-by-step guide to open account",
      "pricing.feature3": "We teach you how to get a free phone number",
      "pricing.feature4": "AI updates every 48 hours",
      "pricing.feature5": "Important disclaimer about availability",
      
      "pricing.secure": "Secure payment with Stripe",
      "pricing.secureDesc": "Secure payment processing. Your data is protected. We do not store or save payment or card data.",
      
      "pricing.cta": "Download and Start Now",
      "pricing.note": "Free download • Pay only when you choose your app",
      
      "pricing.methods": "Accepted payment methods:",
      
      // Download
      "download.title": "Download",
      "download.title2": "GIG ZipFinder",
      "download.subtitle": "Get immediate access to the best suggested ZIP codes and start maximizing your earnings today",
      "download.androidAPK": "Download APK for Android",
      "download.googlePlay": "Google Play Store",
      "download.appStore": "Apple App Store",
      "download.comingSoon": "Coming Soon",
      "download.free": "Free",
      "download.freeDownload": "Free download",
      "download.rating": "User rating",
      "download.size": "File size",
      "download.requirements": "Requirements:",
      "download.requirementsText": "Android 8.0 or higher • iOS 13.0 or higher (coming soon)",
      
      // FAQ
      "faq.title": "Frequently",
      "faq.title2": "Asked Questions",
      "faq.subtitle": "Everything you need to know about GIG ZipFinder",
      
      "faq.q1": "How does ZIP code scanning work?",
      "faq.a1": "Our artificial intelligence scans every 48 hours all ZIP codes in the United States using advanced parameters and algorithms. We analyze availability on Instacart, DoorDash and Spark Driver to suggest areas with highest probability of acceptance. However, due to high demand and constant changes in apps, we do not guarantee that suggested codes will remain available or work in all cases.",
      
      "faq.q2": "Is the phone number really free?",
      "faq.a2": "Yes! We teach you how to get a completely free phone number with no monthly fee. This number can receive calls and text messages (SMS), which is perfect for registering on all gig apps you need at no additional cost.",
      
      "faq.q3": "What does the step-by-step guide include?",
      "faq.a3": "Each guide includes detailed and specific instructions to open your account on the selected application (Instacart, DoorDash or Spark Driver). We show you exactly what information you need, how to fill each field, what documents to prepare, and we teach you how to get a free phone number. Plus, we suggest the best ZIP codes to use based on our AI analysis.",
      
      "faq.q4": "How much does GIG ZipFinder cost?",
      "faq.a4": "GIG ZipFinder costs $5.00 USD for each application you want to open. It's a one-time payment, no subscriptions or monthly fees. For that price you get: 5 suggested ZIP codes with high potential, complete step-by-step guide, we teach you how to get a free phone number, and access to our AI updates every 48 hours.",
      
      "faq.q5": "What apps does GIG ZipFinder work with?",
      "faq.a5": "Currently GIG ZipFinder is compatible with the three main delivery apps: Instacart (grocery shopping and delivery), DoorDash (food and grocery delivery), and Spark Driver (Walmart delivery service). We are working to add more apps soon.",
      
      "faq.q6": "Do I really avoid waitlists?",
      "faq.a6": "Our AI system identifies ZIP codes with high probability of immediate availability. While we cannot guarantee 100% acceptance (as apps constantly change their criteria and demand is high), our suggestions are based on continuous analysis. Results may vary and we do not guarantee that codes will remain open.",
      
      "faq.q7": "Is the app available for iOS and Android?",
      "faq.a7": "The APK for Android is available right now for direct download from our website. The version for Google Play Store and Apple App Store will be available soon. We will notify you when these versions are ready.",
      
      "faq.q8": "How is payment processed?",
      "faq.a8": "All payments are processed securely through Stripe, one of the world's most trusted payment processors. We accept Visa, Mastercard, and American Express. Your financial data is completely protected and encrypted. We do not store or save any payment or card information.",
      
      "faq.q9": "Can I use the same number for multiple apps?",
      "faq.a9": "Yes, the phone number we teach you how to get can be used to register on multiple applications. You will receive all necessary SMS and calls to complete the verification process on each one.",
      
      "faq.q10": "What if the ZIP code doesn't work?",
      "faq.a10": "Due to high demand and constant changes in delivery apps, we cannot guarantee that suggested ZIP codes will always be available or work in all cases. Our AI provides suggestions based on data analysis, but availability can change rapidly. We are a help tool, not partners with the mentioned apps.",
      
      "faq.stillQuestions": "Still have questions?",
      
      // Footer
      "footer.description": "The ultimate tool for gig workers. Find the best suggested ZIP codes with availability on Instacart, DoorDash and Spark Driver using artificial intelligence.",
      "footer.quickLinks": "Quick Links",
      "footer.supportedApps": "Supported Apps",
      "footer.moreComingSoon": "More coming soon",
      "footer.rights": "All rights reserved.",
      "footer.privacy": "Privacy Policy",
      "footer.terms": "Terms of Service",
      "footer.contact": "Contact",
      "footer.serving": "Serving gig workers across the United States",
      
      // Disclaimers
      "disclaimer.noGuarantee": "We do not guarantee availability. Suggestions based on AI analysis.",
      "disclaimer.notPartners": "We are not affiliated with or partners of Instacart, DoorDash, or Spark Driver. We are an independent help tool.",
      "disclaimer.highDemand": "Due to high demand, suggested ZIP codes may not remain open for long.",
      "disclaimer.noDataStorage": "We do not store or save payment data or credit card information."
    }
  },
  es: {
    translation: {
      // Header
      "nav.features": "Características",
      "nav.howItWorks": "Cómo Funciona",
      "nav.pricing": "Precios",
      "nav.faq": "FAQ",
      "nav.downloadAPK": "Descargar APK",
      "nav.tagline": "Encuentra tu Gig",
      
      // Hero
      "hero.badge": "Maximiza tus ganancias en delivery",
      "hero.title.find": "Encuentra",
      "hero.title.zipCodes": "Códigos ZIP",
      "hero.title.withAvailability": "con Alta Disponibilidad",
      "hero.description": "Nuestra IA escanea cada 48 horas todo Estados Unidos para sugerirte los mejores códigos postales con disponibilidad en Instacart, DoorDash y Spark Driver.",
      "hero.conditions": "Condiciones y disponibilidad aplican",
      "hero.cta.download": "Descargar APK Gratis",
      "hero.cta.howItWorks": "Cómo Funciona",
      "hero.stats.scan": "Escaneo IA",
      "hero.stats.price": "Por App",
      "hero.stats.waitlist": "Sugerencias",
      
      // Features
      "features.title.everything": "Todo lo que Necesitas en",
      "features.title.oneApp": "Una Sola App",
      "features.subtitle": "GIG ZipFinder te proporciona todas las herramientas necesarias para tener éxito en el mundo del delivery y gig economy",
      
      "features.ai.title": "IA Sugiere ZIP Codes",
      "features.ai.description": "Nuestra inteligencia artificial escanea cada 48 horas todos los códigos postales en Estados Unidos con parámetros y algoritmos avanzados para sugerir disponibilidad. Por la alta demanda, no garantizamos que los códigos duren abiertos mucho tiempo.",
      
      "features.phone.title": "Te Enseñamos Número Gratis",
      "features.phone.description": "Te enseñamos cómo obtener un número de teléfono completamente gratis sin mensualidades que recibe llamadas y mensajes de texto para registrarte en todas las apps.",
      
      "features.guides.title": "Guías Paso a Paso",
      "features.guides.description": "Te ayudamos a abrir aplicaciones de gig paso a paso. Instrucciones detalladas para Instacart, DoorDash, Spark Driver y más.",
      
      "features.immediate.title": "Sugerencias Inmediatas",
      "features.immediate.description": "Accede a códigos ZIP sugeridos con alta probabilidad de disponibilidad y comienza a trabajar inmediatamente.",
      
      "features.secure.title": "Seguro y Confiable",
      "features.secure.description": "Todos los números y datos están protegidos. Trabajamos con las mejores prácticas de seguridad para mantener tu información privada. No almacenamos ni guardamos datos de pago o tarjetas.",
      
      "features.earnings.title": "Maximiza Ganancias",
      "features.earnings.description": "Encuentra las mejores oportunidades en las zonas con mayor demanda y aumenta tus ingresos significativamente.",
      
      "features.apps": "Apps Compatibles:",
      "features.moreComingSoon": "Más próximamente",
      
      // How It Works
      "howItWorks.title": "Cómo",
      "howItWorks.title2": "Funciona",
      "howItWorks.subtitle": "En solo 4 pasos simples, estarás listo para empezar a trabajar en las mejores zonas",
      
      "howItWorks.step1.title": "Descarga GIG ZipFinder",
      "howItWorks.step1.description": "Descarga la APK directamente desde nuestra página web. Compatible con Android e iOS próximamente.",
      
      "howItWorks.step2.title": "Selecciona tu App de Gig",
      "howItWorks.step2.description": "Elige entre Instacart, DoorDash o Spark Driver. Nuestra IA ya escaneó los mejores ZIP codes sugeridos.",
      
      "howItWorks.step3.title": "Sigue la Guía Paso a Paso",
      "howItWorks.step3.description": "Usa nuestras guías detalladas y aprende cómo obtener un número de teléfono gratuito para completar tu registro sin problemas.",
      
      "howItWorks.step4.title": "Comienza a Ganar",
      "howItWorks.step4.description": "¡Listo! Empieza a trabajar en zonas sugeridas con disponibilidad y maximiza tus ganancias desde el primer día.",
      
      "howItWorks.badge": "¡Simple, rápido y efectivo!",
      
      // Pricing
      "pricing.title": "Precios",
      "pricing.title2": "Transparentes",
      "pricing.subtitle": "Pago único por app. Sin suscripciones. Sin sorpresas.",
      "pricing.badge": "OFERTA DE LANZAMIENTO",
      "pricing.perApp": "Pago por App",
      "pricing.oneTime": "Pago único • Sin rentas mensuales",
      "pricing.includes": "Tu compra incluye:",
      
      "pricing.feature1": "Te sugiere GRATIS 5 códigos postales con alta disponibilidad",
      "pricing.feature2": "Guía completa paso a paso para abrir cuenta",
      "pricing.feature3": "Te enseñamos cómo obtener un número de teléfono gratis",
      "pricing.feature4": "Actualizaciones de IA cada 48 horas",
      "pricing.feature5": "Aviso importante sobre disponibilidad",
      
      "pricing.secure": "Pago seguro con Stripe",
      "pricing.secureDesc": "Procesamiento seguro de pagos. Tus datos están protegidos. No almacenamos ni guardamos datos de pago o tarjetas.",
      
      "pricing.cta": "Descargar y Empezar Ahora",
      "pricing.note": "Descarga gratis • Paga solo cuando elijas tu app",
      
      "pricing.methods": "Métodos de pago aceptados:",
      
      // Download
      "download.title": "Descarga",
      "download.title2": "GIG ZipFinder",
      "download.subtitle": "Obtén acceso inmediato a los mejores códigos ZIP sugeridos y comienza a maximizar tus ganancias hoy mismo",
      "download.androidAPK": "Descargar APK para Android",
      "download.googlePlay": "Google Play Store",
      "download.appStore": "Apple App Store",
      "download.comingSoon": "Próximamente",
      "download.free": "Gratis",
      "download.freeDownload": "Descarga gratuita",
      "download.rating": "Calificación usuarios",
      "download.size": "Tamaño de archivo",
      "download.requirements": "Requisitos:",
      "download.requirementsText": "Android 8.0 o superior • iOS 13.0 o superior (próximamente)",
      
      // FAQ
      "faq.title": "Preguntas",
      "faq.title2": "Frecuentes",
      "faq.subtitle": "Todo lo que necesitas saber sobre GIG ZipFinder",
      
      "faq.q1": "¿Cómo funciona el escaneo de códigos ZIP?",
      "faq.a1": "Nuestra inteligencia artificial escanea cada 48 horas todos los códigos postales en Estados Unidos utilizando parámetros y algoritmos avanzados. Analizamos la disponibilidad en Instacart, DoorDash y Spark Driver para sugerir las zonas con mayor probabilidad de aceptación. Sin embargo, debido a la alta demanda y cambios constantes en las apps, no garantizamos que los códigos sugeridos permanezcan disponibles o funcionen en todos los casos.",
      
      "faq.q2": "¿El número de teléfono es realmente gratis?",
      "faq.a2": "¡Sí! Te enseñamos cómo obtener un número de teléfono completamente gratuito sin ninguna renta mensual. Este número puede recibir llamadas y mensajes de texto (SMS), lo cual es perfecto para registrarte en todas las aplicaciones de gig que necesites sin costo adicional.",
      
      "faq.q3": "¿Qué incluye la guía paso a paso?",
      "faq.a3": "Cada guía incluye instrucciones detalladas y específicas para abrir tu cuenta en la aplicación seleccionada (Instacart, DoorDash o Spark Driver). Te mostramos exactamente qué información necesitas, cómo llenar cada campo, qué documentos preparar, y te enseñamos cómo obtener un número de teléfono gratis. Además, te sugerimos los mejores códigos ZIP para usar basados en nuestro análisis de IA.",
      
      "faq.q4": "¿Cuánto cuesta usar GIG ZipFinder?",
      "faq.a4": "GIG ZipFinder cuesta $5.00 USD por cada aplicación que desees abrir. Es un pago único, sin suscripciones ni rentas mensuales. Por ese precio obtienes: 5 códigos postales sugeridos con alto potencial, guía completa paso a paso, te enseñamos cómo obtener un número de teléfono gratis, y acceso a actualizaciones de nuestra IA cada 48 horas.",
      
      "faq.q5": "¿En qué apps funciona GIG ZipFinder?",
      "faq.a5": "Actualmente GIG ZipFinder es compatible con las tres principales aplicaciones de delivery: Instacart (compras y entrega de comestibles), DoorDash (entrega de comida y abarrotes), y Spark Driver (servicio de entrega de Walmart). Estamos trabajando para agregar más aplicaciones próximamente.",
      
      "faq.q6": "¿Realmente evito las listas de espera?",
      "faq.a6": "Nuestro sistema de IA identifica códigos ZIP con alta probabilidad de disponibilidad inmediata. Si bien no podemos garantizar 100% de aceptación (ya que las apps cambian constantemente sus criterios y la demanda es alta), nuestras sugerencias se basan en análisis continuo. Los resultados pueden variar y no garantizamos que los códigos permanezcan abiertos.",
      
      "faq.q7": "¿La app está disponible para iOS y Android?",
      "faq.a7": "La APK para Android está disponible ahora mismo para descarga directa desde nuestra página web. La versión para Google Play Store y Apple App Store estará disponible próximamente. Te notificaremos cuando estén listas estas versiones.",
      
      "faq.q8": "¿Cómo se procesa el pago?",
      "faq.a8": "Todos los pagos se procesan de forma segura a través de Stripe, uno de los procesadores de pagos más confiables del mundo. Aceptamos Visa, Mastercard, y American Express. Tus datos financieros están completamente protegidos y encriptados. No almacenamos ni guardamos ninguna información de pago o tarjetas.",
      
      "faq.q9": "¿Puedo usar el mismo número para varias apps?",
      "faq.a9": "Sí, el número de teléfono que te enseñamos a obtener puede ser usado para registrarte en múltiples aplicaciones. Recibirás todos los SMS y llamadas necesarios para completar el proceso de verificación en cada una de ellas.",
      
      "faq.q10": "¿Qué pasa si el código ZIP no funciona?",
      "faq.a10": "Debido a la alta demanda y cambios constantes en las apps de delivery, no podemos garantizar que los códigos ZIP sugeridos siempre estarán disponibles o funcionarán en todos los casos. Nuestra IA proporciona sugerencias basadas en análisis de datos, pero la disponibilidad puede cambiar rápidamente. Somos una herramienta de ayuda, no socios de las apps mencionadas.",
      
      "faq.stillQuestions": "¿Aún tienes preguntas?",
      
      // Footer
      "footer.description": "La herramienta definitiva para gig workers. Encuentra los mejores códigos ZIP sugeridos con disponibilidad en Instacart, DoorDash y Spark Driver usando inteligencia artificial.",
      "footer.quickLinks": "Enlaces Rápidos",
      "footer.supportedApps": "Apps Soportadas",
      "footer.moreComingSoon": "Más próximamente",
      "footer.rights": "Todos los derechos reservados.",
      "footer.privacy": "Política de Privacidad",
      "footer.terms": "Términos de Servicio",
      "footer.contact": "Contacto",
      "footer.serving": "Sirviendo a gig workers en todo Estados Unidos",
      
      // Disclaimers
      "disclaimer.noGuarantee": "No garantizamos disponibilidad. Sugerencias basadas en análisis de IA.",
      "disclaimer.notPartners": "No somos afiliados ni socios de Instacart, DoorDash o Spark Driver. Somos una herramienta de ayuda independiente.",
      "disclaimer.highDemand": "Por la alta demanda, los códigos ZIP sugeridos pueden no durar abiertos mucho tiempo.",
      "disclaimer.noDataStorage": "No almacenamos ni guardamos datos de pago o información de tarjetas de crédito."
    }
  },
  pt: {
    translation: {
      // Header
      "nav.features": "Características",
      "nav.howItWorks": "Como Funciona",
      "nav.pricing": "Preços",
      "nav.faq": "FAQ",
      "nav.downloadAPK": "Baixar APK",
      "nav.tagline": "Encontre seu Gig",
      
      // Hero
      "hero.badge": "Maximize seus ganhos em delivery",
      "hero.title.find": "Encontre",
      "hero.title.zipCodes": "Códigos ZIP",
      "hero.title.withAvailability": "com Alta Disponibilidade",
      "hero.description": "Nossa IA escaneia a cada 48 horas todos os Estados Unidos para sugerir os melhores códigos postais com disponibilidade no Instacart, DoorDash e Spark Driver.",
      "hero.conditions": "Condições e disponibilidade aplicam",
      "hero.cta.download": "Baixar APK Grátis",
      "hero.cta.howItWorks": "Como Funciona",
      "hero.stats.scan": "Scan IA",
      "hero.stats.price": "Por App",
      "hero.stats.waitlist": "Sugestões",
      
      // Features
      "features.title.everything": "Tudo que Você Precisa em",
      "features.title.oneApp": "Um Único App",
      "features.subtitle": "GIG ZipFinder fornece todas as ferramentas necessárias para ter sucesso no mundo do delivery e gig economy",
      
      "features.ai.title": "IA Sugere ZIP Codes",
      "features.ai.description": "Nossa inteligência artificial escaneia a cada 48 horas todos os códigos postais nos Estados Unidos com parâmetros e algoritmos avançados para sugerir disponibilidade. Devido à alta demanda, não garantimos que os códigos permanecerão abertos por muito tempo.",
      
      "features.phone.title": "Ensinamos Número Grátis",
      "features.phone.description": "Ensinamos como obter um número de telefone completamente grátis sem mensalidades que recebe chamadas e mensagens de texto para se registrar em todos os apps.",
      
      "features.guides.title": "Guias Passo a Passo",
      "features.guides.description": "Ajudamos você a abrir aplicativos de gig passo a passo. Instruções detalhadas para Instacart, DoorDash, Spark Driver e mais.",
      
      "features.immediate.title": "Sugestões Imediatas",
      "features.immediate.description": "Acesse códigos ZIP sugeridos com alta probabilidade de disponibilidade e comece a trabalhar imediatamente.",
      
      "features.secure.title": "Seguro e Confiável",
      "features.secure.description": "Todos os números e dados estão protegidos. Trabalhamos com as melhores práticas de segurança para manter suas informações privadas. Não armazenamos nem guardamos dados de pagamento ou cartões.",
      
      "features.earnings.title": "Maximize Ganhos",
      "features.earnings.description": "Encontre as melhores oportunidades nas zonas com maior demanda e aumente sua renda significativamente.",
      
      "features.apps": "Apps Compatíveis:",
      "features.moreComingSoon": "Mais em breve",
      
      // How It Works
      "howItWorks.title": "Como",
      "howItWorks.title2": "Funciona",
      "howItWorks.subtitle": "Em apenas 4 passos simples, você estará pronto para começar a trabalhar nas melhores áreas",
      
      "howItWorks.step1.title": "Baixe GIG ZipFinder",
      "howItWorks.step1.description": "Baixe o APK diretamente do nosso site. Compatível com Android e iOS em breve.",
      
      "howItWorks.step2.title": "Selecione seu App de Gig",
      "howItWorks.step2.description": "Escolha entre Instacart, DoorDash ou Spark Driver. Nossa IA já escaneou os melhores códigos ZIP sugeridos.",
      
      "howItWorks.step3.title": "Siga o Guia Passo a Passo",
      "howItWorks.step3.description": "Use nossos guias detalhados e aprenda como obter um número de telefone gratuito para completar seu registro sem problemas.",
      
      "howItWorks.step4.title": "Comece a Ganhar",
      "howItWorks.step4.description": "Pronto! Comece a trabalhar em zonas sugeridas com disponibilidade e maximize seus ganhos desde o primeiro dia.",
      
      "howItWorks.badge": "Simples, rápido e eficaz!",
      
      // Pricing
      "pricing.title": "Preços",
      "pricing.title2": "Transparentes",
      "pricing.subtitle": "Pagamento único por app. Sem assinaturas. Sem surpresas.",
      "pricing.badge": "OFERTA DE LANÇAMENTO",
      "pricing.perApp": "Pagamento por App",
      "pricing.oneTime": "Pagamento único • Sem mensalidades",
      "pricing.includes": "Sua compra inclui:",
      
      "pricing.feature1": "Sugere GRÁTIS 5 códigos postais com alta disponibilidade",
      "pricing.feature2": "Guia completo passo a passo para abrir conta",
      "pricing.feature3": "Ensinamos como obter um número de telefone grátis",
      "pricing.feature4": "Atualizações de IA a cada 48 horas",
      "pricing.feature5": "Aviso importante sobre disponibilidade",
      
      "pricing.secure": "Pagamento seguro com Stripe",
      "pricing.secureDesc": "Processamento seguro de pagamentos. Seus dados estão protegidos. Não armazenamos nem guardamos dados de pagamento ou cartões.",
      
      "pricing.cta": "Baixar e Começar Agora",
      "pricing.note": "Download grátis • Pague apenas quando escolher seu app",
      
      "pricing.methods": "Métodos de pagamento aceitos:",
      
      // Download
      "download.title": "Baixe",
      "download.title2": "GIG ZipFinder",
      "download.subtitle": "Obtenha acesso imediato aos melhores códigos ZIP sugeridos e comece a maximizar seus ganhos hoje mesmo",
      "download.androidAPK": "Baixar APK para Android",
      "download.googlePlay": "Google Play Store",
      "download.appStore": "Apple App Store",
      "download.comingSoon": "Em Breve",
      "download.free": "Grátis",
      "download.freeDownload": "Download gratuito",
      "download.rating": "Avaliação usuários",
      "download.size": "Tamanho do arquivo",
      "download.requirements": "Requisitos:",
      "download.requirementsText": "Android 8.0 ou superior • iOS 13.0 ou superior (em breve)",
      
      // FAQ
      "faq.title": "Perguntas",
      "faq.title2": "Frequentes",
      "faq.subtitle": "Tudo que você precisa saber sobre GIG ZipFinder",
      
      "faq.q1": "Como funciona o escaneamento de códigos ZIP?",
      "faq.a1": "Nossa inteligência artificial escaneia a cada 48 horas todos os códigos postais nos Estados Unidos usando parâmetros e algoritmos avançados. Analisamos a disponibilidade no Instacart, DoorDash e Spark Driver para sugerir as áreas com maior probabilidade de aceitação. No entanto, devido à alta demanda e mudanças constantes nos apps, não garantimos que os códigos sugeridos permanecerão disponíveis ou funcionarão em todos os casos.",
      
      "faq.q2": "O número de telefone é realmente grátis?",
      "faq.a2": "Sim! Ensinamos como obter um número de telefone completamente gratuito sem nenhuma mensalidade. Este número pode receber chamadas e mensagens de texto (SMS), o que é perfeito para se registrar em todos os aplicativos de gig que você precisa sem custo adicional.",
      
      "faq.q3": "O que inclui o guia passo a passo?",
      "faq.a3": "Cada guia inclui instruções detalhadas e específicas para abrir sua conta no aplicativo selecionado (Instacart, DoorDash ou Spark Driver). Mostramos exatamente quais informações você precisa, como preencher cada campo, quais documentos preparar, e ensinamos como obter um número de telefone grátis. Além disso, sugerimos os melhores códigos ZIP para usar com base em nossa análise de IA.",
      
      "faq.q4": "Quanto custa usar GIG ZipFinder?",
      "faq.a4": "GIG ZipFinder custa $5.00 USD por cada aplicativo que você deseja abrir. É um pagamento único, sem assinaturas ou mensalidades. Por esse preço você obtém: 5 códigos postais sugeridos com alto potencial, guia completo passo a passo, ensinamos como obter um número de telefone grátis, e acesso a atualizações de nossa IA a cada 48 horas.",
      
      "faq.q5": "Em quais apps o GIG ZipFinder funciona?",
      "faq.a5": "Atualmente o GIG ZipFinder é compatível com os três principais aplicativos de delivery: Instacart (compras e entrega de mantimentos), DoorDash (entrega de comida e mantimentos) e Spark Driver (serviço de entrega do Walmart). Estamos trabalhando para adicionar mais aplicativos em breve.",
      
      "faq.q6": "Eu realmente evito as listas de espera?",
      "faq.a6": "Nosso sistema de IA identifica códigos ZIP com alta probabilidade de disponibilidade imediata. Embora não possamos garantir 100% de aceitação (já que os apps mudam constantemente seus critérios e a demanda é alta), nossas sugestões são baseadas em análise contínua. Os resultados podem variar e não garantimos que os códigos permanecerão abertos.",
      
      "faq.q7": "O app está disponível para iOS e Android?",
      "faq.a7": "O APK para Android está disponível agora mesmo para download direto do nosso site. A versão para Google Play Store e Apple App Store estará disponível em breve. Notificaremos você quando essas versões estiverem prontas.",
      
      "faq.q8": "Como o pagamento é processado?",
      "faq.a8": "Todos os pagamentos são processados com segurança através do Stripe, um dos processadores de pagamento mais confiáveis do mundo. Aceitamos Visa, Mastercard e American Express. Seus dados financeiros estão completamente protegidos e criptografados. Não armazenamos nem guardamos nenhuma informação de pagamento ou cartões.",
      
      "faq.q9": "Posso usar o mesmo número para vários apps?",
      "faq.a9": "Sim, o número de telefone que ensinamos como obter pode ser usado para se registrar em vários aplicativos. Você receberá todos os SMS e chamadas necessários para completar o processo de verificação em cada um deles.",
      
      "faq.q10": "E se o código ZIP não funcionar?",
      "faq.a10": "Devido à alta demanda e mudanças constantes nos apps de delivery, não podemos garantir que os códigos ZIP sugeridos sempre estarão disponíveis ou funcionarão em todos os casos. Nossa IA fornece sugestões baseadas em análise de dados, mas a disponibilidade pode mudar rapidamente. Somos uma ferramenta de ajuda, não parceiros dos apps mencionados.",
      
      "faq.stillQuestions": "Ainda tem perguntas?",
      
      // Footer
      "footer.description": "A ferramenta definitiva para gig workers. Encontre os melhores códigos ZIP sugeridos com disponibilidade no Instacart, DoorDash e Spark Driver usando inteligência artificial.",
      "footer.quickLinks": "Links Rápidos",
      "footer.supportedApps": "Apps Suportados",
      "footer.moreComingSoon": "Mais em breve",
      "footer.rights": "Todos os direitos reservados.",
      "footer.privacy": "Política de Privacidade",
      "footer.terms": "Termos de Serviço",
      "footer.contact": "Contato",
      "footer.serving": "Servindo gig workers em todos os Estados Unidos",
      
      // Disclaimers
      "disclaimer.noGuarantee": "Não garantimos disponibilidade. Sugestões baseadas em análise de IA.",
      "disclaimer.notPartners": "Não somos afiliados nem parceiros do Instacart, DoorDash ou Spark Driver. Somos uma ferramenta de ajuda independente.",
      "disclaimer.highDemand": "Devido à alta demanda, os códigos ZIP sugeridos podem não permanecer abertos por muito tempo.",
      "disclaimer.noDataStorage": "Não armazenamos nem guardamos dados de pagamento ou informações de cartões de crédito."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
