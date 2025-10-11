import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useSiteFactory } from '@/contexts/SiteFactoryContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight, PenLine, Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { SketchAccent } from '@/components/SketchAccent';

export const StepQuestionnaire = () => {
  const { t } = useTranslation();
  const { siteType, deepAnswers, setDeepAnswers, setCurrentStep } = useSiteFactory();

  const question = siteType === 'personal' ? t('questionPersonal') : t('questionBusiness');
  const placeholder = siteType === 'personal' ? t('placeholderPersonal') : t('placeholderBusiness');

  const canProceed = deepAnswers.length >= 100;
  const progressValue = Math.min(100, (deepAnswers.length / 100) * 100);
  const wordCount = deepAnswers.trim().length ? deepAnswers.trim().split(/\s+/).length : 0;

  const promptSnippets = [
    t('promptIdentity'),
    t('promptAudience'),
    t('promptProof'),
  ];

  const helperQuestions = [
    t('helperStory'),
    t('helperOffer'),
    t('helperTone'),
  ];

  return (
    <div className="mx-auto w-full max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-border/60 bg-background/80 p-8 shadow-[0_25px_80px_rgba(221,31,20,0.25)]"
      >
        <SketchAccent className="absolute -right-20 top-0 h-48 w-48 text-primary/20" intensity="bold" />
        <SketchAccent className="absolute -left-16 bottom-[-4rem] h-40 w-40 text-primary/12" />

        <div className="relative z-10">
          <Badge className="mb-4 inline-flex items-center gap-2 bg-primary/20 text-primary" variant="outline">
            <PenLine className="h-3 w-3" />
            {t('questionBadge')}
          </Badge>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{question}</h2>
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
            {t('questionIntro')}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {promptSnippets.map((snippet, index) => (
              <Button
                key={index}
                type="button"
                variant="ghost"
                className="rounded-full border border-border/60 bg-background/60 px-4 py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:border-primary hover:text-primary"
                onClick={() => setDeepAnswers((prev) => (prev ? `${prev}\n${snippet}` : snippet))}
              >
                <Sparkles className="mr-2 h-3 w-3" />
                {snippet}
              </Button>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="relative">
              <Textarea
                value={deepAnswers}
                onChange={(e) => setDeepAnswers(e.target.value)}
                placeholder={placeholder}
                className="min-h-[320px] resize-none border-2 border-border/70 bg-background/80 p-6 text-base leading-relaxed shadow-inner focus:border-primary focus:outline-none"
              />
              <div className="absolute bottom-4 right-4 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                {deepAnswers.length} / 100
              </div>
            </div>

            <aside className="flex h-full flex-col justify-between rounded-2xl border border-border/60 bg-muted/30 p-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  {t('questionHelperTitle')}
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {helperQuestions.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 space-y-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                <div className="flex items-center justify-between text-[0.7rem]">
                  <span>{t('questionProgress')}</span>
                  <span>{wordCount} {t('words')}</span>
                </div>
                <Progress value={progressValue} className="h-2 bg-muted" />
                {!canProceed && deepAnswers.length > 0 && (
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-destructive">{t('minChars')}</p>
                )}
              </div>
            </aside>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(1)}
              className="gap-2 border-border/70 text-xs uppercase tracking-[0.3em]"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('previous')}
            </Button>
            <Button
              onClick={() => setCurrentStep(3)}
              disabled={!canProceed}
              className="gap-2 bg-primary px-8 text-xs uppercase tracking-[0.3em] hover:bg-primary/90 disabled:bg-primary/40"
            >
              {t('next')}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
