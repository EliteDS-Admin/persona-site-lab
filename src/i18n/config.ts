import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      appName: 'Site-Factory',
      tagline: 'Créez votre site en quelques minutes',
      step1: 'Type de site',
      step2: 'Questionnaire',
      step3: 'Inspirations',
      step4: 'Génération',
      personal: 'Personnel',
      business: 'Professionnel',
      personalDesc: 'Portfolio, CV, blog personnel',
      businessDesc: 'Site vitrine, entreprise, e-commerce',
      next: 'Suivant',
      previous: 'Précédent',
      select: 'Sélectionner',
      generate: 'Générer mon site',
      questionPersonal: 'Parlez-nous de vous : qui êtes-vous, quelles sont vos passions, vos compétences, vos objectifs ? Que voulez-vous montrer au monde ?',
      questionBusiness: 'Présentez votre activité : que proposez-vous, à qui, pourquoi vous différenciez-vous ? Quels sont vos services, votre histoire, votre vision ?',
      placeholderPersonal: 'Exemple : Je suis développeur web passionné par le design, je crée des expériences digitales innovantes...',
      placeholderBusiness: 'Exemple : Nous sommes une agence de marketing digital spécialisée dans les PME, nous aidons nos clients à doubler leur visibilité en ligne...',
      searching: 'Recherche d\'inspirations...',
      inspirationsTitle: 'Sites qui pourraient vous inspirer',
      inspirationsSubtitle: 'Sélectionnez jusqu\'à 2 sites qui correspondent à votre vision',
      selected: 'Sélectionné',
      generating: 'Génération en cours...',
      previewReady: 'Votre site est prêt !',
      shareLink: 'Partager le lien',
      chatWhatsApp: 'Parler sur WhatsApp',
      price: '35 000 FCFA',
      priceDesc: 'Finalisez votre site professionnel',
      copied: 'Lien copié !',
      minChars: 'Minimum 100 caractères requis',
      selectMax2: 'Sélectionnez 2 sites maximum',
      errorLoading: 'Erreur lors du chargement',
      errorGenerating: 'Erreur lors de la génération',
      generatingDesc: 'Création de votre site personnalisé...',
      sitePreview: 'Aperçu du site généré',
      viewSite: 'Voir le site',
      finalizeTitle: 'Finalisez votre site professionnel',
    }
  },
  en: {
    translation: {
      appName: 'Site-Factory',
      tagline: 'Create your website in minutes',
      step1: 'Site Type',
      step2: 'Questionnaire',
      step3: 'Inspirations',
      step4: 'Generation',
      personal: 'Personal',
      business: 'Business',
      personalDesc: 'Portfolio, Resume, Personal Blog',
      businessDesc: 'Showcase, Company, E-commerce',
      next: 'Next',
      previous: 'Previous',
      select: 'Select',
      generate: 'Generate my site',
      questionPersonal: 'Tell us about yourself: who are you, what are your passions, skills, goals? What do you want to show the world?',
      questionBusiness: 'Present your business: what do you offer, to whom, why are you different? What are your services, your story, your vision?',
      placeholderPersonal: 'Example: I\'m a web developer passionate about design, I create innovative digital experiences...',
      placeholderBusiness: 'Example: We are a digital marketing agency specialized in SMEs, we help our clients double their online visibility...',
      searching: 'Searching for inspirations...',
      inspirationsTitle: 'Sites that might inspire you',
      inspirationsSubtitle: 'Select up to 2 sites that match your vision',
      selected: 'Selected',
      generating: 'Generating...',
      previewReady: 'Your site is ready!',
      shareLink: 'Share link',
      chatWhatsApp: 'Chat on WhatsApp',
      price: '35,000 FCFA',
      priceDesc: 'Finalize your professional site',
      copied: 'Link copied!',
      minChars: 'Minimum 100 characters required',
      selectMax2: 'Select maximum 2 sites',
      errorLoading: 'Error loading',
      errorGenerating: 'Error generating',
      generatingDesc: 'Creating your personalized site...',
      sitePreview: 'Generated site preview',
      viewSite: 'View site',
      finalizeTitle: 'Finalize your professional site',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
