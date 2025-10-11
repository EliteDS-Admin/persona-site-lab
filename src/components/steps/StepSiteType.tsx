import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useSiteFactory } from '@/contexts/SiteFactoryContext';
import { User, Briefcase, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SketchAccent } from '@/components/SketchAccent';

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
    <div className="relative mx-auto w-full max-w-4xl">
      <SketchAccent className="absolute -top-28 left-1/2 h-56 w-56 -translate-x-1/2 text-primary/15" intensity="bold" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mb-12 text-center"
      >
        <Badge className="mx-auto mb-4 w-fit bg-primary/20 text-primary" variant="outline">
          <Sparkles className="mr-2 h-3 w-3" />
          {t('step1Intro')}
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
          {t('step1Title')}
        </h2>
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">
          {t('step1Subtitle')}
        </p>
      </motion.div>

      <div className="relative z-10 grid gap-6 md:grid-cols-2">
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
                className={`group relative w-full overflow-hidden rounded-3xl border-2 p-8 text-left transition-all duration-300 ${
                  isSelected
                    ? 'border-primary/80 bg-gradient-to-br from-primary/20 via-background to-background shadow-[0_25px_60px_rgba(221,31,20,0.3)]'
                    : 'border-border/60 bg-background/60 hover:border-primary/60 hover:shadow-[0_18px_55px_rgba(221,31,20,0.22)]'
                }`}
              >
                <SketchAccent className="absolute -right-16 top-0 h-40 w-40 text-primary/15 transition-opacity group-hover:opacity-100" />
                <div className="flex flex-col items-center gap-4">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full border-2 transition-colors ${
                      isSelected ? 'border-primary bg-primary/80 text-primary-foreground' : 'border-border/70 bg-muted text-muted-foreground'
                    }`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-center text-xl font-bold text-foreground">{option.title}</h3>
                    <p className="mt-2 text-center text-sm text-muted-foreground">{option.description}</p>
                  </div>
                  <Button
                    variant={isSelected ? 'default' : 'outline'}
                    className={`mt-3 w-full max-w-[200px] border-primary/70 text-xs uppercase tracking-[0.3em] ${
                      isSelected ? 'bg-primary text-primary-foreground' : 'bg-transparent text-foreground'
                    }`}
                  >
                    {t('select')}
                  </Button>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>
      <p className="relative z-10 mt-10 text-center text-sm text-muted-foreground">
        {t('step1Helper')}
      </p>
    </div>
  );
};
