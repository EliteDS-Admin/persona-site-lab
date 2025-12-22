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

const ImmoplusAbout = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-14 px-4">
      <section className="space-y-6 rounded-[40px] bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8e1118]">À propos</p>
        {/* CORRECTION: text-balance, taille responsive, tracking réduit sur mobile */}
        <h1 className="text-balance text-2xl font-extrabold uppercase tracking-widest text-[#8e1118] sm:text-3xl lg:tracking-[0.25em]">
          Présentation de l'entreprise
        </h1>
        <div className="space-y-4 text-sm leading-relaxed text-gray-700">
          <p>
            Immo-Plus est une composition de deux mots : Immo qui est un diminutif d'immobilier (représentant la
            terre, le terrain, mais également la maison) et le deuxième mot PLUS, pour cette particularité sur la maison évolutive,
            concept prôné par la structure. Quand on regarde dans le passé, on parlait de huttes, de cabanes, d’abris qui se sont
            sophistiqués ; la particularité du PLUS nous ramène à cette évolution du bâti qui, en réalité à la base, symbolisait
            uniquement le cocon familial. De nos jours, ce plus dans notre structure est le fait de cette innovation conceptuelle que
            nous avons de permettre, d’une manière évolutive, aux clients finaux d’avoir accès à la propriété en passant par l’accès au
            terrain, au foncier, l’accès à un crédit dans la mesure du possible, la collaboration et la coproduction avec l’entreprise
            dans la construction de son abri ou de sa maison.
          </p>
          <p>
            Le logo d’Immo-Plus reprend les deux mots Immo et Plus. Le O d’Immo est une composition de deux mains qui forment un
            cercle chapeauté par une toiture. À l’intérieur de ce O, on a en filigrane une famille, ce qui exprime le O du
            Nid, de l’unité, du cocon familial, de la protection de la famille. Une feuille de plante qui définit la croissance. Tout
            ceci arboré de deux couleurs phares à savoir le rouge bordeaux (toiture en argile cuite) et l’orange doux (mur de terre
            stabilisée).
          </p>
          <p>
            En réalité, ces deux couleurs sont la résultante d’une grande expérience de partage avec les entreprises et artisans
            fabricants de tuiles canal en Gironde (Bordeaux, France). Ces divers artisans et entreprises sont spécialisés dans la
            fabrication des éléments de couverture en argile cuite, d’où la couleur marron ou orange en fonction de la
            cuisson desdits éléments.
          </p>
          <p>
            Le principal porteur de projet est la SCI Immo-Plus reconnue et représentée par M. TANKO Eli, son directeur général. La SCI
            Immo-Plus est une structure en développement depuis une quinzaine d’années avec à sa tête le porteur de projet en la
            personne de M. TANKO Eli. À ses débuts, Immo-Plus a été pensée pour la mise en œuvre des maisons évolutives et modulaires
            dans différentes villes du Cameroun avec un concept qui adaptait le style de maison au portefeuille du propriétaire. Le
            concept était basé sur un plan modulable et une construction évolutive, tout ceci en fonction du revenu du client final
            avec pour objectif principal de permettre à ce dernier d’être propriétaire d’un terrain et de vivre dans un module de sa
            facture (maison) le temps de le finaliser. C’est ce qui donne cette connotation de maison évolutive, c’est-à-dire
            construire au fur et à mesure des revenus disponibles du propriétaire ou client final. La SCI Immo-Plus, par son étude et
            son observation, met sur pied un accompagnement pour crédit bancaire / immobilier pour des personnes en difficulté et à
            revenu moyen ; elle offre aussi ses expertises et services pour un accompagnement pour l’obtention des documents fonciers.
          </p>
          <p>
            Le Directeur général, M. TANKO Eli, du haut de ses 30 ans d’expérience dans la conduite des chantiers de bâtiment et
            travaux publics, est titulaire d’un baccalauréat F4 (Génie Civil) et d'un DESS (Bac+5) en gestion et innovation. Dans
            le cadre du BTP, il est spécialisé en économie du bâtiment, ayant dans son CV plusieurs expériences de gestion et
            d’animation de grands chantiers.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-[32px] bg-white p-6 shadow-sm">
          <h2 className="text-balance text-lg font-semibold uppercase tracking-widest text-[#8e1118] lg:tracking-[0.3em]">
            Nos objectifs
          </h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-gray-700">
            {objectives.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#f5c24b]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-[32px] bg-white p-6 shadow-sm">
          <h2 className="text-balance text-lg font-semibold uppercase tracking-widest text-[#8e1118] lg:tracking-[0.3em]">
            Nos valeurs
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-gray-700">
            {values.map((value) => (
              <li key={value.label} className="flex items-center gap-3">
                <span className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold uppercase tracking-[0.2em] text-white ${value.color}`}>
                  ●
                </span>
                <span>{value.label}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="rounded-[40px] bg-white p-8 shadow-sm">
        <h2 className="text-balance text-xl font-extrabold uppercase tracking-widest text-[#8e1118] sm:text-2xl lg:tracking-[0.25em]">
          Chiffres clés et implantations
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-gray-700">
          Chiffres clés : nombre exact de maisons disponibles.
        </p>
        <h3 className="mt-6 text-sm font-semibold uppercase tracking-widest text-[#8e1118] lg:tracking-[0.3em]">
          Localisation
        </h3>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
          {locations.map((location) => (
            <li key={location} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#8e1118]" />
              <span>{location}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ImmoplusAbout;
