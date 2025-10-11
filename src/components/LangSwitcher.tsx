import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

export const LangSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground shadow-[0_0_25px_rgba(6,8,7,0.65)] transition-colors hover:border-primary hover:text-primary"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Globe className="h-4 w-4" />
      <span>{i18n.language}</span>
    </motion.button>
  );
};
