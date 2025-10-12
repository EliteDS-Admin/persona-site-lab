import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SiteFactoryProvider, useSiteFactory } from '@/contexts/SiteFactoryContext';
import { LangSwitcher } from '@/components/LangSwitcher';
import { Stepper } from '@/components/Stepper';
import { StepSiteType } from '@/components/steps/StepSiteType';
import { StepQuestionnaire } from '@/components/steps/StepQuestionnaire';
import { StepInspirations } from '@/components/steps/StepInspirations';
import { StepGeneration } from '@/components/steps/StepGeneration';
import { SketchAccent } from '@/components/SketchAccent';
import { motion } from 'framer-motion';
import '../i18n/config';

const WizardContent = () => {
  const { currentStep } = useSiteFactory();
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen overflow-hidden text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-80" style={{ backgroundImage: 'var(--gradient-hero)' }} />
        <div className="absolute inset-0 backdrop-blur-[120px]" />
        <SketchAccent className="-left-24 -top-10 h-72 w-72 text-primary/25" intensity="bold" />
        <SketchAccent className="-right-20 top-32 h-64 w-64 rotate-12 text-primary/20" />
        <SketchAccent className="left-1/2 bottom-0 h-60 w-60 -translate-x-1/2 text-primary/15" />
      </div>

      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/70 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between px-4 py-5">
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">{t('tagline')}</span>
            <motion.h1
              className="text-3xl font-black tracking-tight text-primary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {t('appName')}
            </motion.h1>
          </motion.div>
          <LangSwitcher />
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-16">
        <div className="mx-auto max-w-5xl rounded-3xl border border-border/60 bg-card/80 p-8 shadow-[0_25px_120px_rgba(221,31,20,0.15)] backdrop-blur-xl">
          <Stepper currentStep={currentStep} />

          <div className="mt-10">
            {currentStep === 1 && <StepSiteType />}
            {currentStep === 2 && <StepQuestionnaire />}
            {currentStep === 3 && <StepInspirations />}
            {currentStep === 4 && <StepGeneration />}
          </div>
        </div>
      </main>

      <footer className="relative z-10 mt-10 border-t border-border/60 py-8">
        <div className="container mx-auto px-4 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <p>© 2025 Site-Factory — {t('tagline')}</p>
        </div>
      </footer>
    </div>
  );
};

const Index = () => {
  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <SiteFactoryProvider>
      <WizardContent />
    </SiteFactoryProvider>
  );
};

export default Index;
