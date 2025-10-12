import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';
import { SketchAccent } from '@/components/SketchAccent';

interface StepperProps {
  currentStep: number;
}

export const Stepper = ({ currentStep }: StepperProps) => {
  const { t } = useTranslation();

  const steps = [
    { number: 1, label: t('step1') },
    { number: 2, label: t('step2') },
    { number: 3, label: t('step3') },
    { number: 4, label: t('step4') },
  ];

  return (
    <div className="relative mx-auto mb-12 w-full max-w-3xl overflow-hidden rounded-2xl border border-border/60 bg-background/80 px-6 py-10 shadow-[0_0_35px_rgba(221,31,20,0.15)]">
      <SketchAccent className="pointer-events-none absolute -right-10 -top-24 h-40 w-40 text-primary/20" />
      <SketchAccent className="pointer-events-none absolute -left-16 bottom-0 h-32 w-32 -rotate-12 text-primary/10" />

      <div className="relative flex items-center justify-between">
        <div className="absolute left-4 right-4 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-border/50">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>

        {steps.map((step) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          return (
            <div key={step.number} className="relative flex flex-col items-center gap-3">
              <motion.div
                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 font-semibold transition-all ${
                  isCompleted
                    ? 'border-primary bg-primary text-primary-foreground shadow-[0_0_18px_rgba(221,31,20,0.45)]'
                    : isCurrent
                    ? 'border-primary/80 bg-background text-foreground'
                    : 'border-border/70 bg-background/60 text-muted-foreground'
                }`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: step.number * 0.08 }}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : step.number}
              </motion.div>
              <span
                className={`whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em] ${
                  isCurrent ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
