import { Building2, CheckCircle2, Handshake, Shield, Users } from "lucide-react";

const milestones = [
  {
    year: "2010",
    title: "Naissance d'IMMO-PLUS",
    description:
      "Ouverture de la première agence à Douala pour offrir un accompagnement foncier fiable et transparent.",
  },
  {
    year: "2015",
    title: "Extension à Yaoundé",
    description:
      "Déploiement dans la capitale politique avec des programmes résidentiels et professionnels structurants.",
  },
  {
    year: "2020",
    title: "Cap sur Kribi",
    description:
      "Lancement d'opérations littorales pour répondre à la demande touristique et balnéaire croissante.",
  },
  {
    year: "Aujourd'hui",
    title: "Accompagnement 360°",
    description:
      "Une équipe pluridisciplinaire qui couvre la prospection, la construction et la gestion patrimoniale.",
  },
];

const values = [
  {
    icon: Shield,
    title: "Fiabilité",
    description: "Des démarches sécurisées et conformes aux normes juridiques locales.",
  },
  {
    icon: Handshake,
    title: "Engagement",
    description: "Une présence continue à vos côtés, de la première visite à la remise des clés.",
  },
  {
    icon: Users,
    title: "Proximité",
    description: "Des équipes implantées dans chaque ville pour comprendre vos besoins et y répondre rapidement.",
  },
  {
    icon: Building2,
    title: "Vision",
    description: "Imaginer des projets durables qui valorisent les territoires et les familles.",
  },
];

const ImmoplusAbout = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-16 px-4">
      <section className="rounded-[40px] bg-white p-8 shadow-sm">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-5">
            <h1 className="text-3xl font-extrabold uppercase tracking-[0.25em] text-[#8e1118]">
              Une histoire de confiance partagée
            </h1>
            <p className="text-sm leading-relaxed text-gray-700">
              Depuis plus d'une décennie, IMMO-PLUS accompagne les Camerounais et la diaspora dans la construction d'un
              patrimoine solide. Notre expertise couvre le foncier, l'aménagement et la valorisation des biens pour des projets
              qui s'ancrent durablement dans la réalité locale.
            </p>
            <p className="text-sm leading-relaxed text-gray-700">
              Ce qui nous anime ? L'envie de transmettre, de conseiller et d'agir avec intégrité. Chaque terrain sélectionné,
              chaque programme livré est le fruit d'études rigoureuses et d'un dialogue constant avec nos partenaires publics et
              privés.
            </p>
          </div>
          <div className="rounded-3xl border border-[#eadad6] bg-[#fdf8f5] p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 h-6 w-6 text-[#8e1118]" />
              <p className="text-sm leading-relaxed text-gray-700">
                IMMO-PLUS, c'est aussi une structure certifiée qui veille à la conformité des titres fonciers, à la transparence
                des transactions et à l'accompagnement administratif complet.
              </p>
            </div>
            <div className="mt-4 rounded-2xl bg-white p-5 text-sm text-gray-700 shadow-sm">
              <p>
                <span className="font-semibold text-[#8e1118]">+1000 familles</span> accompagnées, plus de
                <span className="font-semibold text-[#8e1118]"> 20 hectares</span> maîtrisés et
                <span className="font-semibold text-[#8e1118]"> 25 lots</span> livrés chaque année.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-10">
        <h2 className="text-3xl font-extrabold uppercase tracking-[0.25em] text-[#8e1118]">Nos valeurs</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {values.map((value) => (
            <article key={value.title} className="rounded-3xl bg-white p-6 shadow-sm">
              <value.icon className="h-8 w-8 text-[#8e1118]" />
              <h3 className="mt-4 text-lg font-semibold text-[#8e1118]">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-extrabold uppercase tracking-[0.25em] text-[#8e1118]">Repères clés</h2>
        <div className="grid gap-6 lg:grid-cols-4">
          {milestones.map((milestone) => (
            <div key={milestone.year} className="rounded-3xl border border-[#eadad6] bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8e1118]">{milestone.year}</p>
              <h3 className="mt-3 text-lg font-semibold text-[#8e1118]">{milestone.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">{milestone.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ImmoplusAbout;
