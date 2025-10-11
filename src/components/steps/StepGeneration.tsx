import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useSiteFactory } from '@/contexts/SiteFactoryContext';
import { Button } from '@/components/ui/button';
import { Loader2, ExternalLink, Share2, MessageCircle, Check } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const StepGeneration = () => {
  const { t, i18n } = useTranslation();
  const { deepAnswers, siteType, selectedInspirations, structuredProfile, setStructuredProfile, generatedSlug, setGeneratedSlug } = useSiteFactory();
  const [generating, setGenerating] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    generateSite();
  }, []);

  const generateSite = async () => {
    setGenerating(true);
    
    try {
      // Structure the profile with AI
      const { data, error } = await supabase.functions.invoke('structure-profile', {
        body: {
          deepAnswers,
          siteType,
          selectedInspirations,
          language: i18n.language
        }
      });

      if (error) {
        console.error('Error structuring profile:', error);
        toast.error(t('errorGenerating'));
        setGenerating(false);
        return;
      }

      if (data?.structuredProfile) {
        setStructuredProfile(data.structuredProfile);
        const slug = `site-${Date.now()}`;
        setGeneratedSlug(slug);
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

  const shareUrl = generatedSlug ? `${window.location.origin}/preview/${generatedSlug}` : '';

  const handleCopyLink = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success(t('copied'));
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsApp = () => {
    const message = i18n.language === 'fr'
      ? `Bonjour, je souhaite finaliser mon site généré sur Site-Factory : ${shareUrl}`
      : `Hello, I would like to finalize my website generated on Site-Factory: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (generating) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-16 h-16 animate-spin text-primary mb-6" />
        <h3 className="text-xl font-bold mb-2">{t('generating')}</h3>
        <p className="text-muted-foreground">{t('generatingDesc')}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-white" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {t('previewReady')}
        </h2>

        <div className="bg-card border-2 border-border rounded-xl p-8 mb-8">
          <div className="aspect-video bg-muted rounded-lg mb-6 flex items-center justify-center">
            <p className="text-muted-foreground">{t('sitePreview')}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => window.open(shareUrl, '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
              {t('viewSite')}
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleCopyLink}
            >
              {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              {copied ? t('copied') : t('shareLink')}
            </Button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary rounded-xl p-8">
          <h3 className="text-xl font-bold mb-2">{t('finalizeTitle')}</h3>
          <p className="text-2xl font-bold text-primary mb-4">{t('price')}</p>
          <p className="text-sm text-muted-foreground mb-6">{t('priceDesc')}</p>
          
          <Button
            size="lg"
            className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
            onClick={handleWhatsApp}
          >
            <MessageCircle className="w-5 h-5" />
            {t('chatWhatsApp')}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
