import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import type { StructuredProfile } from '@/contexts/SiteFactoryContext';

const Preview = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const [profile, setProfile] = useState<StructuredProfile | null>(null);

  useEffect(() => {
    // Load structured profile from localStorage
    const saved = localStorage.getItem('siteFactory');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.structuredProfile) {
          setProfile(data.structuredProfile);
        }
      } catch (e) {
        console.error('Failed to load profile', e);
      }
    }
  }, []);

  const handleWhatsApp = () => {
    const message = i18n.language === 'fr'
      ? `Bonjour, je souhaite finaliser mon site généré sur Site-Factory : ${window.location.href}`
      : `Hello, I would like to finalize my website generated on Site-Factory: ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    // Toast notification would go here
  };

  return (
    <div className="min-h-screen bg-background" style={profile ? {
      '--primary-color': profile.colors.primary,
      '--secondary-color': profile.colors.secondary,
    } as React.CSSProperties : {}}>
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Site-Factory
          </h1>
          <Button variant="outline" size="sm" className="gap-2" onClick={handleShare}>
            <ExternalLink className="w-4 h-4" />
            {t('shareLink')}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {profile ? (
            <>
              {/* Hero Section */}
              <div className="text-center mb-16">
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
                >
                  {profile.name}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl sm:text-2xl text-muted-foreground mb-6"
                >
                  {profile.title}
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg text-muted-foreground max-w-3xl mx-auto"
                >
                  {profile.description}
                </motion.p>
              </div>

              {/* Sections */}
              <div className="space-y-12 mb-16">
                {profile.sections.map((section, index) => (
                  <motion.section
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="bg-card border border-border rounded-xl p-8"
                  >
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">{section.title}</h2>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                  </motion.section>
                ))}
              </div>

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary rounded-xl p-8 text-center"
              >
                <h3 className="text-2xl font-bold mb-4">{t('finalizeTitle')}</h3>
                <p className="text-3xl font-bold text-primary mb-2">{t('price')}</p>
                <p className="text-muted-foreground mb-6">{t('priceDesc')}</p>
                <Button
                  size="lg"
                  className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  onClick={handleWhatsApp}
                >
                  <MessageCircle className="w-5 h-5" />
                  {t('chatWhatsApp')}
                </Button>
              </motion.div>
            </>
          ) : (
            <div className="bg-card border border-border rounded-xl p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">{t('sitePreview')}</h2>
              <p className="text-muted-foreground mb-8">Slug: {slug}</p>
              
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-8">
                <p className="text-muted-foreground">{t('generatingDesc')}</p>
              </div>

              <div className="bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2">{t('finalizeTitle')}</h3>
                <p className="text-muted-foreground mb-4">{t('priceDesc')}</p>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-accent gap-2"
                  onClick={handleWhatsApp}
                >
                  <MessageCircle className="w-5 h-5" />
                  {t('chatWhatsApp')} - {t('price')}
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>{t('appName')} © 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default Preview;
