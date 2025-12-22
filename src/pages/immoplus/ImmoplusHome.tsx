import { useState } from "react";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { WHATSAPP_URL } from "./constants";

const statements = [
  {
    key: "slogan",
    title: "Slogan",
    text: "Deviens propriétaire grâce à Immo-Plus (le boulanger de l'immobilier)",
  },
  {
    key: "message",
    title: "Message",
    text: "Réalisons ensemble votre rêve : vos ambitions, notre mission. Votre confiance, notre fondation.",
  },
  {
    key: "mission",
    title: "Mission",
    text: "Créée il y a plus de 15 ans, Immo-Plus est une société civile immobilière camerounaise spécialisée dans la vente de terrains titrés, la construction de logements et la gestion de patrimoine immobilier.",
  },
  {
    key: "volonte",
    title: "Volonté",
    text: "Immo-Plus s'engage à vous fournir un accompagnement complet, de l'obtention du titre foncier à la remise des clés. Nous vous aidons aussi à mieux gérer votre bien immobilier.",
  },
];

const highlights = [
  {
    title: "Accessibilité et social",
    description: "Notre approche rend l'accès à la propriété possible pour chaque famille grâce à des solutions adaptées.",
    color: "bg-[#3d6b35]",
  },
  {
    title: "Transparence et confiance",
    description: "Nous assurons un suivi clair des procédures et partageons chaque étape avec nos clients.",
    color: "bg-[#f5c24b]",
  },
  {
    title: "Engagement et proximité",
    description: "Présents à Douala, Yaoundé et Kribi, nous restons proches de vos chantiers et de vos attentes.",
    color: "bg-[#8e1118]",
  },
];

const ImmoplusHome = () => {
  const [activeKey, setActiveKey] = useState(statements[0].key);

  const activeStatement = statements.find((item) => item.key === activeKey) ?? statements[0];

  return (
    <div className="space-y-20">
      <section className="relative isolate overflow-hidden rounded-b-[56px] bg-black text-white sm:min-h-[600px] lg:min-h-[680px]">
        <img
          src="https://res.cloudinary.com/diuvvyatm/image/upload/v1760259484/Famille_akge15.png"
          alt="Famille souriante devant sa nouvelle maison"
          className="absolute inset-0 h-full w-full object-cover object-[center_top] sm:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" />
        <div className="relative z-10 flex min-h-[520px] items-center">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:py-20 lg:flex-row lg:items-center lg:py-24">
            <div className="space-y-6 lg:max-w-xl">
              <h1 className="text-4xl font-extrabold tracking-tight">Immo-Plus</h1>
              <p className="text-lg leading-relaxed">{activeStatement.text}</p>
              <div className="flex items-center gap-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white"
                >
                  <PlayCircle className="h-4 w-4" /> Contactez-nous
                </a>
                <Link
                  to="/a-propos"
                  className="inline-flex items-center gap-2 rounded-full bg-[#8e1118] px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-[#c51c22]"
                >
                  À propos de nous
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((highlight) => (
                <article key={highlight.title} className="rounded-3xl border border-[#eadad6] bg-white/80 p-6 shadow-sm">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${highlight.color} text-white`}>
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-[#8e1118]">{highlight.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">{highlight.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold uppercase tracking-[0.25em] text-[#8e1118]">Pourquoi Immo-Plus ?</h2>
            <p className="text-sm leading-relaxed text-gray-700">
              Implantée dans les villes de Douala, Yaoundé et Kribi, Immo-Plus met à profit la connaissance du terrain pour
              sécuriser chaque acquisition. Notre priorité : garantir à nos clients des investissements transparents, viables
              et adaptés à leurs ambitions familiales ou professionnelles.
            </p>
            <Link
              to="/a-propos"
              className="inline-flex items-center gap-2 rounded-full bg-[#8e1118] px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-[#c51c22]"
            >
              À propos de nous
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f5c24b] py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-4 text-[#8e1118]">
            <h2 className="text-3xl font-extrabold uppercase tracking-[0.25em]">Nos engagements prioritaires</h2>
            <p className="text-sm leading-relaxed">
              Transparence, proximité et respect des délais guident chacune de nos opérations. Chaque projet est suivi par une
              équipe pluridisciplinaire qui veille au respect des normes administratives et techniques.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImmoplusHome;
