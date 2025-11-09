import { Facebook, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import WhatsappIcon from "@/components/icons/WhatsappIcon";
import { WHATSAPP_URL } from "./constants";

const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/nos-biens", label: "Nos biens" },
  { to: "/nos-services", label: "Nos services" },
  { to: "/a-propos", label: "À propos" },
];

const ImmoplusLayout = () => {
  return (
    <div className="min-h-screen bg-[#f8f5f0] font-sans text-gray-900">
      <div className="bg-[#8e1118] text-[0.68rem] text-white sm:text-xs">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-1.5 sm:py-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 leading-tight">
            <span className="flex items-center gap-1.5">
              <Mail className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              immoplus@gmail.com
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              (+237) 675 92 62 63 / 698 120 450 / 677 205 314
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              Douala • Yaoundé • Kribi
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1877F2] text-white transition hover:brightness-110 sm:h-8 sm:w-8"
              aria-label="Facebook IMMO-PLUS"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0A66C2] text-white transition hover:brightness-110 sm:h-8 sm:w-8"
              aria-label="LinkedIn IMMO-PLUS"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366] text-white transition hover:brightness-110 sm:h-8 sm:w-8"
              aria-label="WhatsApp IMMO-PLUS"
            >
              <WhatsappIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-[#eadad6] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="https://res.cloudinary.com/diuvvyatm/image/upload/v1760258045/logo-immoplus-color_oz24wx.svg"
              alt="Logo IMMO-PLUS"
              className="h-12 w-auto"
            />
          </Link>
          <nav className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.35em] text-[#8e1118] md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `transition hover:text-[#c51c22] ${isActive ? "text-[#c51c22]" : "text-[#8e1118]"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full bg-[#8e1118] px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-[#c51c22] md:flex"
          >
            Contact
          </a>
        </div>
        <div className="mx-auto block max-w-6xl px-4 pb-4 md:hidden">
          <nav className="flex flex-wrap items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-[#8e1118]">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 transition ${isActive ? "bg-[#8e1118] text-white" : "bg-[#f3e8e7] text-[#8e1118]"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="pb-16 pt-10">
        <Outlet />
      </main>

      <footer className="bg-[#8e1118] py-8 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <img
              src="https://res.cloudinary.com/diuvvyatm/image/upload/v1760258045/logo-immoplus-white_vaiawc.svg"
              alt="Logo IMMO-PLUS blanc"
              className="h-10 w-auto"
            />
            <p className="text-xs uppercase tracking-[0.35em]">
              © {new Date().getFullYear()} IMMO-PLUS — Le boulanger de l'immobilier
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="mailto:immoplus@gmail.com"
              className="text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:text-[#f5c24b]"
            >
              Mail
            </a>
            <span className="hidden h-4 w-px bg-white/40 sm:block" />
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:text-[#f5c24b]"
            >
              WhatsApp
            </a>
            <span className="hidden h-4 w-px bg-white/40 sm:block" />
            <a
              href="tel:+237675926263"
              className="text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:text-[#f5c24b]"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ImmoplusLayout;
