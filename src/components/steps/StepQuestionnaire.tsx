import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useSiteFactory } from '@/contexts/SiteFactoryContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const StepQuestionnaire = () => {
  const { t } = useTranslation();
  const { siteType, deepAnswers, setDeepAnswers, setCurrentStep } = useSiteFactory();

  const question = siteType === 'personal' ? t('questionPersonal') : t('questionBusiness');
  const placeholder = siteType === 'personal' ? t('placeholderPersonal') : t('placeholderBusiness');

  const canProceed = deepAnswers.length >= 100;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">{question}</h2>
        
        <div className="relative">
          <Textarea
            value={deepAnswers}
            onChange={(e) => setDeepAnswers(e.target.value)}
            placeholder={placeholder}
            className="min-h-[300px] text-base p-6 bg-card border-2 border-border focus:border-primary transition-colors resize-none"
          />
          <div className="absolute bottom-4 right-4 text-sm text-muted-foreground">
            {deepAnswers.length} / 100 min
          </div>
        </div>

        {!canProceed && deepAnswers.length > 0 && (
          <p className="text-sm text-destructive mt-2">{t('minChars')}</p>
        )}

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(1)}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('previous')}
          </Button>
          <Button
            onClick={() => setCurrentStep(3)}
            disabled={!canProceed}
            className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            {t('next')}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
