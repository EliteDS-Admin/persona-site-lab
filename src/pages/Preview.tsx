import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, MessageCircle, Share2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useEffect, useMemo, useState } from 'react';
import type { StructuredProfile, Inspiration } from '@/contexts/SiteFactoryContext';
import { supabase } from '@/integrations/supabase/client';
import { SketchAccent } from '@/components/SketchAccent';
import { sanitizeHtml } from '@/utils/sanitizeHtml';

interface SavedProject {
  structured_profile: StructuredProfile | null;
  inspirations: Inspiration[] | null;
  site_type: string | null;
  deep_answers: string | null;
  site_code: string | null;
}

const Preview = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const [profile, setProfile] = useState<StructuredProfile | null>(null);
  const [inspirations, setInspirations] = useState<Inspiration[]>([]);
  const [loading, setLoading] = useState(true);
  const [siteHtml, setSiteHtml] = useState<string | null>(null);
  const isStaticReady = Boolean(siteHtml);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, []);

  useEffect(() => {
    const loadProject = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('site_projects')
          .select('structured_profile, inspirations, site_type, deep_answers, site_code')
          .eq('slug', slug)
          .maybeSingle();

        if (error) {
          console.error('Error loading preview', error);
        }

        const project = data as SavedProject | null;
        if (project?.structured_profile) {
          setProfile(project.structured_profile);
        }
        if (project?.inspirations) {
          setInspirations(project.inspirations);
        }
        if (project?.site_code) {
          setSiteHtml(project.site_code);
        }
      } catch (error) {
        console.error('Failed to load preview', error);
      } finally {
        setLoading(false);
      }
    };

    void loadProject();
  }, [slug]);

  const handleWhatsApp = () => {
    const message =
      i18n.language === 'fr'
        ? `Bonjour, je souhaite finaliser mon site généré sur Site-Factory : ${window.location.href}`
        : `Hello, I would like to finalize my website generated on Site-Factory: ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const sanitizedHtml = useMemo(() => (siteHtml ? sanitizeHtml(siteHtml) : null), [siteHtml]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-80" style={{ backgroundImage: 'var(--gradient-hero)' }} />
        <div className="absolute inset-0 backdrop-blur-[120px]" />
        <SketchAccent className="absolute -left-24 -top-16 h-72 w-72 text-primary/20" intensity="bold" />
        <SketchAccent className="absolute -right-20 top-28 h-64 w-64 rotate-12 text-primary/15" />
      </div>

      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between px-4 py-5">
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{t('appName')}</span>
            <h1 className="text-2xl font-black text-primary">Preview</h1>
          </div>
          <Button variant="outline" size="sm" className="gap-2 border-border/70" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
            {t('shareLink')}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-5xl">
          {loading ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-border/60 bg-background/80 p-16 text-center">
              <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">{t('generatingDesc')}</p>
            </div>
          ) : profile ? (
            <div className="space-y-10">
              {sanitizedHtml ? (
                <section className="overflow-hidden rounded-3xl border border-border/60 bg-background/80 shadow-[0_30px_100px_rgba(221,31,20,0.2)]">
                  <div className="border-b border-border/60 bg-primary/10 px-8 py-6">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{t('aiDraftPreview')}</h2>
                    <p className="mt-2 text-xs text-muted-foreground">{t('aiDraftPreviewSubtitle')}</p>
                  </div>
                  <div className="generated-site-output text-left text-base" dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
                </section>
              ) : (
                <section className="rounded-3xl border border-dashed border-primary/40 bg-background/80 p-10 text-center">
                  <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">{t('htmlBuilding')}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t('htmlBuildingDesc')}</p>
                </section>
              )}
              <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-background/80 p-10 text-center shadow-[0_25px_90px_rgba(221,31,20,0.25)]">
                <SketchAccent className="pointer-events-none absolute -right-20 -top-14 h-48 w-48 text-primary/15" intensity="bold" />
                <div className="relative z-10 space-y-6">
                  <h2 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">{profile.name}</h2>
                  <p className="text-xl text-muted-foreground">{profile.title}</p>
                  <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
                    {profile.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {isStaticReady ? (
                      <Button
                        className="gap-2 bg-primary text-xs uppercase tracking-[0.3em] hover:bg-primary/90"
                        onClick={() => {
                          if (slug) {
                            window.open(`${window.location.origin}/site/${slug}`, '_blank');
                          }
                        }}
                      >
                        <ExternalLink className="h-4 w-4" />
                        {t('viewSite')}
                      </Button>
                    ) : (
                      <div className="rounded-full border border-dashed border-primary/40 px-4 py-2 text-xs uppercase tracking-[0.3em] text-primary">
                        {t('ctaLockedShort')}
                      </div>
                    )}
                  </div>
                </div>
              </section>

              <section className="grid gap-6">
                {profile.sections.map((section, index) => (
                  <div
                    key={index}
                    className="rounded-3xl border border-border/60 bg-background/80 p-8 shadow-[0_18px_65px_rgba(221,31,20,0.2)]"
                  >
                    <h3 className="text-2xl font-semibold text-foreground">{section.title}</h3>
                    <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-muted-foreground">
                      {section.content}
                    </p>
                  </div>
                ))}
              </section>

              {inspirations.length > 0 && (
                <section className="rounded-3xl border border-border/60 bg-background/80 p-8">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                    {t('inspirationsTitle')}
                  </h3>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    {inspirations.map((inspiration) => (
                      <div key={inspiration.id} className="rounded-2xl border border-border/60 bg-background/70 p-5">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{inspiration.domain}</p>
                        <p className="mt-2 text-lg font-semibold text-foreground">{inspiration.title}</p>
                        <p className="mt-2 text-sm text-muted-foreground">{inspiration.justification}</p>
                        <a
                          href={inspiration.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary hover:text-primary/80"
                        >
                          <ExternalLink className="h-4 w-4" />
                          {t('viewSite')}
                        </a>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section className="rounded-3xl border border-primary/40 bg-primary/10 p-8 text-center shadow-[0_25px_90px_rgba(221,31,20,0.25)]">
                <h3 className="text-2xl font-semibold text-primary">{t('finalizeTitle')}</h3>
                <p className="mt-2 text-3xl font-bold text-primary">{t('price')}</p>
                <p className="mt-3 text-sm text-muted-foreground">{t('priceDesc')}</p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  {isStaticReady ? (
                    <Button
                      size="lg"
                      className="gap-2 bg-primary text-xs uppercase tracking-[0.3em] hover:bg-primary/90"
                      onClick={handleWhatsApp}
                    >
                      <MessageCircle className="h-5 w-5" />
                      {t('chatWhatsApp')}
                    </Button>
                  ) : (
                    <div className="rounded-full border border-dashed border-primary/40 px-4 py-2 text-xs uppercase tracking-[0.3em] text-primary">
                      {t('ctaLockedShort')}
                    </div>
                  )}
                  <Button
                    variant="outline"
                    className="gap-2 border-border/70 text-xs uppercase tracking-[0.3em]"
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4" />
                    {t('shareLink')}
                  </Button>
                </div>
              </section>
            </div>
          ) : (
            <div className="rounded-3xl border border-border/60 bg-background/80 p-12 text-center">
              <h2 className="text-2xl font-bold text-foreground">{t('sitePreview')}</h2>
              <p className="mt-2 text-sm text-muted-foreground">Slug: {slug}</p>
              <p className="mt-6 text-sm text-muted-foreground">{t('errorLoading')}</p>
            </div>
          )}
        </motion.div>
      </main>

      <footer className="border-t border-border/60 py-8">
        <div className="container mx-auto px-4 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <p>{t('appName')} © 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default Preview;
