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
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  siteType: SiteType;
  setSiteType: React.Dispatch<React.SetStateAction<SiteType>>;
  deepAnswers: string;
  setDeepAnswers: React.Dispatch<React.SetStateAction<string>>;
  selectedInspirations: Inspiration[];
  setSelectedInspirations: React.Dispatch<React.SetStateAction<Inspiration[]>>;
  structuredProfile: StructuredProfile | null;
  setStructuredProfile: React.Dispatch<React.SetStateAction<StructuredProfile | null>>;
  generatedSlug: string | null;
  setGeneratedSlug: React.Dispatch<React.SetStateAction<string | null>>;
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
