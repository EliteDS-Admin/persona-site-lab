import { Mail, MapPin, Phone, Send } from "lucide-react";

const offices = [
  {
    city: "Douala",
    address: "Quartier Bonapriso, Immeuble Blue Tower",
    phone: "(+237) 675 926 263",
  },
  {
    city: "Yaoundé",
    address: "Quartier Bastos, Rue des Ambassades",
    phone: "(+237) 698 120 450",
  },
  {
    city: "Kribi",
    address: "Zone portuaire, Lotissement Palm Beach",
    phone: "(+237) 677 205 314",
  },
];

const ImmoplusContact = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-14 px-4">
      <section className="rounded-[40px] bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8e1118]">Entrons en contact</p>
        <h1 className="mt-3 text-3xl font-extrabold uppercase tracking-[0.25em] text-[#8e1118]">
          IMMO-PLUS à votre écoute
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-gray-700">
          Un projet immobilier en tête ? Nos conseillers vous répondent rapidement pour vous guider, partager nos opportunités
          disponibles et organiser une visite de terrain.
        </p>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#8e1118]">Coordonnées principales</h2>
            <div className="mt-4 space-y-3 text-sm text-gray-700">
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#8e1118]" />
                immoplus@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#8e1118]" />
                (+237) 675 926 263
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#8e1118]" />
                Douala • Yaoundé • Kribi
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {offices.map((office) => (
              <div key={office.city} className="rounded-3xl bg-white p-5 text-sm text-gray-700 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8e1118]">{office.city}</p>
                <p className="mt-2 leading-relaxed">{office.address}</p>
                <p className="mt-3 font-semibold text-[#8e1118]">{office.phone}</p>
              </div>
            ))}
          </div>
        </div>

        <form className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#8e1118]">Parlez-nous de vous</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-gray-700">
              Nom complet
              <input
                type="text"
                placeholder="Votre nom"
                className="mt-2 w-full rounded-xl border border-[#eadad6] bg-white px-4 py-3 text-sm focus:border-[#8e1118] focus:outline-none focus:ring-2 focus:ring-[#8e1118]/20"
              />
            </label>
            <label className="text-sm font-semibold text-gray-700">
              Téléphone
              <input
                type="tel"
                placeholder="(+237)"
                className="mt-2 w-full rounded-xl border border-[#eadad6] bg-white px-4 py-3 text-sm focus:border-[#8e1118] focus:outline-none focus:ring-2 focus:ring-[#8e1118]/20"
              />
            </label>
          </div>
          <label className="text-sm font-semibold text-gray-700">
            Email
            <input
              type="email"
              placeholder="vous@example.com"
              className="mt-2 w-full rounded-xl border border-[#eadad6] bg-white px-4 py-3 text-sm focus:border-[#8e1118] focus:outline-none focus:ring-2 focus:ring-[#8e1118]/20"
            />
          </label>
          <label className="text-sm font-semibold text-gray-700">
            Votre besoin
            <textarea
              rows={4}
              placeholder="Décrivez votre projet immobilier"
              className="mt-2 w-full rounded-xl border border-[#eadad6] bg-white px-4 py-3 text-sm focus:border-[#8e1118] focus:outline-none focus:ring-2 focus:ring-[#8e1118]/20"
            />
          </label>
          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#8e1118] px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-[#c51c22]"
          >
            Envoyer ma demande
            <Send className="h-4 w-4" />
          </button>
          <p className="text-xs text-gray-500">
            Nos équipes vous recontactent sous 24 heures ouvrées pour planifier un échange personnalisé.
          </p>
        </form>
      </section>
    </div>
  );
};

export default ImmoplusContact;
