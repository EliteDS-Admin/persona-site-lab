import { useState } from "react";
import { MapPin, PlayCircle, X } from "lucide-react";
import { getWhatsAppUrl } from "./constants";

const cities = [
  {
    name: "Douala",
    description:
      "Terrains titrés et programmes immobiliers proches des axes routiers, de l'aéroport et des zones économiques de Bonapriso.",
    image: "https://res.cloudinary.com/diuvvyatm/image/upload/v1760259485/Douala_webk2k.png",
    video: "https://res.cloudinary.com/diuvvyatm/video/upload/v1762695897/DLA_uf1ono.mp4",
  },
  {
    name: "Yaoundé",
    description:
      "Lotissements résidentiels et maisons évolutives à proximité du Prestige Hôtel, idéales pour les familles et les investisseurs.",
    image: "https://res.cloudinary.com/diuvvyatm/image/upload/v1760259491/Yaound%C3%A9_d3km96.png",
    video: "https://res.cloudinary.com/diuvvyatm/video/upload/v1762696060/YD%C3%89_xy7d39.mp4",
  },
  {
    name: "Kribi",
    description:
      "Sites balnéaires en plein développement offrant des terrains viabilisés à deux pas des plages et du port en eau profonde.",
    image: "https://res.cloudinary.com/diuvvyatm/image/upload/v1760259485/Kribi_dmkadf.png",
    video: "https://res.cloudinary.com/diuvvyatm/video/upload/v1762696022/KRIBI_roehs7.mp4",
  },
];

const ranges = [
  {
    name: "Gamme M",
    image: "https://res.cloudinary.com/diuvvyatm/image/upload/v1766307917/Gamme_M_fvramd.jpg",
    features: [
      "Type : Maison modulaire",
      "Construction : Maçonnerie en blocs de ciment / béton armé",
      "Toiture : Tôle aluminium",
      "Superficie terrain : 100 à 300 m²",
      "Surface bâtie finale : ≈ 90 à 120 m²",
      "Nombre de chambres prévu : 1 à 3",
      "Matériaux : Locaux et durables",
      "Évolutivité : Construction par étapes, selon budget du propriétaire",
      "Coût du m² à Afanayo : 30 000 à 50 000 FCFA",
      "Coût du m² à Douala : 100 000 à 300 000 FCFA",
      "Coût du m² à Etoa : 30 000 à 50 000 FCFA",
    ],
  },
  {
    name: "Gamme L",
    image: "https://res.cloudinary.com/diuvvyatm/image/upload/v1766307919/Gamme_L_sgoswu.jpg",
    features: [
      "D'un Salon Spacieux avec Salle à manger",
      "D'une Cuisine",
      "D'une douche pour les visiteurs",
      "À l'étage : De trois (03) chambres",
      "À l'étage : D'une douche commune aux deux (03) chambres",
      "Aménagement extérieur : Un Parking de 02 Voitures (disponibilité en fonction des différent site)",
      "Aménagement extérieur : Une cour avant et arrière pouvant être aménagée et servir d'air de repos.",
      "Coût du m² à Douala : 100 000 à 300 000 FCFA",
    ],
  },
  {
    name: "Gamme XX",
    image: "https://res.cloudinary.com/diuvvyatm/image/upload/v1762700158/Gamme_XX_j4fwbn.jpg",
    features: [
      "D'un Salon Spacieux avec Salle à manger",
      "D'une Cuisine",
      "D'une douche pour les visiteurs",
      "À l'étage : D'une chambre Spacieuse avec Douche",
      "À l'étage : De deux (02) chambres pour enfants",
      "À l'étage : D'une douche commune aux deux (02) chambres",
      "À l'étage : D'une terrasse",
      "Aménagement extérieur : Un Parking de 02 Voitures",
      "Aménagement extérieur : Une large cour avant et arrière pouvant être aménagée et accueillir un barbecue ou une mini reception.",
      "Coût du m² à Douala : 100 000 à 300 000 FCFA",
      "Coût du m² à Kribi : 40 000 à 60 000 FCFA",
    ],
  },
  {
    name: "Gamme XXX",
    image: "https://res.cloudinary.com/diuvvyatm/image/upload/v1762700159/Gamme_XXX_x3e5vw.jpg",
    features: [
      "D'un Salon Spacieux avec Salle à manger",
      "D'une Cuisine Américaine (avec vue sur salon et salle à manger)",
      "D'une chambre Spacieuse avec Douche (pouvant servir de Chambre parentale ou visiteur)",
      "D'une douche pour les visiteurs",
      "À l'étage : D'un salon privé",
      "À l'étage : D'un bureau pouvant servir comme salle d'étude pour enfants",
      "À l'étage : D'une chambre Spacieuse avec Douche",
      "À l'étage : De deux (02) chambres pour enfants",
      "À l'étage : D'une douche commune aux deux (02) chambres",
      "À l'étage : D'une terrasse",
      "Aménagement extérieur : Un Parking de 02 Voitures",
      "Aménagement extérieur : Un espace aménagé pouvant accueillir une Piscine aux dimensions standards",
      "Aménagement extérieur : Une large cour avant et arrière pouvant être aménagée et accueillir un barbecue ou une Mini réception.",
      "Coût du m² à Douala : 100 000 à 300 000 FCFA",
      "Coût du m² à Kribi : 40 000 à 60 000 FCFA",
    ],
  },
];

