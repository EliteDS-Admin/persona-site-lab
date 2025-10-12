import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useSiteFactory } from '@/contexts/SiteFactoryContext';
import { Button } from '@/components/ui/button';
import { Loader2, ExternalLink, Share2, MessageCircle, Check, RefreshCw } from 'lucide-react';
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
    setGeneratedSiteHtml,
    setCurrentStep,
    setSiteType,
    setDeepAnswers,
    setSelectedInspirations,
  } = useSiteFactory();
  const [generating, setGenerating] = useState(true);
  const [copied, setCopied] = useState(false);
  const [persisting, setPersisting] = useState(false);
  const [persistError, setPersistError] = useState(false);
  const [htmlReady, setHtmlReady] = useState(false);
  const [archiveSaving, setArchiveSaving] = useState(false);
  const [archiveUrl, setArchiveUrl] = useState<string | null>(null);
  const [archiveError, setArchiveError] = useState(false);
  const [archiveSkipped, setArchiveSkipped] = useState(false);
  const [edgeDeploying, setEdgeDeploying] = useState(false);
  const [edgeDeploySkipped, setEdgeDeploySkipped] = useState(false);
  const [edgeDeployError, setEdgeDeployError] = useState(false);

  useEffect(() => {
    void generateSite();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateSite = async () => {
    setGenerating(true);
    setHtmlReady(false);
    setGeneratedSiteHtml(null);
    setArchiveUrl(null);
    setArchiveError(false);
    setArchiveSkipped(false);
    setEdgeDeploySkipped(false);
    setEdgeDeployError(false);
    setPersistError(false);

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
        const success = await generateHtmlAndPersist(slug, data.structuredProfile);
        if (success) {
          toast.success(t('previewReady'));
        }
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

  const generateHtmlAndPersist = async (slug: string, structured: typeof structuredProfile) => {
    if (!structured) {
      return false;
    }

    try {
      const { data: htmlData, error: htmlError } = await supabase.functions.invoke('generate-site-code', {
        body: {
          structuredProfile: structured,
          deepAnswers,
          selectedInspirations,
          language: i18n.language,
        },
      });

      if (htmlError) {
        console.error('Error generating site HTML:', htmlError);
        toast.error(t('errorGeneratingHtml'));
        return false;
      }

      if (htmlData?.html) {
        setGeneratedSiteHtml(htmlData.html);
        let overallSuccess = true;

        const persisted = await persistProject(slug, structured, htmlData.html);
        if (!persisted) {
          overallSuccess = false;
        }

        const archived = await archiveSiteCode(slug, htmlData.html);
        if (!archived) {
          overallSuccess = false;
        }

        const deployed = await deployEdgeOne(slug, htmlData.html);
        if (!deployed) {
          overallSuccess = false;
        }

        setHtmlReady(true);
        return overallSuccess;
      } else {
        toast.error(t('errorGeneratingHtml'));
        return false;
      }
    } catch (error) {
      console.error('Failed to generate site HTML:', error);
      toast.error(t('errorGeneratingHtml'));
      return false;
    }
  };

  const persistProject = async (slug: string, structured: typeof structuredProfile, siteHtml: string | null) => {
    if (!structured) {
      return false;
    }

    setPersisting(true);
    setPersistError(false);
    try {
      const { error } = await supabase.from('site_projects').upsert({
        slug,
        site_type: siteType,
        deep_answers: deepAnswers,
        inspirations: selectedInspirations,
        structured_profile: structured,
        language: i18n.language,
        site_code: siteHtml,
      });

      if (error) {
        console.error('Error saving project:', error);
        toast.error(t('persistError'));
        setPersistError(true);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Failed to persist project:', error);
      toast.error(t('persistError'));
      setPersistError(true);
      return false;
    } finally {
      setPersisting(false);
    }
  };

  const archiveSiteCode = async (slug: string, siteHtml: string) => {
    setArchiveSaving(true);
    setArchiveError(false);
    setArchiveSkipped(false);
    try {
      const { data, error } = await supabase.functions.invoke('archive-site-code', {
        body: {
          slug,
          html: siteHtml,
        },
      });

      if (error || data?.error) {
        console.error('Error archiving site code:', error || data?.error);
        toast.error(t('archiveError'));
        setArchiveError(true);
        return false;
      }

      if (data?.skipped) {
        setArchiveSkipped(true);
        if (data?.publicUrl) {
          setArchiveUrl(data.publicUrl);
        }
        return true;
      }

      if (data?.publicUrl) {
        setArchiveUrl(data.publicUrl);
      }

      return true;
    } catch (error) {
      console.error('Failed to archive site code:', error);
      toast.error(t('archiveError'));
      setArchiveError(true);
      return false;
    } finally {
      setArchiveSaving(false);
    }
  };

  const deployEdgeOne = async (slug: string, siteHtml: string) => {
    setEdgeDeploying(true);
    setEdgeDeployError(false);
    setEdgeDeploySkipped(false);

    try {
      const { data, error } = await supabase.functions.invoke('deploy-edgeone', {
        body: {
          slug,
          html: siteHtml,
        },
      });

      if (error) {
        throw error;
      }

      if (data?.skipped) {
        setEdgeDeploySkipped(true);
      }

      return true;
    } catch (error) {
      console.error('Failed to deploy site to EdgeOne:', error);
      toast.error(t('edgeDeployError'));
      setEdgeDeployError(true);
      return false;
    } finally {
      setEdgeDeploying(false);
    }
  };

  const siteUrl = useMemo(() => {
    if (!generatedSlug) {
      return '';
    }
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return origin ? `${origin}/site/${generatedSlug}` : '';
  }, [generatedSlug]);

  const previewUrl = useMemo(() => {
    if (!generatedSlug) {
      return '';
    }
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return origin ? `${origin}/preview/${generatedSlug}` : '';
  }, [generatedSlug]);

  const handleCopyLink = () => {
    if (siteUrl && htmlReady) {
      navigator.clipboard.writeText(siteUrl);
      setCopied(true);
      toast.success(t('copied'));
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsApp = () => {
    if (!htmlReady || !siteUrl) {
      return;
    }
    const message =
      i18n.language === 'fr'
        ? `Bonjour, je souhaite finaliser mon site généré sur Site-Factory : ${siteUrl}`
        : `Hello, I would like to finalize my website generated on Site-Factory: ${siteUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleRestart = () => {
    setSiteType(null);
    setDeepAnswers('');
    setSelectedInspirations([]);
    setStructuredProfile(null);
    setGeneratedSlug(null);
    setGeneratedSiteHtml(null);
    setCurrentStep(1);
    localStorage.removeItem('siteFactory');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast.success(t('flowRestarted'));
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

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          {!htmlReady && (
            <Badge variant="secondary" className="inline-flex items-center gap-2 border-dashed border-primary/40 bg-primary/10 text-primary">
              <Loader2 className="h-3 w-3 animate-spin" />
              {t('htmlBuilding')}
              </Badge>
            )}
          {persisting && (
            <Badge variant="outline" className="inline-flex items-center gap-2 border-primary/60 text-primary">
              <Loader2 className="h-3 w-3 animate-spin" />
              {t('persisting')}
            </Badge>
          )}
          {persistError && !persisting && (
            <Badge variant="destructive" className="inline-flex items-center gap-2">
              {t('persistErrorShort')}
            </Badge>
          )}
          {archiveSaving && (
            <Badge variant="outline" className="inline-flex items-center gap-2 border-primary/60 text-primary">
              <Loader2 className="h-3 w-3 animate-spin" />
              {t('archiveSaving')}
            </Badge>
          )}
          {archiveSkipped && !archiveSaving && !archiveError && (
            <Badge variant="secondary" className="inline-flex items-center gap-2 border-primary/40 bg-primary/10 text-primary">
              {t('archiveSkipped')}
            </Badge>
          )}
          {edgeDeploying && (
            <Badge variant="outline" className="inline-flex items-center gap-2 border-primary/60 text-primary">
              <Loader2 className="h-3 w-3 animate-spin" />
              {t('edgeDeploying')}
            </Badge>
            )}
            {edgeDeploySkipped && !edgeDeploying && (
              <Badge variant="secondary" className="inline-flex items-center gap-2 border-primary/40 bg-primary/10 text-primary">
                {t('edgeDeploySkipped')}
              </Badge>
            )}
            {htmlReady && !archiveSaving && !persisting && !edgeDeploying && (
              <Badge variant="secondary" className="inline-flex items-center gap-2 border-primary/40 bg-primary/10 text-primary">
                <Check className="h-3 w-3" />
                {t('htmlReady')}
              </Badge>
            )}
            {archiveError && (
              <Badge variant="destructive" className="inline-flex items-center gap-2">
                {t('archiveErrorShort')}
              </Badge>
            )}
            {edgeDeployError && (
              <Badge variant="destructive" className="inline-flex items-center gap-2">
                {t('edgeDeployErrorShort')}
              </Badge>
            )}
          </div>

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
                  {htmlReady ? (
                    <>
                      <Button
                        variant="outline"
                        className="gap-2 border-border/70 text-xs uppercase tracking-[0.3em]"
                        onClick={() => {
                          if (siteUrl) {
                            window.open(siteUrl, '_blank');
                          }
                        }}
                      >
                        <ExternalLink className="h-4 w-4" />
                        {t('viewSite')}
                      </Button>
                      <Button
                        variant="outline"
                        className="gap-2 border-border/70 text-xs uppercase tracking-[0.3em]"
                        onClick={() => {
                          if (previewUrl) {
                            window.open(previewUrl, '_blank');
                          }
                        }}
                      >
                        <ExternalLink className="h-4 w-4" />
                        {t('previewLink')}
                      </Button>
                      <Button
                        variant="outline"
                        className="gap-2 border-border/70 text-xs uppercase tracking-[0.3em]"
                        onClick={handleCopyLink}
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                        {copied ? t('copied') : t('shareLink')}
                      </Button>
                      {archiveUrl && (
                        <Button
                          variant="outline"
                          className="gap-2 border-border/70 text-xs uppercase tracking-[0.3em]"
                          onClick={() => window.open(archiveUrl, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
                          {t('downloadArchive')}
                        </Button>
                      )}
                    </>
                  ) : (
                    <div className="rounded-lg border border-dashed border-border/60 bg-background/60 px-4 py-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      {t('ctaLocked')}
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    className="gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground"
                    onClick={handleRestart}
                  >
                    <RefreshCw className="h-4 w-4" />
                    {t('createNewSite')}
                  </Button>
                </div>
              </div>

              <div className="mt-6 space-y-3 rounded-2xl border border-primary/40 bg-primary/10 p-6 text-left">
                <h3 className="text-base font-semibold text-primary">{t('finalizeTitle')}</h3>
                <p className="text-2xl font-bold text-primary">{t('price')}</p>
                <p className="text-sm text-muted-foreground">{t('priceDesc')}</p>
                {htmlReady ? (
                  <Button
                    size="lg"
                    className="mt-2 gap-2 bg-primary text-xs uppercase tracking-[0.3em] hover:bg-primary/90"
                    onClick={handleWhatsApp}
                  >
                    <MessageCircle className="h-5 w-5" />
                    {t('chatWhatsApp')}
                  </Button>
                ) : (
                  <div className="mt-2 rounded-full border border-dashed border-primary/40 px-4 py-2 text-center text-xs uppercase tracking-[0.3em] text-primary">
                    {t('ctaLockedShort')}
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
