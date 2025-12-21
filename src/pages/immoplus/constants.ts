const whatsappNumber = "237677205314";
const defaultMessage = "Je suis tombé sur votre site web et j'aimerais en savoir plus sur vos services immobiliers.";

export const getWhatsAppUrl = (message = defaultMessage) => {
  const whatsappText = encodeURIComponent(message);
  return `https://wa.me/${whatsappNumber}?text=${whatsappText}`;
};

export const WHATSAPP_URL = getWhatsAppUrl();
