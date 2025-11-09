import { useState } from "react";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { WHATSAPP_URL } from "./constants";

const statements = [
  {
    key: "slogan",
    title: "Slogan",
    text: "Deviens propriétaire grâce à Immoplus (le boulanger de l'immobilier)",
  },
  {
    key: "message",
    title: "Message",
    text: "Réalisons ensemble votre rêve (vos ambitions, notre mission. Votre confiance, notre fondation)",
  },
  {
    key: "mission",
    title: "Mission",
    text: "Créée il y a plus de 15 ans, ImmoPlus est une société civile immobilière camerounaise spécialisée dans la vente de terrains titrés, la construction de logements et la gestion de patrimoine immobilier.",
  },
  {
    key: "volonte",
    title: "Volonté",
    text: "Immoplus s'engage à vous fournir un maximum d'accompagnement de l'obtention de votre titre foncier à la remise des clés. Nous vous apprenons à mieux gérer votre bien immobilier.",
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
  const navigate = useNavigate();

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
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-xs uppercase tracking-[0.4em]">
                <span>IMMO-PLUS</span>
                <span className="text-white/70">Depuis 2010</span>
              </div>
              <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
                Immoplus réalise vos projets immobiliers à Douala, Yaoundé et Kribi
              </h1>
              <p className="text-base text-white/90">
                De la première visite jusqu'à la remise des clés, Immoplus vous guide sur des terrains titrés et des constructions modulaires pensées pour durer.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/nos-biens"
                  className="flex items-center gap-2 rounded-full bg-[#f5c24b] px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#8e1118] shadow-lg transition hover:bg-white"
                >
                  Découvrir nos biens
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={() => navigate("/nos-services")}
                  className="flex items-center gap-2 rounded-full border border-white/70 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-white/10"
                >
                  Nos services
                  <PlayCircle className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="w-full max-w-md space-y-5 rounded-3xl bg-white/10 p-6 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
                Slogan, message, mission & volonté
              </p>
              <div className="grid grid-cols-2 gap-2">
                {statements.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setActiveKey(item.key)}
                    className={`rounded-2xl border px-4 py-3 text-xs font-semibold uppercase tracking-[0.25em] transition ${
                      activeKey === item.key
                        ? "border-[#f5c24b] bg-[#f5c24b] text-[#8e1118]"
                        : "border-white/25 bg-white/5 text-white/80 hover:bg-white/15"
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
              <div className="rounded-3xl bg-black/50 p-5 text-left shadow-inner">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#f5c24b]">{activeStatement.title}</p>
                <p className="mt-3 text-base leading-relaxed text-white">{activeStatement.text}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold uppercase tracking-[0.25em] text-[#8e1118]">Pourquoi IMMO-PLUS ?</h2>
            <p className="text-sm leading-relaxed text-gray-700">
              Implantée dans les villes de Douala, Yaoundé et Kribi, IMMO-PLUS met à profit la connaissance du terrain pour
              sécuriser chaque acquisition. Notre priorité : garantir à nos clients des investissements transparents, viables et
              adaptés à leurs ambitions familiales ou professionnelles.
            </p>
            <Link
              to="/a-propos"
              className="inline-flex items-center gap-2 rounded-full bg-[#8e1118] px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-[#c51c22]"
            >
              À propos de nous
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
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
          <div className="grid flex-1 gap-4 sm:grid-cols-3">
            {statements.slice(0, 3).map((item) => (
              <div key={item.key} className="rounded-3xl bg-white p-6 text-center shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8e1118]/70">{item.title}</p>
                <p className="mt-3 text-sm text-[#8e1118]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl rounded-[40px] bg-white px-6 py-14 shadow-sm lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4 lg:max-w-2xl">
            <h2 className="text-3xl font-extrabold uppercase tracking-[0.25em] text-[#8e1118]">
              Prêts à concrétiser votre projet ?
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              Notre équipe commerciale vous présente les opportunités disponibles et vous accompagne pour les visites, la
              constitution des dossiers et les démarches notariales.
            </p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#8e1118] px-7 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-[#c51c22]"
          >
            Contacter Immoplus
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default ImmoplusHome;
