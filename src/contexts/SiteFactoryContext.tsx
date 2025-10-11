import React, { createContext, useContext, useState, useEffect } from 'react';

export type SiteType = 'personal' | 'business' | null;

export interface Inspiration {
  id: string;
  title: string;
  url: string;
  image: string;
  domain: string;
  justification: string;
}

export interface StructuredProfile {
  name: string;
  title: string;
  description: string;
  sections: {
    title: string;
    content: string;
  }[];
  cta: {
    text: string;
    link: string;
  };
  colors: {
    primary: string;
    secondary: string;
  };
}

interface SiteFactoryContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  siteType: SiteType;
  setSiteType: (type: SiteType) => void;
  deepAnswers: string;
  setDeepAnswers: (answers: string) => void;
  selectedInspirations: Inspiration[];
  setSelectedInspirations: (inspirations: Inspiration[]) => void;
  structuredProfile: StructuredProfile | null;
  setStructuredProfile: (profile: StructuredProfile | null) => void;
  generatedSlug: string | null;
  setGeneratedSlug: (slug: string | null) => void;
}

const SiteFactoryContext = createContext<SiteFactoryContextType | undefined>(undefined);

export const SiteFactoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [siteType, setSiteType] = useState<SiteType>(null);
  const [deepAnswers, setDeepAnswers] = useState('');
  const [selectedInspirations, setSelectedInspirations] = useState<Inspiration[]>([]);
  const [structuredProfile, setStructuredProfile] = useState<StructuredProfile | null>(null);
  const [generatedSlug, setGeneratedSlug] = useState<string | null>(null);

  // Auto-save to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('siteFactory');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setSiteType(data.siteType || null);
        setDeepAnswers(data.deepAnswers || '');
        setSelectedInspirations(data.selectedInspirations || []);
        setCurrentStep(data.currentStep || 1);
        setStructuredProfile(data.structuredProfile || null);
        setGeneratedSlug(data.generatedSlug || null);
      } catch (e) {
        console.error('Failed to load saved data', e);
      }
    }
  }, []);

  useEffect(() => {
    const data = {
      currentStep,
      siteType,
      deepAnswers,
      selectedInspirations,
      structuredProfile,
      generatedSlug,
    };
    localStorage.setItem('siteFactory', JSON.stringify(data));
  }, [currentStep, siteType, deepAnswers, selectedInspirations, structuredProfile, generatedSlug]);

  return (
    <SiteFactoryContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        siteType,
        setSiteType,
        deepAnswers,
        setDeepAnswers,
        selectedInspirations,
        setSelectedInspirations,
        structuredProfile,
        setStructuredProfile,
        generatedSlug,
        setGeneratedSlug,
      }}
    >
      {children}
    </SiteFactoryContext.Provider>
  );
};

export const useSiteFactory = () => {
  const context = useContext(SiteFactoryContext);
  if (!context) {
    throw new Error('useSiteFactory must be used within SiteFactoryProvider');
  }
  return context;
};
