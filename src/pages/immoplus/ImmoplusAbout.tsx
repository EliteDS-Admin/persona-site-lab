const objectives = [
  "Gérer l’accès à la propriété immobilière",
  "Construire de nouveaux habitats sociaux",
  "Stabiliser d’une certaine manière le patrimoine immobilier de nos clients",
  "Créer des plus-values par les différents partenaires",
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
        <h1 className="text-3xl font-extrabold uppercase tracking-[0.25em] text-[#8e1118]">
          Présentation de l'entreprise
        </h1>
        <div className="space-y-4 text-sm leading-relaxed text-gray-700">
          <p>
            Immo-plus est une composition de deux mots ; Immo qui est un diminutif de immobilier, immobilier qui représente la
            terre, le terrain, mais également la maison. Le deuxième mot PLUS, pour cette particularité sur la maison évolutive,
            concept prôné par la structure. Quand on regarde dans le passé, on parlait de hutte, de cabanes, d’abris pour se
            sophistiquées ; la particularité du PLUS nous ramène à cette évolution du bâti qui en réalité à la base symbolisait
            uniquement le cocon familial. De nos jours ce plus dans notre structure est le fait de cette innovation conceptuelle que
            nous avons de permettre d’une manière évolutive aux client finaux d’avoir accès à la propriété en passant par l’accès au
            terrain, au foncier, l’accès à un crédit dans la mesure du possible, la collaboration et la coproduction avec l’entreprise
            dans la construction de son abri ou de sa maison.
          </p>
          <p>
            Le logo d’Immo-plus reprend les deux mots Immo et Plus . Le O d’Immo est une composition de deux mains qui forment un
            cercle chapeauté par une toiture en dessous. A l’intérieur de ce O, on a en filigrane une famille, ce qui exprime le O du
            Nid, de l’unité, du cocon familial, de la protection de la famille. Une feuille de plante qui définit la croissance. Tout
            ceci arboré de deux couleurs phares à savoir le rouge bordeaux (toiture en argile cuite) et l’orange doux (mur de terre
            stabilisé).
          </p>
          <p>
            En réalité ces deux couleurs sont des résultantes d’une grande expérience de partage avec les entreprise et artisans
            fabriquant de tuiles canal en Gironde (Bordeaux France). Ces divers artisans et entreprises sont spécialisés dans la
            fabrication des éléments de couvertures en argile cuite, d’où la couleur du marron ou de l’orange en fonction de la
            cuisson de ces dits éléments.
          </p>
          <p>
            Le principal porteur de projet est la SCI ImmoPlus reconnu représenté par Mr TANKO Eli, son directeur général. La SCI
            IMMO-PLUS est une structure en développement depuis une quinzaine d’années avec à sa tête le porteur de projet en la
            personne de Mr TANKO Eli. A ses débuts ImmoPlus a été pensé pour la mise en œuvre des maisons évolutives et modulaires
            dans différente ville du Cameroun avec un concept qui adaptait le style de maison au portefeuille du propriétaire. Le
            concept était basé sur un plan modulable et une construction évolutive tout ceci en fonction du revenu du client final
            avec pour objectif principal de permettre à ce dernier d’être propriétaire d’un terrain et de vivre dans un module de sa
            facture (maison) le temps de le finaliser. C’est ce qui donne cette connotation de maison évolutive, c’est -à -dire
            construire au fur et à mesure des revenus disponibles du propriétaire ou client final. La SCI ImmoPlus pas son étude et
            son observation met sur pied un accompagnement pour crédit bancaire / immobilière pour des personnes en difficulté et à
            revenu moyen, il offre aussi ses expertises et services pour un accompagnement pour l’obtention des documents fonciers.
          </p>
          <p>
            Le Directeur général, Mr TANKO Eli du haut de ses 30ans d’expérience dans la conduite des chantiers de bâtiment et
            travaux publics, il est titulaire d’un baccalauréat F4 (Génie Civile) et un DESS (Bac+5) en gestion et innovation ; Dans
            le cadre du BTP, il est spécialisé en économie du bâtiment, ayant dans son cv plusieurs expériences de gestion et
            d’animation des grands chantiers.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-[32px] bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold uppercase tracking-[0.3em] text-[#8e1118]">Nos objectifs</h2>
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
          <h2 className="text-lg font-semibold uppercase tracking-[0.3em] text-[#8e1118]">Nos valeurs</h2>
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
        <h2 className="text-2xl font-extrabold uppercase tracking-[0.25em] text-[#8e1118]">Chiffres clés et implantations</h2>
        <p className="mt-4 text-sm leading-relaxed text-gray-700">
          Chiffres clés : nombre exact de maisons disponibles.
        </p>
        <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-[#8e1118]">Localisation</h3>
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
