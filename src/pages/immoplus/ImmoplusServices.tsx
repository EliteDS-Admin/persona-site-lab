import { Banknote, Building2, FileCheck2, ScrollText, ShieldCheck, Users } from "lucide-react";
import { WHATSAPP_URL } from "./constants";

const services = [
  {
    icon: Users,
    title: "Gestion de patrimoine pour les particuliers",
    description:
      "Immo-Plus stabilise et valorise le patrimoine immobilier de ses clients particuliers grâce à un suivi personnalisé et des solutions adaptées aux revenus de chacun.",
  },
  {
    icon: ShieldCheck,
    title: "Réalisation : étude et expertise",
    description:
      "La réalisation, l'étude et l'expertise consistent à mettre en œuvre un projet en passant par des étapes d'analyse approfondie et de validation par un spécialiste afin de garantir sa faisabilité technique, financière et sa réussite globale. Cela implique de la conception à la planification, en s'appuyant sur des données fiables et des avis professionnels pour éclairer le projet et résoudre les problèmes potentiels.",
  },
  {
    icon: FileCheck2,
    title: "Réalisation de plans de lotissement (2D, 3D)",
    description:
      "Un plan de lotissement 2D montre la division d'un terrain en parcelles (lots) à l'aide de dessins techniques plats, spécifiant la taille et l'emplacement des lots, les rues, les espaces verts et les équipements. Un plan 3D représente ce même lotissement de manière réaliste et volumétrique, offrant une visualisation tridimensionnelle pour mieux appréhender l'aménagement de l'espace, valider les choix et présenter le projet de manière plus immersive.",
  },
  {
    icon: Building2,
    title: "Vente de terrains et de maisons",
    description:
      "La vente d'un terrain ou d'une maison implique de décrire le bien (localisation, surface, composition, état), de réunir des documents légaux (titre de propriété, diagnostics), de consulter le plan d'urbanisme local (PLU), de borner le terrain et de fixer un prix. Un acte de vente détaillé est ensuite établi et signé devant notaire, incluant le prix, les modalités de paiement et les éventuelles servitudes.",
  },
  {
    icon: Banknote,
    title: "Accompagnement pour crédit bancaire",
    description:
      "L'accompagnement pour un crédit immobilier inclut plusieurs étapes clés : le conseil personnalisé, l'aide au montage du dossier, la comparaison des offres et la négociation avec les banques, afin d'obtenir des conditions de financement avantageuses.",
  },
  {
    icon: ScrollText,
    title: "Accompagnement pour l'obtention des documents fonciers",
    description:
      "L'accompagnement pour l'obtention des documents fonciers inclut l'assistance à la constitution du dossier de demande de titre foncier, la préparation des pièces justificatives, le dépôt des demandes auprès des services administratifs compétents (Services des Domaines, Cadastre, etc.), le suivi des étapes de la procédure comme le bornage et les expertises terrain, et l'obtention finale du titre foncier auprès des autorités (MINDCAF).",
  },
];

const ImmoplusServices = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-14 px-4">
      <section className="rounded-[40px] bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#8e1118]">Nos services</p>
        <h1 className="mt-3 text-balance text-2xl font-extrabold uppercase tracking-widest text-[#8e1118] sm:text-3xl lg:tracking-[0.25em]">
          Un accompagnement complet à chaque étape
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-gray-700">
          Immo-Plus mobilise ses équipes juridiques, techniques et commerciales pour sécuriser vos acquisitions, optimiser vos financements et garantir la livraison des documents fonciers.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {services.map((service) => (
          <article key={service.title} className="flex h-full flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <service.icon className="h-10 w-10 text-[#8e1118]" />
            {/* Correction : break-words, hyphens-auto, et taille réduite sur mobile pour éviter le débordement */}
            <h2 className="hyphens-auto break-words text-balance text-base font-semibold text-[#8e1118] sm:text-lg">
              {service.title}
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">{service.description}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[32px] bg-[#8e1118] p-8 text-white">
        <h2 className="text-balance text-xl font-extrabold uppercase tracking-widest sm:text-2xl lg:tracking-[0.25em]">
          Votre projet mérite un suivi personnalisé
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/85">
          De la sélection du site à la remise des clés, un conseiller Immo-Plus reste votre interlocuteur privilégié pour orchestrer les rencontres avec les banques, les notaires et les administrations.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#8e1118] transition hover:bg-[#f5c24b]"
        >
          Échanger sur WhatsApp
        </a>
      </section>
    </div>
  );
};

export default ImmoplusServices;
