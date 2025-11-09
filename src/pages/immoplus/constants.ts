const whatsappNumber = "237675926263";
const whatsappText = encodeURIComponent(
  "Je suis tombé sur votre site web et j'aimerais en savoir plus sur vos services immobiliers."
);

export const WHATSAPP_URL = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;
