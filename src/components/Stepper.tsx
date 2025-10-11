import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';

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
    <div className="w-full max-w-3xl mx-auto mb-12">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-border -z-10">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>

        {steps.map((step) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          return (
            <div key={step.number} className="flex flex-col items-center gap-2 relative">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold border-2 transition-colors ${
                  isCompleted
                    ? 'bg-primary border-primary text-primary-foreground'
                    : isCurrent
                    ? 'bg-card border-primary text-foreground'
                    : 'bg-card border-border text-muted-foreground'
                }`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: step.number * 0.1 }}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : step.number}
              </motion.div>
              <span
                className={`text-xs sm:text-sm font-medium whitespace-nowrap ${
                  isCurrent ? 'text-foreground' : 'text-muted-foreground'
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
