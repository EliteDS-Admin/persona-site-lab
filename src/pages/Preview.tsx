import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Preview = () => {
  const { slug } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Site-Factory Preview
          </h1>
          <Button variant="outline" size="sm" className="gap-2">
            <ExternalLink className="w-4 h-4" />
            Partager
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-card border border-border rounded-xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Aperçu du site généré</h2>
            <p className="text-muted-foreground mb-8">Slug: {slug}</p>
            
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Contenu du site généré ici</p>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary rounded-xl">
              <h3 className="text-xl font-bold mb-2">Vous aimez ce que vous voyez ?</h3>
              <p className="text-muted-foreground mb-4">
                Contactez-nous pour finaliser et héberger votre site professionnel
              </p>
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                Finaliser mon site - 35 000 FCFA
              </Button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Preview;
