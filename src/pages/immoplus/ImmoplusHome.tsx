import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const heroHighlights = [
  {
    value: "+1000",
    label: "Familles accompagnées",
  },
  {
    value: "25",
    label: "Lots disponibles cette année",
  },
  {
    value: "3",
    label: "Villes stratégiques",
  },
];

const cityCards = [
  {
    name: "Douala",
    description: "Le dynamisme économique du Littoral pour bâtir votre patrimoine.",
    image: "https://res.cloudinary.com/diuvvyatm/image/upload/v1760259485/Douala_webk2k.png",
  },
  {
    name: "Yaoundé",
    description: "La capitale politique, des opportunités stables et durables.",
    image: "https://res.cloudinary.com/diuvvyatm/image/upload/v1760259491/Yaound%C3%A9_d3km96.png",
  },
  {
    name: "Kribi",
    description: "Le littoral en pleine expansion pour une qualité de vie d'exception.",
    image: "https://res.cloudinary.com/diuvvyatm/image/upload/v1760259485/Kribi_dmkadf.png",
  },
];

const serviceHighlights = [
  {
    title: "Prospection & sécurisation",
    description:
      "Nous identifions des terrains titrés, viabilisés et conformes aux exigences administratives pour votre sérénité.",
  },
  {
    title: "Aménagement & construction",
    description:
      "IMMO-PLUS coordonne les travaux, suit les chantiers et délivre des clés prêtes à l'emploi selon vos attentes.",
  },
  {
    title: "Financement & gestion",
    description:
      "De la recherche de partenaires financiers à la valorisation locative, nous optimisons chaque étape de votre projet.",
  },
];

const ImmoplusHome = () => {
  return (
    <div className="space-y-20">
      <section className="relative overflow-hidden rounded-b-[56px] bg-black text-white">
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/diuvvyatm/image/upload/v1760259484/Famille_akge15.png"
            alt="Famille heureuse devant sa nouvelle maison"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#8e1118]/80 via-[#8e1118]/30 to-transparent" />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-24 pt-28 lg:flex-row lg:items-center lg:gap-16">
          <div className="max-w-xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-xs uppercase tracking-[0.4em]">
              <span>IMMO-PLUS</span>
              <span className="text-white/70">Depuis 2010</span>
            </div>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
              Le boulanger de l'immobilier : votre projet, notre savoir-faire
            </h1>
            <p className="text-base text-white/85">
              Vos ambitions deviennent réalité avec un accompagnement humain, transparent et sécurisé. Ensemble, construisons
              un patrimoine durable pour votre famille au Cameroun.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#8e1118] shadow-lg transition hover:bg-[#f3e8e7]"
              >
                Nous contacter
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/destinations"
                className="flex items-center gap-2 rounded-full border border-white/70 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-white/10"
              >
                Découvrir nos villes
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid w-full max-w-md gap-3 rounded-3xl bg-white/12 p-6 backdrop-blur">
            {heroHighlights.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-white/10 px-5 py-4 text-left shadow-sm"
              >
                <p className="text-2xl font-extrabold uppercase tracking-[0.4em] text-white">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-white/80">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-4 lg:flex-row lg:items-center">
        <div className="space-y-5 lg:max-w-xl">
          <h2 className="text-3xl font-extrabold uppercase tracking-[0.25em] text-[#8e1118]">Qui sommes-nous ?</h2>
          <p className="text-sm leading-relaxed text-gray-700">
            IMMO-PLUS, c'est une équipe d'experts passionnés par l'immobilier camerounais. Présents à Douala, Yaoundé et Kribi,
            nous sécurisons chaque étape de votre investissement : recherche foncière, études techniques, montage juridique et
            livraison clé en main.
          </p>
          <p className="text-sm leading-relaxed text-gray-700">
            Notre promesse : faire grandir votre patrimoine avec la même attention qu'un artisan pour sa plus belle création.
            Transparence, proximité et résultats durables guident toutes nos actions.
          </p>
          <Link
            to="/a-propos"
            className="inline-flex items-center gap-2 rounded-full bg-[#8e1118] px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-[#c51c22]"
          >
            En savoir plus
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid flex-1 gap-4 sm:grid-cols-2">
          {serviceHighlights.map((service) => (
            <div key={service.title} className="rounded-3xl border border-[#e8d6d2] bg-white/80 p-6 shadow-sm backdrop-blur">
              <h3 className="text-lg font-semibold text-[#8e1118]">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f5c24b] py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-4 text-[#8e1118]">
            <h2 className="text-3xl font-extrabold uppercase tracking-[0.25em]">Nos engagements</h2>
            <p className="text-sm leading-relaxed">
              Des hectares de terrains maîtrisés, des lots livrés dans les délais et un réseau d'agences locales pour un suivi
              rapproché. IMMO-PLUS transforme vos projets immobiliers en réussites concrètes.
            </p>
          </div>
          <div className="grid flex-1 gap-4 sm:grid-cols-3">
            {heroHighlights.map((item) => (
              <div key={item.label} className="rounded-3xl bg-white p-6 text-center shadow-lg">
                <p className="text-3xl font-extrabold text-[#8e1118]">{item.value}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#8e1118]/70">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-extrabold uppercase tracking-[0.25em] text-[#8e1118]">Villes phares</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-700">
              Trois destinations complémentaires pour vous implanter au cœur des dynamiques économiques, politiques et
              touristiques du Cameroun.
            </p>
          </div>
          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 rounded-full border border-[#8e1118] px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#8e1118] transition hover:bg-[#8e1118] hover:text-white"
          >
            Explorer nos terrains
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {cityCards.map((city) => (
            <article key={city.name} className="group relative overflow-hidden rounded-3xl shadow-lg">
              <img src={city.image} alt={city.name} className="h-56 w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <h3 className="text-lg font-semibold uppercase tracking-[0.35em]">{city.name}</h3>
                <p className="mt-2 text-sm text-white/85">{city.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl rounded-[40px] bg-[#8e1118] px-6 py-14 text-white lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4 lg:max-w-2xl">
            <h2 className="text-3xl font-extrabold uppercase tracking-[0.25em]">Parlons de votre prochain projet</h2>
            <p className="text-sm leading-relaxed text-white/85">
              Besoin d'un terrain, d'un lotissement ou d'un accompagnement clé en main ? Notre équipe est disponible pour vous
              conseiller et vous présenter nos opportunités du moment.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#8e1118] transition hover:bg-[#f3e8e7]"
          >
            Prendre rendez-vous
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ImmoplusHome;
