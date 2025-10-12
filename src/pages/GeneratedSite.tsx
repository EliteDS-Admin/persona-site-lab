import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { SketchAccent } from '@/components/SketchAccent';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import type { StructuredProfile } from '@/contexts/SiteFactoryContext';
import { sanitizeHtml } from '@/utils/sanitizeHtml';

interface SavedProject {
  structured_profile: StructuredProfile | null;
  site_type: string | null;
  deep_answers: string | null;
  site_code: string | null;
}

const fallbackPrimary = '#dd1f14';
const fallbackSecondary = '#ff6f61';
const fallbackBackground = '#060807';

const GeneratedSite = () => {
  const { slug } = useParams();
  const [profile, setProfile] = useState<StructuredProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [siteHtml, setSiteHtml] = useState<string | null>(null);

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
          .select('structured_profile, site_type, deep_answers, site_code')
          .eq('slug', slug)
          .maybeSingle();

        if (error) {
          console.error('Error loading generated site', error);
        }

        const project = data as SavedProject | null;
        if (project?.structured_profile) {
          setProfile(project.structured_profile);
        }
        if (project?.site_code) {
          setSiteHtml(project.site_code);
        }
      } catch (error) {
        console.error('Failed to load generated site', error);
      } finally {
        setLoading(false);
      }
    };

    void loadProject();
  }, [slug]);

  const colors = useMemo(() => {
    const primary = profile?.colors?.primary || fallbackPrimary;
    const secondary = profile?.colors?.secondary || fallbackSecondary;

    return {
      primary,
      secondary,
      background: fallbackBackground,
      gradient: `radial-gradient(circle at 10% 20%, ${primary}33 0%, transparent 55%), radial-gradient(circle at 90% 10%, ${secondary}26 0%, transparent 45%), radial-gradient(circle at 90% 90%, ${primary}20 0%, transparent 60%), ${fallbackBackground}`,
    };
  }, [profile?.colors]);

  const sanitizedHtml = useMemo(() => (siteHtml ? sanitizeHtml(siteHtml) : null), [siteHtml]);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => document.documentElement.classList.remove('dark');
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#060807] text-white">
        <Loader2 className="mb-4 h-10 w-10 animate-spin text-[#dd1f14]" />
        <p className="text-sm uppercase tracking-[0.35em] text-white/70">Préparation du site…</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#060807] text-center text-white">
        <p className="text-2xl font-semibold">Ce projet est introuvable ou n'est pas encore prêt.</p>
        <a
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#dd1f14] px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-[#f2362c]"
        >
          Revenir à l'accueil
        </a>
      </div>
    );
  }

  if (!sanitizedHtml) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#060807] px-6 text-center text-white">
        <Loader2 className="mb-4 h-10 w-10 animate-spin text-[#dd1f14]" />
        <p className="text-xl font-semibold">Le site statique est encore en cours d'assemblage.</p>
        <p className="mt-2 max-w-2xl text-sm text-white/70">
          Rafraîchis cette page dans quelques instants pour découvrir la version finale ou relance la génération depuis l'atelier.
        </p>
        <a
          href={`/preview/${slug}`}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/10"
        >
          Voir l'aperçu
        </a>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-white" style={{ background: colors.gradient }}>
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <SketchAccent className="absolute -left-24 top-24 h-72 w-72 text-white/10" intensity="bold" />
        <SketchAccent className="absolute right-10 top-10 h-64 w-64 text-white/12" />
        <SketchAccent className="absolute bottom-10 right-1/3 h-56 w-56 text-white/10" intensity="bold" />
      </div>

      <header className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Site généré par Site-Factory</p>
            <p className="text-sm uppercase tracking-[0.3em] text-white/40">{slug}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-white/30 bg-white/10 text-xs uppercase tracking-[0.3em] text-white hover:bg-white/20"
            onClick={() =>
              sanitizedHtml &&
              window.open(
                'https://wa.me/?text=' +
                  encodeURIComponent(`Bonjour, je viens de découvrir mon site ${window.location.href}`),
                '_blank',
              )
            }
            disabled={!sanitizedHtml}
          >
            Discuter
          </Button>
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto max-w-6xl px-6 pb-24 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-0 shadow-[0_40px_120px_rgba(6,8,7,0.55)]"
          >
            <div className="generated-site-output text-left text-base" dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/30 py-10 backdrop-blur-lg">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs uppercase tracking-[0.3em] text-white/50 sm:flex-row">
          <span>© {new Date().getFullYear()} Site-Factory</span>
          <span>Créé automatiquement pour {profile.name}</span>
          <a href="/" className="text-white/70 underline-offset-4 hover:text-white">
            Relancer un projet
          </a>
        </div>
      </footer>
    </div>
  );
};

export default GeneratedSite;
