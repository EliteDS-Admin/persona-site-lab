import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useSiteFactory, type Inspiration } from '@/contexts/SiteFactoryContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Loader2, Check } from 'lucide-react';
import { toast } from 'sonner';

export const StepInspirations = () => {
  const { t } = useTranslation();
  const { deepAnswers, selectedInspirations, setSelectedInspirations, setCurrentStep } = useSiteFactory();
  const [inspirations, setInspirations] = useState<Inspiration[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInspirations();
  }, []);

  const fetchInspirations = async () => {
    setLoading(true);
    
    // Mock inspirations for now - will be replaced with real API call
    setTimeout(() => {
      const mockInspirations: Inspiration[] = [
        {
          id: '1',
          title: 'Minimalist Portfolio',
          url: 'https://example.com',
          image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
          domain: 'example.com',
          justification: 'Clean design with strong typography',
        },
        {
          id: '2',
          title: 'Creative Agency',
          url: 'https://example2.com',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
          domain: 'example2.com',
          justification: 'Bold colors and engaging animations',
        },
        {
          id: '3',
          title: 'Modern Business',
          url: 'https://example3.com',
          image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop',
          domain: 'example3.com',
          justification: 'Professional layout with clear CTAs',
        },
        {
          id: '4',
          title: 'Tech Startup',
          url: 'https://example4.com',
          image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
          domain: 'example4.com',
          justification: 'Innovative design with great UX',
        },
        {
          id: '5',
          title: 'Personal Brand',
          url: 'https://example5.com',
          image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
          domain: 'example5.com',
          justification: 'Authentic storytelling approach',
        },
      ];
      setInspirations(mockInspirations);
      setLoading(false);
    }, 1500);
  };

  const toggleSelection = (inspiration: Inspiration) => {
    const isSelected = selectedInspirations.find(i => i.id === inspiration.id);
    
    if (isSelected) {
      setSelectedInspirations(selectedInspirations.filter(i => i.id !== inspiration.id));
    } else {
      if (selectedInspirations.length >= 2) {
        toast.error(t('selectMax2'));
        return;
      }
      setSelectedInspirations([...selectedInspirations, inspiration]);
    }
  };

  const canProceed = selectedInspirations.length > 0;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">{t('searching')}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">{t('inspirationsTitle')}</h2>
          <p className="text-muted-foreground">{t('inspirationsSubtitle')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                  className={`w-full rounded-xl border-2 overflow-hidden transition-all hover:scale-105 ${
                    isSelected
                      ? 'border-primary shadow-glow'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={inspiration.image}
                      alt={inspiration.title}
                      className="w-full h-48 object-cover"
                    />
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-card text-left">
                    <h3 className="font-bold mb-1">{inspiration.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{inspiration.domain}</p>
                    <p className="text-sm text-muted-foreground">{inspiration.justification}</p>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(2)}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('previous')}
          </Button>
          <Button
            onClick={() => setCurrentStep(4)}
            disabled={!canProceed}
            className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            {t('generate')}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
