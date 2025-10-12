import { ClipboardCheck, Hammer, Home, Landmark, Sparkles } from "lucide-react";

const services = [
  {
    icon: Landmark,
    title: "Études foncières",
    description:
      "Analyse juridique complète, vérification des titres et accompagnement administratif pour sécuriser vos acquisitions.",
  },
  {
    icon: ClipboardCheck,
    title: "Montage de projets",
    description:
      "Business plan, simulations financières et recherche de partenaires pour donner vie à vos ambitions immobilières.",
  },
  {
    icon: Hammer,
    title: "Construction sur mesure",
    description:
      "Coordination des travaux, sélection des artisans et suivi de chantier pour des livraisons respectant vos exigences.",
  },
  {
    icon: Home,
    title: "Programmes clés en main",
    description:
      "Lotissements viabilisés, villas et immeubles prêts à habiter pour investir en toute sérénité.",
  },
  {
    icon: Sparkles,
    title: "Valorisation patrimoniale",
    description:
      "Stratégies locatives, gestion quotidienne et services premium pour optimiser vos revenus et votre image.",
  },
];

const ImmoplusServices = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-14 px-4">
      <section className="rounded-[40px] bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8e1118]">Accompagnement global</p>
        <h1 className="mt-3 text-3xl font-extrabold uppercase tracking-[0.25em] text-[#8e1118]">
          Des solutions sur mesure pour chaque projet
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-gray-700">
          Qu'il s'agisse de trouver un terrain, de bâtir un programme résidentiel ou de valoriser vos actifs, IMMO-PLUS propose
          un parcours clair, agile et humain. Nos experts pilotent chaque étape avec rigueur pour garantir des livraisons sans
          surprise.
        </p>
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        {services.map((service) => (
          <article key={service.title} className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <service.icon className="h-8 w-8 text-[#8e1118]" />
            <h2 className="mt-4 text-lg font-semibold text-[#8e1118]">{service.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-700">{service.description}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[32px] bg-[#8e1118] p-8 text-white">
        <h2 className="text-2xl font-extrabold uppercase tracking-[0.25em]">Un interlocuteur unique</h2>
        <p className="mt-3 text-sm leading-relaxed text-white/85">
          Nous coordonnons les architectes, urbanistes, juristes, banquiers et artisans pour que vous disposiez d'un point de
          contact unique. Notre méthodologie garantit des décisions rapides, des budgets maîtrisés et une expérience fluide.
        </p>
      </section>
    </div>
  );
};

export default ImmoplusServices;
