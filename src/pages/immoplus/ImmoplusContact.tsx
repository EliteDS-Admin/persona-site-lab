import { Mail, MapPin, Send } from "lucide-react";
import WhatsappIcon from "@/components/icons/WhatsappIcon";
import { WHATSAPP_URL } from "./constants";

const contacts = [
  { label: "Standard", value: "(+237) 675 92 62 63" },
  { label: "Commercial", value: "(+237) 698 120 450" },
  { label: "Direction", value: "(+237) 677 205 314" },
  { label: "Assistance", value: "(+237) 640 82 52 96" },
];

const ImmoplusContact = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-14 px-4">
      <section className="rounded-[40px] bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8e1118]">Contact</p>
        <h1 className="mt-3 text-3xl font-extrabold uppercase tracking-[0.25em] text-[#8e1118]">
          Restons en contact pour concrétiser votre projet
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-gray-700">
          Localisation : Douala (Face Idimed Bonapriso, BP 2800) • Yaoundé (Prestige Hôtel) • Kribi. Notre équipe organise les visites de terrain, les rendez-vous bancaires et notariaux.
        </p>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#8e1118]">Coordonnées directes</h2>
            <div className="mt-4 space-y-3 text-sm text-gray-700">
              {contacts.map((contact) => (
                <p key={contact.label} className="flex items-center justify-between gap-2 rounded-2xl bg-[#fdf8f5] px-4 py-3">
                  <span className="font-semibold text-[#8e1118]">{contact.label}</span>
                  <span>{contact.value}</span>
                </p>
              ))}
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#8e1118]" />
                immoplus@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <WhatsappIcon className="h-4 w-4 text-[#8e1118]" />
                <a href={WHATSAPP_URL} className="hover:underline" target="_blank" rel="noreferrer">
                  +237 677 205 314
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#8e1118]" />
                Douala • Yaoundé • Kribi
              </p>
            </div>
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
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#8e1118] px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#8e1118] transition hover:bg-[#8e1118] hover:text-white"
          >
            Discuter sur WhatsApp
            <WhatsappIcon className="h-4 w-4" />
          </a>
          <p className="text-xs text-gray-500">
            Nos équipes vous recontactent sous 24 heures ouvrées pour planifier un échange personnalisé.
          </p>
        </form>
      </section>
    </div>
  );
};

export default ImmoplusContact;
