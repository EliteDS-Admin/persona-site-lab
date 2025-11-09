const objectives = [
  "Accroître la satisfaction des clients.",
  "Créer des logements décents et des espaces communautaires.",
];

const skills = [
  "Gestion administrative et sociale.",
  "Conseils juridiques.",
  "Gestion de projets : engagement et conformité contractuelle.",
  "Gestion des chantiers.",
];

const values = [
  "Proximité client.",
  "Culture des résultats.",
  "Excellence opérationnelle.",
];

const ImmoplusAbout = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-14 px-4">
      <section className="space-y-6 rounded-[40px] bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8e1118]">À propos</p>
        <h1 className="text-3xl font-extrabold uppercase tracking-[0.25em] text-[#8e1118]">
          Présentation de l'entreprise : vision et objectifs
        </h1>
        <p className="text-sm leading-relaxed text-gray-700">
          La société IMMO-PLUS est une entreprise spécialisée dans la vente des terrains lotis et aménagés. Elle est une initiative du groupe TANKO Ets, compagnie qui évolue dans les domaines de la vente des véhicules, location, import-export et distribution de pièces détachées automobiles, bâtiments et travaux publics.
        </p>
        <p className="text-sm leading-relaxed text-gray-700">
          IMMO-PLUS a été fondée par Mr TANKO Et. La direction, assurée par Mr TANKO Et, se compose d'une équipe pluridisciplinaire mobilisée pour sécuriser vos projets immobiliers.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
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
          <h2 className="text-lg font-semibold uppercase tracking-[0.3em] text-[#8e1118]">Nos compétences</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-gray-700">
            {skills.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#f5c24b]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-[32px] bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold uppercase tracking-[0.3em] text-[#8e1118]">Nos valeurs</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-gray-700">
            {values.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#f5c24b]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="rounded-[40px] bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-extrabold uppercase tracking-[0.25em] text-[#8e1118]">Un leadership expérimenté</h2>
        <p className="mt-4 text-sm leading-relaxed text-gray-700">
          Le Directeur général, Mr TANKO Et, a plus de 30 ans d'expérience dans la conduite des chantiers et des équipes techniques. Il est titulaire d'un Master d'Audit (ENAM) et d'un Certificat de spécialité en Génie Civil (DESS). Depuis plus de 15 ans, il encadre les équipes IMMO-PLUS et structure les partenariats avec les administrations publiques et privées.
        </p>
      </section>

      <section className="rounded-[40px] bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-extrabold uppercase tracking-[0.25em] text-[#8e1118]">Valeurs et implantation</h2>
        <p className="mt-4 text-sm leading-relaxed text-gray-700">
          Valeurs : proximité client, culture des résultats, excellence opérationnelle.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Localisation : Douala (Face Institut Economique ES), BP 9300.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          Contacts : (+237) 675 926 263 / 698 120 450 / 677 205 314.
        </p>
      </section>
    </div>
  );
};

export default ImmoplusAbout;
