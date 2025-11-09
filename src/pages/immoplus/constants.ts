const whatsappNumber = "237677205314";
const whatsappText = encodeURIComponent(
  "Je suis tombé sur votre site web et j'aimerais en savoir plus sur vos services immobiliers."
);

export const WHATSAPP_URL = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;
