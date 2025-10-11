import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useSiteFactory } from '@/contexts/SiteFactoryContext';
import { User, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const StepSiteType = () => {
  const { t } = useTranslation();
  const { siteType, setSiteType, setCurrentStep } = useSiteFactory();

  const handleSelect = (type: 'personal' | 'business') => {
    setSiteType(type);
    setTimeout(() => setCurrentStep(2), 300);
  };

  const options = [
    {
      type: 'personal' as const,
      icon: User,
      title: t('personal'),
      description: t('personalDesc'),
    },
    {
      type: 'business' as const,
      icon: Briefcase,
      title: t('business'),
      description: t('businessDesc'),
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {t('step1')}
        </h2>
        <p className="text-muted-foreground text-lg">{t('tagline')}</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {options.map((option, index) => {
          const Icon = option.icon;
          const isSelected = siteType === option.type;

          return (
            <motion.div
              key={option.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                onClick={() => handleSelect(option.type)}
                className={`w-full p-8 rounded-2xl border-2 transition-all hover:scale-105 ${
                  isSelected
                    ? 'border-primary bg-gradient-to-br from-primary/20 to-accent/20 shadow-glow'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <div className="flex flex-col items-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      isSelected
                        ? 'bg-gradient-to-br from-primary to-accent'
                        : 'bg-muted'
                    }`}
                  >
                    <Icon className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                  <Button
                    variant={isSelected ? 'default' : 'outline'}
                    className="mt-2"
                  >
                    {t('select')}
                  </Button>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
