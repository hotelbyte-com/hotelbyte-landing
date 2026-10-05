// SEO title/description of the full-body tier-2 routes (home, AI distribution),
// translated from the English in src/seo/routes.ts. Kept apart from the
// dictionaries so src/seo/routes.ts can read them without loading every
// locale's dictionary into the entry chunk.
type Meta = { title: string; description: string };

export const tier2SeoMeta: Record<string, { home: Meta; aiDistribution: Meta }> = {
  hi: {
    home: { title: 'Stai by HotelByte — होटल डिस्ट्रीब्यूशन प्लैटफ़ॉर्म', description: 'होटल अपने तरीके से बेचें: अपने ब्रांड के तहत बुकिंग साइट, एक इंटीग्रेशन से सभी सप्लायर, या ट्रैवल एडवाइज़र्स के लिए बुकिंग लिंक। Stai by HotelByte.' },
    aiDistribution: { title: 'AI डिस्ट्रीब्यूशन इंटरफ़ेस — एक MCP इंटीग्रेशन, सभी सप्लायर | HotelByte', description: 'AI एजेंट्स के लिए एकीकृत MCP टूल सरफ़ेस: सभी एग्रीगेटेड सप्लायर कनेक्टर्स पर सर्च, लाइव रेट्स और दो-चरण वाली कन्फ़र्म्ड बुकिंग — प्रमाण साथ रखने वाले कोट्स और कॉन्फ़िगर किए जा सकने वाले प्राइसिंग नियमों के साथ।' },
  },
  es: {
    home: { title: 'Stai by HotelByte — Plataforma de distribución hotelera', description: 'Vende hoteles a tu manera: un sitio de reservas con tu propia marca, todos los proveedores con una sola integración o enlaces de reserva para asesores de viajes. Stai by HotelByte.' },
    aiDistribution: { title: 'Interfaz de distribución con IA — Una integración MCP, todos los proveedores | HotelByte', description: 'La superficie de herramientas MCP unificada para agentes de IA: búsqueda, tarifas en tiempo real y reserva confirmada en dos fases en todos los conectores de proveedores agregados, con cotizaciones que incluyen su evidencia y reglas de precios configurables.' },
  },
  fr: {
    home: { title: 'Stai by HotelByte — Plateforme de distribution hôtelière', description: 'Vendez des hôtels à votre façon : un site de réservation sous votre propre marque, tous les fournisseurs via une seule intégration, ou des liens de réservation pour les conseillers en voyages. Stai by HotelByte.' },
    aiDistribution: { title: 'Interface de distribution IA — Une intégration MCP, tous les fournisseurs | HotelByte', description: 'La surface d’outils MCP unifiée pour les agents IA : recherche, tarifs en temps réel et réservation confirmée en deux étapes sur l’ensemble des connecteurs fournisseurs agrégés, avec des devis qui portent leurs preuves et des règles tarifaires configurables.' },
  },
  ar: {
    home: { title: 'Stai by HotelByte — منصة توزيع الفنادق', description: 'بِع الفنادق بطريقتك: موقع حجز بعلامتك التجارية، أو كل الموردين عبر تكامل واحد، أو روابط حجز لمستشاري السفر. Stai by HotelByte.' },
    aiDistribution: { title: 'واجهة التوزيع بالذكاء الاصطناعي — تكامل MCP واحد، كل الموردين | HotelByte', description: 'سطح أدوات MCP الموحّد لوكلاء الذكاء الاصطناعي: بحث وأسعار حية وحجز مؤكَّد على مرحلتين عبر جميع موصّلات الموردين، مع عروض أسعار تحمل أدلتها وقواعد تسعير قابلة للتهيئة.' },
  },
  pt: {
    home: { title: 'Stai by HotelByte — Plataforma de distribuição hoteleira', description: 'Venda hotéis do seu jeito: um site de reservas com a sua própria marca, todos os fornecedores em uma única integração ou links de reserva para consultores de viagem. Stai by HotelByte.' },
    aiDistribution: { title: 'Interface de distribuição com IA — Uma integração MCP, todos os fornecedores | HotelByte', description: 'A superfície de ferramentas MCP unificada para agentes de IA: busca, tarifas em tempo real e reserva confirmada em duas etapas em todos os conectores de fornecedores agregados, com cotações que trazem evidências e regras de preço configuráveis.' },
  },
  de: {
    home: { title: 'Stai by HotelByte — Plattform für den Hotelvertrieb', description: 'Hotels auf Ihre Weise verkaufen: eine Buchungsseite unter Ihrer Marke, alle Lieferanten über eine Integration oder Buchungslinks für Reiseberater. Stai by HotelByte.' },
    aiDistribution: { title: 'KI-Vertriebsschnittstelle — Eine MCP-Integration, alle Lieferanten | HotelByte', description: 'Die einheitliche MCP-Tool-Oberfläche für KI-Agenten: Suche, Live-Raten und zweistufig bestätigte Buchung über alle aggregierten Lieferanten-Connectoren, mit Angeboten samt Nachweis und konfigurierbaren Preisregeln.' },
  },
  tr: {
    home: { title: 'Stai by HotelByte — Otel Dağıtım Platformu', description: 'Otelleri kendi yönteminizle satın: kendi markanızla bir rezervasyon sitesi, tek entegrasyonla tüm tedarikçiler ya da seyahat danışmanları için rezervasyon bağlantıları. Stai by HotelByte.' },
    aiDistribution: { title: 'Yapay Zekâ Dağıtım Arayüzü — Tek MCP Entegrasyonu, Tüm Tedarikçiler | HotelByte', description: 'Yapay zekâ ajanları için birleşik MCP araç seti: birleştirilen tüm tedarikçi bağlayıcılarında arama, canlı fiyatlar ve iki aşamalı onaylı rezervasyon; kanıt taşıyan teklifler ve yapılandırılabilir fiyat kuralları.' },
  },
  fil: {
    home: { title: 'Stai by HotelByte — Platform para sa Hotel Distribution', description: 'Magbenta ng hotels sa sarili ninyong paraan: booking site sa sarili ninyong brand, lahat ng supplier sa iisang integration, o booking link para sa travel advisors. Stai by HotelByte.' },
    aiDistribution: { title: 'AI Distribution Interface — Isang MCP Integration, Lahat ng Supplier | HotelByte', description: 'Ang unified MCP tool surface para sa mga AI agent: search, live rates at two-phase na kumpirmadong booking sa lahat ng na-aggregate na supplier connector, kasama ang mga quote na may ebidensya at configurable na pricing rules.' },
  },
  he: {
    home: { title: 'Stai by HotelByte — פלטפורמה להפצת מלונות', description: 'מכרו מלונות בדרך שלכם: אתר הזמנות תחת המותג שלכם, כל הספקים דרך אינטגרציה אחת, או קישורי הזמנה ליועצי נסיעות. Stai by HotelByte.' },
    aiDistribution: { title: 'ממשק הפצה מבוסס AI — אינטגרציית MCP אחת, כל הספקים | HotelByte', description: 'ממשק כלי ה-MCP המאוחד לסוכני AI: חיפוש, מחירים חיים והזמנה דו-שלבית עם אישור בכל מחברי הספקים המאוגדים, עם הצעות מחיר שנושאות ראיות וכללי תמחור הניתנים להגדרה.' },
  },
};
