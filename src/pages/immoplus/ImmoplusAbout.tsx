import React from "react";

const objectives = [
  "Gérer l’accès à la propriété immobilière",
  "Construire de nouveaux habitats sociaux",
  "Stabiliser, de manière durable, le patrimoine immobilier de nos clients",
  "Créer des plus-values grâce à la collaboration avec différents partenaires",
  "Créer et développer des sites touristiques",
];

const values = [
  { label: "Accessibilité et social", color: "bg-[#3d6b35]" },
  { label: "Transparence et confiance", color: "bg-[#f5c24b]" },
  { label: "Engagement et proximité", color: "bg-[#8e1118]" },
];

const locations = [
  "Douala (Face Idimed Bonapriso, BP 2800, Contact 675 92 62 63)",
  "Yaoundé (Prestige Hôtel)",
  "Kribi",
];

const ImmoplusAbout: React.FC = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-14 px-4">
      <section className="space-y-6 rounded-[40px] bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8e1118]">À propos</p>
        <h1 className="text-3xl font-extrabold uppercase tracking-[0.25em] text-[#8e1118]">
          Présentation de l'entreprise
        </h1>
        <div className="space-y-4 text-sm leading-relaxed text-gray-700">
          <p>
            Immo-Plus est la combinaison de deux mots : « Immo », diminutif d'immobilier — qui désigne le terrain et
            l'habitation — et « Plus », qui symbolise l'innovation autour du concept de maison évolutive porté par la
            structure. Historiquement, on est passé de huttes et de cabanes à des constructions plus sophistiquées ; le
            « Plus » illustre cette évolution du bâti, qui dépasse le simple cocon familial.
          </p>

          <p>
            Aujourd'hui, ce « Plus » se traduit par notre approche : permettre aux clients d'accéder progressivement à la
            propriété — depuis l'acquisition du terrain et l'accompagnement foncier, jusqu'à l'accès au crédit lorsque cela
            est possible, et la coproduction ou la construction de la maison avec notre entreprise.
          </p>

          <p>
            Le logo d'Immo-Plus associe visuellement ces idées. Le « O » d'Immo est représenté par deux mains formant un
            cercle, surmonté d'une toiture. À l'intérieur, une famille en filigrane symbolise le nid, l'unité et la protection
            du foyer, tandis qu'une feuille évoque la croissance. Les couleurs phares sont le rouge bordeaux (toiture en argile
            cuite) et l'orange doux (mur de terre stabilisé).
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="mt-3 text-lg font-semibold text-[#8e1118]">Objectifs</h3>
              <ul className="mt-2 list-inside list-disc text-sm text-gray-700">
                {objectives.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mt-3 text-lg font-semibold text-[#8e1118]">Valeurs</h3>
              <ul className="mt-2 space-y-2">
                {values.map((v) => (
                  <li key={v.label} className="flex items-center gap-3">
                    <span className={`inline-block h-3 w-3 rounded-sm ${v.color}`} />
                    <span className="text-sm text-gray-700">{v.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="mt-3 text-lg font-semibold text-[#8e1118]">Implantations</h3>
            <ul className="mt-2 list-inside list-disc text-sm text-gray-700">
              {locations.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImmoplusAbout;
