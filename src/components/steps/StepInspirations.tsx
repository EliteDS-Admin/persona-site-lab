import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useSiteFactory, type Inspiration } from '@/contexts/SiteFactoryContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Loader2, Check, RefreshCcw, Plus, Globe } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { SketchAccent } from '@/components/SketchAccent';

export const StepInspirations = () => {
  const { t, i18n } = useTranslation();
  const { deepAnswers, siteType, selectedInspirations, setSelectedInspirations, setCurrentStep } = useSiteFactory();
  const [inspirations, setInspirations] = useState<Inspiration[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastQueryKey, setLastQueryKey] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [customNote, setCustomNote] = useState('');

  const queryKey = useMemo(() => `${siteType ?? 'none'}-${i18n.language}-${deepAnswers.trim()}`, [siteType, i18n.language, deepAnswers]);

  useEffect(() => {
    if (!deepAnswers || deepAnswers.length < 100) {
      return;
    }
    if (lastQueryKey === queryKey) {
      return;
    }
    void fetchInspirations();
  }, [queryKey, deepAnswers, lastQueryKey]);

  const fetchInspirations = async () => {
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('search-inspirations', {
        body: {
          deepAnswers,
          siteType: siteType,
          language: i18n.language
        }
      });

      if (error) {
        console.error('Error fetching inspirations:', error);
        toast.error(t('errorLoading'));
        return;
      }

      if (data?.inspirations) {
        setInspirations(data.inspirations);
      } else {
        toast.error(t('errorLoading'));
      }
    } catch (error) {
      console.error('Failed to fetch inspirations:', error);
      toast.error(t('errorLoading'));
    } finally {
      setLoading(false);
      setLastQueryKey(queryKey);
    }
  };

  const toggleSelection = (inspiration: Inspiration) => {
    setSelectedInspirations((prev) => {
      const exists = prev.find((item) => item.id === inspiration.id);
      if (exists) {
        return prev.filter((item) => item.id !== inspiration.id);
      }
      if (prev.length >= 2) {
        toast.error(t('selectMax2'));
        return prev;
      }
      return [...prev, inspiration];
    });
  };

  const handleAddCustomInspiration = () => {
    if (!customTitle.trim() || !customUrl.trim()) {
      toast.error(t('customSiteRequired'));
      return;
    }

    const withProtocol = customUrl.startsWith('http') ? customUrl : `https://${customUrl}`;
    let domain = withProtocol;
    try {
      domain = new URL(withProtocol).hostname;
    } catch (error) {
      console.warn('Invalid URL, keeping raw value', error);
    }

    setSelectedInspirations((prev) => {
      if (prev.length >= 2) {
        toast.error(t('selectMax2'));
        return prev;
      }

      const customInspiration: Inspiration = {
        id: `custom-${Date.now()}`,
        title: customTitle.trim(),
        url: withProtocol,
        image: '',
        domain,
        justification: customNote.trim() || t('customSiteDefaultNote'),
      };

      toast.success(t('customSiteAdded'));
      setCustomTitle('');
      setCustomUrl('');
      setCustomNote('');
      return [...prev, customInspiration];
    });
  };

  const canProceed = selectedInspirations.length > 0;
  const customInspirations = selectedInspirations.filter((item) => item.id.startsWith('custom-'));
  const selectionLabel = t('inspirationsSelectedLabel', { count: selectedInspirations.length });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">{t('searching')}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-border/60 bg-background/85 p-10 shadow-[0_25px_90px_rgba(221,31,20,0.25)]"
      >
        <SketchAccent className="pointer-events-none absolute -right-16 top-4 h-40 w-40 text-primary/18" intensity="bold" />
        <SketchAccent className="pointer-events-none absolute -left-20 bottom-[-4rem] h-44 w-44 rotate-12 text-primary/12" />

        <div className="relative z-10 mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{t('inspirationsTitle')}</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">{t('inspirationsSubtitle')}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">{selectionLabel}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              className="gap-2 border-border/70 text-xs uppercase tracking-[0.3em]"
              onClick={() => {
                setSelectedInspirations([]);
                toast.success(t('selectionsCleared'));
              }}
            >
              {t('clearSelection')}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="gap-2 border-border/70 text-xs uppercase tracking-[0.3em]"
              onClick={() => void fetchInspirations()}
            >
              <RefreshCcw className="h-4 w-4" />
              {t('refreshInspirations')}
            </Button>
          </div>
        </div>

        <div className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {inspirations.map((inspiration, index) => {
            const isSelected = selectedInspirations.find(i => i.id === inspiration.id);

            return (
              <motion.div
                key={inspiration.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  onClick={() => toggleSelection(inspiration)}
                  className={`group relative w-full overflow-hidden rounded-2xl border-2 text-left transition-all duration-300 ${
                    isSelected
                      ? 'border-primary bg-gradient-to-br from-primary/25 via-background to-background shadow-[0_20px_60px_rgba(221,31,20,0.3)]'
                      : 'border-border/60 bg-background/70 hover:border-primary/50 hover:shadow-[0_18px_55px_rgba(221,31,20,0.22)]'
                  }`}
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    {inspiration.image ? (
                      <img
                        src={inspiration.image}
                        alt={inspiration.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted/40">
                        <Globe className="h-10 w-10 text-primary/60" />
                      </div>
                    )}
                    {isSelected && (
                      <div className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 border-t border-border/60 bg-background/70 p-5">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base font-semibold text-foreground">{inspiration.title}</h3>
                      {inspiration.id.startsWith('custom-') && (
                        <Badge variant="outline" className="border-primary/60 text-[0.65rem] uppercase tracking-[0.2em] text-primary">
                          {t('customBadge')}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{inspiration.domain}</p>
                    <p className="text-sm text-muted-foreground">{inspiration.justification}</p>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {customInspirations.length > 0 && (
          <div className="relative z-10 mt-6">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{t('customSitesTitle')}</p>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {customInspirations.map((inspiration) => (
                <div
                  key={inspiration.id}
                  className="rounded-2xl border border-primary/40 bg-background/80 p-5 text-left shadow-[0_15px_45px_rgba(221,31,20,0.2)]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-semibold text-foreground">{inspiration.title}</h3>
                    <Badge variant="outline" className="border-primary/60 text-[0.65rem] uppercase tracking-[0.2em] text-primary">
                      {t('customBadge')}
                    </Badge>
                  </div>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">{inspiration.domain}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{inspiration.justification}</p>
                  <Button
                    variant="ghost"
                    className="mt-4 w-full border border-primary/60 text-xs uppercase tracking-[0.3em] text-primary hover:bg-primary/10"
                    onClick={() => toggleSelection(inspiration)}
                  >
                    {t('removeCustomSite')}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="relative z-10 mt-10 rounded-2xl border border-border/60 bg-muted/20 p-6">
          <h3 className="text-base font-semibold text-foreground">{t('customSiteTitle')}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{t('customSiteSubtitle')}</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="custom-title" className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {t('customSiteName')}
              </Label>
              <Input
                id="custom-title"
                value={customTitle}
                onChange={(event) => setCustomTitle(event.target.value)}
                placeholder={t('customSiteNamePlaceholder')}
                className="border-border/70 bg-background/80"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="custom-url" className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {t('customSiteUrl')}
              </Label>
              <Input
                id="custom-url"
                value={customUrl}
                onChange={(event) => setCustomUrl(event.target.value)}
                placeholder="ex: https://mon-site-prefere.com"
                className="border-border/70 bg-background/80"
              />
            </div>
            <div className="md:col-span-2 flex flex-col gap-2">
              <Label htmlFor="custom-note" className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {t('customSiteNote')}
              </Label>
              <Textarea
                id="custom-note"
                value={customNote}
                onChange={(event) => setCustomNote(event.target.value)}
                placeholder={t('customSiteNotePlaceholder')}
                className="min-h-[120px] resize-none border-border/70 bg-background/80"
              />
            </div>
          </div>
          <Button
            type="button"
            onClick={handleAddCustomInspiration}
            className="mt-5 flex items-center gap-2 bg-primary px-6 text-xs uppercase tracking-[0.3em] hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            {t('customSiteCta')}
          </Button>
        </div>

        <div className="relative z-10 mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(2)}
            className="gap-2 border-border/70 text-xs uppercase tracking-[0.3em]"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('previous')}
          </Button>
          <Button
            onClick={() => setCurrentStep(4)}
            disabled={!canProceed}
            className="gap-2 bg-primary px-8 text-xs uppercase tracking-[0.3em] hover:bg-primary/90 disabled:bg-primary/40"
          >
            {t('generate')}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
