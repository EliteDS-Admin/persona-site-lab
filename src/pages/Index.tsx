import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SiteFactoryProvider, useSiteFactory } from '@/contexts/SiteFactoryContext';
import { LangSwitcher } from '@/components/LangSwitcher';
import { Stepper } from '@/components/Stepper';
import { StepSiteType } from '@/components/steps/StepSiteType';
import { StepQuestionnaire } from '@/components/steps/StepQuestionnaire';
import { StepInspirations } from '@/components/steps/StepInspirations';
import { StepGeneration } from '@/components/steps/StepGeneration';
import { motion } from 'framer-motion';
import '../i18n/config';

const WizardContent = () => {
  const { currentStep } = useSiteFactory();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.h1
            className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {t('appName')}
          </motion.h1>
          <LangSwitcher />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <Stepper currentStep={currentStep} />
        
        <div className="mt-8">
          {currentStep === 1 && <StepSiteType />}
          {currentStep === 2 && <StepQuestionnaire />}
          {currentStep === 3 && <StepInspirations />}
          {currentStep === 4 && <StepGeneration />}
        </div>
      </main>

      <footer className="border-t border-border mt-20 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Site-Factory - {t('tagline')}</p>
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
