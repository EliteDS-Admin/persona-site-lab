import { useState } from "react";
import { MapPin, PlayCircle, X } from "lucide-react";

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
    name: "Gamme L",
    image: "https://res.cloudinary.com/diuvvyatm/image/upload/v1762700156/Gamme_L_t5cotd.jpg",
    features: [
      "D'un Salon Spacieux avec Salle à manger",
      "D'une Cuisine",
      "D'une douche pour les visiteurs",
      "À l'étage : De trois (03) chambres",
      "À l'étage : D'une douche commune aux deux (03) chambres",
      "Aménagement extérieur : Un Parking de 02 Voitures (disponibilité en fonction des différent site)",
      "Aménagement extérieur : Une cour avant et arrière pouvant être aménagée et servir d'air de repos.",
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
    ],
  },
];

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
