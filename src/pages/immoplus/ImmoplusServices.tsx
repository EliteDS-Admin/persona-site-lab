import { Building2, FileCheck2, Landmark } from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Vente de terrain et de maison",
    description:
      "La vente des terrains et des maisons s'est donnée mission de décrire la liste des biens disponibles, leurs caractéristiques, leurs atouts et bien entendu le prix. IMMO-PLUS vous accompagne tout au long du processus de prospection jusqu'à la signature définitive chez le notaire.",
  },
  {
    icon: Landmark,
    title: "Accompagnement pour crédit bancaire/immobilier",
    description:
      "Pour accorder un prêt immobilier par une institution bancaire, plusieurs conditions sont nécessaires, IMMO-PLUS vous accompagne pour l'élaboration des documents administratifs et justificatifs.",
  },
  {
    icon: FileCheck2,
    title: "Accompagnement pour obtention des documents fonciers",
    description:
      "La valorisation d'un bien foncier passe par l'obtention et la sécurisation des documents administratifs. IMMO-PLUS se charge de suivre pour vous les démarches auprès des services cadastraux, notariaux et financiers (Cadastre, conservation foncière, impôts et domaines, ANOR et autres administrations (MINDAF)).",
  },
];

const ImmoplusServices = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-14 px-4">
      <section className="rounded-[40px] bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8e1118]">Nos services</p>
        <h1 className="mt-3 text-3xl font-extrabold uppercase tracking-[0.25em] text-[#8e1118]">
          Un accompagnement complet à chaque étape
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-gray-700">
          IMMO-PLUS mobilise ses équipes juridiques, techniques et commerciales pour sécuriser vos acquisitions, optimiser vos financements et garantir la livraison des documents fonciers.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {services.map((service) => (
          <article key={service.title} className="flex h-full flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <service.icon className="h-10 w-10 text-[#8e1118]" />
            <h2 className="text-lg font-semibold text-[#8e1118]">{service.title}</h2>
            <p className="text-sm leading-relaxed text-gray-700">{service.description}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[32px] bg-[#8e1118] p-8 text-white">
        <h2 className="text-2xl font-extrabold uppercase tracking-[0.25em]">Votre projet mérite un suivi personnalisé</h2>
        <p className="mt-3 text-sm leading-relaxed text-white/85">
          De la sélection du site à la remise des clés, un conseiller IMMO-PLUS reste votre interlocuteur privilégié pour orchestrer les rencontres avec les banques, les notaires et les administrations.
        </p>
      </section>
    </div>
  );
};

export default ImmoplusServices;