const terrainGallery = [
  "https://res.cloudinary.com/diuvvyatm/image/upload/v1766308823/WhatsApp_Image_2025-12-03_at_17.10.28_1_tzxu6t.jpg",
  "https://res.cloudinary.com/diuvvyatm/image/upload/v1766308822/WhatsApp_Image_2025-12-03_at_17.10.27_ngdfl2.jpg",
  "https://res.cloudinary.com/diuvvyatm/image/upload/v1766308825/WhatsApp_Image_2025-12-03_at_17.10.29_1_wue77m.jpg",
  "https://res.cloudinary.com/diuvvyatm/image/upload/v1766308828/WhatsApp_Image_2025-12-03_at_17.10.28_rtjokq.jpg",
  "https://res.cloudinary.com/diuvvyatm/image/upload/v1766308830/WhatsApp_Image_2025-12-03_at_17.10.27_1_ia0zta.jpg",
  "https://res.cloudinary.com/diuvvyatm/image/upload/v1766308831/WhatsApp_Image_2025-12-03_at_17.10.29_cfelot.jpg",
  "https://res.cloudinary.com/diuvvyatm/image/upload/v1766308834/WhatsApp_Image_2025-12-03_at_17.10.30_t6ntk3.jpg",
  "https://res.cloudinary.com/diuvvyatm/image/upload/v1766308834/WhatsApp_Image_2025-12-03_at_17.10.30_1_hxct6j.jpg",
];

const terrainItems = terrainGallery.map((image, index) => ({
  id: index + 1,
  image,
}));

const ImmoplusProperties = () => {
  const [activeCity, setActiveCity] = useState<typeof cities[number] | null>(null);

  return (
    <div className="mx-auto max-w-6xl space-y-14 px-4">
      <section className="rounded-[40px] bg-white p-8 shadow-sm">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8e1118]">Nos biens</p>
          <h1 className="text-3xl font-extrabold uppercase tracking-[0.25em] text-[#8e1118]">
            Des opportunités immobilières dans trois villes stratégiques
          </h1>
          <p className="text-sm leading-relaxed text-gray-700">
            Chaque site est sélectionné pour son potentiel de croissance, sa proximité avec les infrastructures et la qualité de vie offerte aux familles.
          </p>
        </div>
      </section>

      <section className="grid gap-8">
        {cities.map((city) => (
          <article
            key={city.name}
            className="overflow-hidden rounded-[40px] bg-white shadow-sm lg:grid lg:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="relative h-full">
              <img src={city.image} alt={city.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
              <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#8e1118]">
                <MapPin className="h-3.5 w-3.5" />
                {city.name}
              </div>
            </div>
            <div className="flex flex-col gap-5 p-8">
              <h2 className="text-2xl font-extrabold text-[#8e1118]">{city.name}</h2>
              <p className="text-sm leading-relaxed text-gray-700">{city.description}</p>
              <button
                type="button"
                onClick={() => setActiveCity(city)}
                className="inline-flex w-max items-center gap-2 rounded-full bg-[#8e1118] px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-[#c51c22]"
              >
                Voir la vidéo
                <PlayCircle className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold uppercase tracking-[0.25em] text-[#8e1118]">
            Terrains vierges disponibles
          </h2>
          <p className="text-sm leading-relaxed text-gray-700">
            Nos terrains ont des superficies de 250m², 200m² et 125m²
          </p>
        </div>
        <div className="overflow-hidden rounded-[32px] border border-[#eadad6] bg-white shadow-sm">
          <div className="flex w-max gap-6 overflow-hidden py-6 animate-marquee">
            {[...terrainItems, ...terrainItems].map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="min-w-[240px] shrink-0 overflow-hidden rounded-3xl border border-[#eadad6] bg-white shadow-sm"
              >
                <div className="relative">
                  <img src={item.image} alt={`Terrain ${item.id}`} className="h-44 w-full object-cover" />
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#8e1118]">
                    Bien {item.id}
                  </div>
                </div>
                <div className="flex flex-col gap-3 p-4">
                  <p className="text-sm font-semibold text-[#8e1118]">Terrain {item.id}</p>
                  <a
                    href={getWhatsAppUrl(
                      `Je suis tombé sur votre site web et j'aimerais en savoir plus sur le bien ${item.id}.`
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-max items-center justify-center rounded-full bg-[#8e1118] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#c51c22]"
                  >
                    En savoir plus
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-10">
        <h2 className="text-3xl font-extrabold uppercase tracking-[0.25em] text-[#8e1118]">Nos gammes d'habitations</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {ranges.map((range) => (
            <article key={range.name} className="flex h-full flex-col overflow-hidden rounded-[32px] border border-[#eadad6] bg-white shadow-sm">
              <img src={range.image} alt={range.name} className="h-48 w-full object-cover" />
              <div className="flex flex-1 flex-col gap-4 p-6">
                <h3 className="text-lg font-semibold uppercase tracking-[0.3em] text-[#8e1118]">{range.name}</h3>
                <ul className="space-y-2 text-sm leading-relaxed text-gray-700">
                  {range.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#f5c24b]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={getWhatsAppUrl(
                    `Je suis tombé sur votre site web et j'aimerais en savoir plus sur la ${range.name}.`
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex w-max items-center justify-center rounded-full bg-[#8e1118] px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#c51c22]"
                >
                  En savoir plus
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {activeCity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-black shadow-2xl">
            <button
              type="button"
              onClick={() => setActiveCity(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
              aria-label="Fermer la vidéo"
            >
              <X className="h-5 w-5" />
            </button>
            <video src={activeCity.video} controls autoPlay className="h-full w-full">Votre navigateur ne supporte pas la lecture vidéo.</video>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImmoplusProperties;
