import { MapPin, Sun, Waves } from "lucide-react";

const destinations = [
  {
    name: "Douala",
    image: "https://res.cloudinary.com/diuvvyatm/image/upload/v1760259485/Douala_webk2k.png",
    strengths: [
      "Centre d'affaires du Cameroun",
      "Accès direct au port autonome",
      "Réseau routier en pleine modernisation",
    ],
    highlight: "Parfait pour un investissement locatif ou un siège d'entreprise dynamique.",
  },
  {
    name: "Yaoundé",
    image: "https://res.cloudinary.com/diuvvyatm/image/upload/v1760259491/Yaound%C3%A9_d3km96.png",
    strengths: [
      "Stabilité administrative",
      "Forte demande résidentielle",
      "Environnement verdoyant et sécurisé",
    ],
    highlight: "Idéal pour une résidence principale ou des bureaux institutionnels.",
  },
  {
    name: "Kribi",
    image: "https://res.cloudinary.com/diuvvyatm/image/upload/v1760259485/Kribi_dmkadf.png",
    strengths: [
      "Destination balnéaire en expansion",
      "Proximité du port en eau profonde",
      "Cadre de vie premium",
    ],
    highlight: "Le choix d'un investissement touristique ou de villégiature.",
  },
];

const ImmoplusDestinations = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-14 px-4">
      <section className="rounded-[40px] bg-white p-8 shadow-sm">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8e1118]">Notre ancrage</p>
          <h1 className="text-3xl font-extrabold uppercase tracking-[0.25em] text-[#8e1118]">
            Trois villes stratégiques pour vos ambitions
          </h1>
          <p className="text-sm leading-relaxed text-gray-700">
            IMMO-PLUS sélectionne des terrains situés dans les zones les plus attractives du pays. Chaque destination répond à
            un profil d'investissement précis pour faire de votre projet un succès durable.
          </p>
        </div>
      </section>

      <section className="grid gap-10">
        {destinations.map((destination, index) => (
          <article
            key={destination.name}
            className={`grid items-center gap-8 overflow-hidden rounded-[40px] bg-white shadow-sm lg:grid-cols-[1.1fr_0.9fr] ${
              index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
            }`}
          >
            <div className="relative h-full">
              <img src={destination.image} alt={destination.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
              <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#8e1118]">
                <MapPin className="h-3.5 w-3.5" />
                {destination.name}
              </div>
            </div>
            <div className="space-y-6 p-8">
              <h2 className="text-2xl font-extrabold text-[#8e1118]">{destination.name}</h2>
              <p className="text-sm leading-relaxed text-gray-700">{destination.highlight}</p>
              <ul className="space-y-3 text-sm text-gray-700">
                {destination.strengths.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Sun className="mt-1 h-4 w-4 text-[#f5c24b]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {destination.name === "Kribi" && (
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#0AA880]">
                  <Waves className="h-4 w-4" />
                  Investissement balnéaire d'exception
                </p>
              )}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default ImmoplusDestinations;
