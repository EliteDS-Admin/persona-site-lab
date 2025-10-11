import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useSiteFactory } from '@/contexts/SiteFactoryContext';
import { Button } from '@/components/ui/button';
import { Loader2, ExternalLink, Share2, MessageCircle, Check } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { SketchAccent } from '@/components/SketchAccent';

export const StepGeneration = () => {
  const { t, i18n } = useTranslation();
  const {
    deepAnswers,
    siteType,
    selectedInspirations,
    structuredProfile,
    setStructuredProfile,
    generatedSlug,
    setGeneratedSlug,
  } = useSiteFactory();
  const [generating, setGenerating] = useState(true);
  const [copied, setCopied] = useState(false);
  const [persisting, setPersisting] = useState(false);

  useEffect(() => {
    void generateSite();
  }, []);

  const generateSite = async () => {
    setGenerating(true);

    try {
      const { data, error } = await supabase.functions.invoke('structure-profile', {
        body: {
          deepAnswers,
          siteType,
          selectedInspirations,
          language: i18n.language,
        },
      });

      if (error) {
        console.error('Error structuring profile:', error);
        toast.error(t('errorGenerating'));
        setGenerating(false);
        return;
      }

      if (data?.structuredProfile) {
        setStructuredProfile(data.structuredProfile);
        const slug = generatedSlug ?? `site-${Date.now()}`;
        setGeneratedSlug(slug);
        await persistProject(slug, data.structuredProfile);
        toast.success(t('previewReady'));
      } else {
        toast.error(t('errorGenerating'));
      }
    } catch (error) {
      console.error('Failed to generate site:', error);
      toast.error(t('errorGenerating'));
    } finally {
      setGenerating(false);
    }
  };

  const persistProject = async (slug: string, structured: typeof structuredProfile) => {
    if (!structured) {
      return;
    }

    setPersisting(true);
    try {
      const { error } = await supabase.from('site_projects').upsert({
        slug,
        site_type: siteType,
        deep_answers: deepAnswers,
        inspirations: selectedInspirations,
        structured_profile: structured,
        language: i18n.language,
      });

      if (error) {
        console.error('Error saving project:', error);
        toast.error(t('persistError'));
      }
    } catch (error) {
      console.error('Failed to persist project:', error);
      toast.error(t('persistError'));
    } finally {
      setPersisting(false);
    }
  };

  const shareUrl = useMemo(
    () => (generatedSlug ? `${window.location.origin}/preview/${generatedSlug}` : ''),
    [generatedSlug],
  );

  const handleCopyLink = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success(t('copied'));
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsApp = () => {
    const message =
      i18n.language === 'fr'
        ? `Bonjour, je souhaite finaliser mon site généré sur Site-Factory : ${shareUrl}`
        : `Hello, I would like to finalize my website generated on Site-Factory: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (generating) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="mb-6 h-16 w-16 animate-spin text-primary" />
        <h3 className="mb-2 text-xl font-bold">{t('generating')}</h3>
        <p className="text-muted-foreground">{t('generatingDesc')}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-border/60 bg-background/85 p-10 text-center shadow-[0_30px_120px_rgba(221,31,20,0.28)]"
      >
        <SketchAccent className="pointer-events-none absolute -right-20 top-6 h-48 w-48 text-primary/18" intensity="bold" />
        <SketchAccent className="pointer-events-none absolute -left-20 bottom-[-4rem] h-44 w-44 rotate-12 text-primary/12" />

        <div className="relative z-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-primary/30 text-primary">
            <Check className="h-10 w-10 text-primary-foreground" />
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            {t('previewReady')}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">{t('generationSubtitle')}</p>

          {persisting && (
            <Badge variant="outline" className="mt-4 inline-flex items-center gap-2 border-primary/60 text-primary">
              <Loader2 className="h-3 w-3 animate-spin" />
              {t('persisting')}
            </Badge>
          )}

          <div className="mt-10 grid gap-8 text-left lg:grid-cols-[2fr_1fr]">
            <div className="space-y-6 rounded-2xl border border-border/60 bg-background/70 p-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                {t('profileSummary')}
              </h3>
              {structuredProfile ? (
                <div className="space-y-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{t('profileName')}</p>
                    <p className="mt-2 text-xl font-semibold text-foreground">{structuredProfile.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{structuredProfile.title}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{t('profilePitch')}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{structuredProfile.description}</p>
                  </div>
                  {selectedInspirations.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {selectedInspirations.map((inspiration) => (
                        <div key={inspiration.id} className="rounded-xl border border-border/60 bg-background/80 p-4">
                          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{inspiration.domain}</p>
                          <p className="mt-2 text-base font-semibold text-foreground">{inspiration.title}</p>
                          <p className="mt-2 text-sm text-muted-foreground">{inspiration.justification}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">{t('inspirationsSubtitle')}</p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">{t('profileLoading')}</p>
              )}
            </div>

            <aside className="flex flex-col justify-between rounded-2xl border border-border/60 bg-muted/20 p-6">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  {t('shareYourSite')}
                </h3>
                <p className="text-sm text-muted-foreground">{t('shareSubtitle')}</p>
                <div className="flex flex-col gap-3">
                  <Button
                    variant="outline"
                    className="gap-2 border-border/70 text-xs uppercase tracking-[0.3em]"
                    onClick={() => window.open(shareUrl, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                    {t('viewSite')}
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2 border-border/70 text-xs uppercase tracking-[0.3em]"
                    onClick={handleCopyLink}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                    {copied ? t('copied') : t('shareLink')}
                  </Button>
                </div>
              </div>

              <div className="mt-6 space-y-3 rounded-2xl border border-primary/40 bg-primary/10 p-6 text-left">
                <h3 className="text-base font-semibold text-primary">{t('finalizeTitle')}</h3>
                <p className="text-2xl font-bold text-primary">{t('price')}</p>
                <p className="text-sm text-muted-foreground">{t('priceDesc')}</p>
                <Button
                  size="lg"
                  className="mt-2 gap-2 bg-primary text-xs uppercase tracking-[0.3em] hover:bg-primary/90"
                  onClick={handleWhatsApp}
                >
                  <MessageCircle className="h-5 w-5" />
                  {t('chatWhatsApp')}
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
