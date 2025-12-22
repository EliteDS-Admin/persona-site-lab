import React from "react";
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

const ImmoplusLayout: React.FC = () => {
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
              (+237) 675 92 62 63 / 698 120 450 / 677 205 314 / 640 82 52 96
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
              aria-label="Facebook Immo-Plus"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0A66C2] text-white transition hover:brightness-110 sm:h-8 sm:w-8"
              aria-label="LinkedIn Immo-Plus"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366] text-white transition hover:brightness-110 sm:h-8 sm:w-8"
              aria-label="WhatsApp Immo-Plus"
            >
              <WhatsappIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <header className="mx-auto max-w-6xl px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-[#8e1118]">
            Immo-Plus
          </Link>
          <div className="flex items-center gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium ${isActive ? 'text-[#8e1118]' : 'text-gray-700 hover:text-[#8e1118]'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="mt-12 border-t bg-white py-8">
        <div className="mx-auto max-w-6xl px-4 text-sm text-gray-600">© {new Date().getFullYear()} Immo-Plus</div>
      </footer>
    </div>
  );
};

export default ImmoplusLayout;
