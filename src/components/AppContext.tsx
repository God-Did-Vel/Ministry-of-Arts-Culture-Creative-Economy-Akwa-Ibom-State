'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// ----------------------------------------
// TRANSLATION DICTIONARY
// ----------------------------------------
const TRANSLATIONS = {
  en: {
    title: "Ministry of Arts, Culture & Creative Economy Akwa Ibom State",
    subtitle: "Akwa Ibom State, Nigeria",
    home: "Home",
    about: "About",
    services: "Services",
    map: "Heritage Map",
    museum: "Virtual Museum",
    procurement: "Procurement",
    media: "Media Center",
    admin: "Admin Portal",
    citizenPortal: "Citizen Portal",
    exploreServices: "Explore Services",
    learnMore: "Learn More",
    registeredArtists: "Registered Artists",
    heritageSites: "Heritage Sites",
    culturalFestivals: "Cultural Festivals",
    tourismCenters: "Tourism Centers",
    creativeGrants: "Creative Grants",
    welcomeTitle: "Honourable Commissioner's Welcome Address",
    welcomeSubtitle: "Preserving Our Heritage. Empowering Creativity. Building the Future.",
    downloadSpeech: "Download Welcome Speech (PDF)",
    accessibilityMode: "Accessibility",
    languageSwitcher: "Language",
    applyGrant: "Apply for Grant",
    artistReg: "Artist Registration",
    museumPermit: "Museum Permit",
    festivalPermit: "Festival Permit",
    creativeFunding: "Creative Funding",
    heritageReg: "Heritage Registration",
    foiRequest: "FOI Request",
    complaints: "Feedback & Complaints",
    latestNews: "Latest Culture & Ministry News",
    featuredFestivals: "Featured Akwa Ibom & National Festivals",
    interactiveMapTitle: "Interactive Cultural Map of Nigeria & Akwa Ibom State",
    interactiveMapSubtitle: "Select any state to explore its unique heritage, attire, cuisine, languages, and local museums.",
    quickServicesTitle: "Citizen E-Government Services",
    quickServicesSubtitle: "Submit applications, track reviews, and download official digital certificates instantly."
  },
  ib: {
    title: "Mme Iben Utom Mbana Nkpo Usemo ye Ndito Ọnà Akwa Ibom State",
    subtitle: "Akwa Ibom State, Nigeria",
    home: "Ufọk",
    about: "Abanga Nnyin",
    services: "Utom Ukara",
    map: "Maap Nketa",
    museum: "Ufọk Nsemi",
    procurement: "Procurement",
    media: "Itie Eme Mgbasa Ozi",
    admin: "Portal Alábòójútó",
    citizenPortal: "Itie Owo Ibom",
    exploreServices: "Sọñọ se Nkpo Utom",
    learnMore: "Kpọọ Nkpo Enwen",
    registeredArtists: "Ndito Ọnà Ibat",
    heritageSites: "Itie Nketa",
    culturalFestivals: "Usọrọ Nketa",
    tourismCenters: "Itie Ndito Isọñ",
    creativeGrants: "Ndọñe Ndito Ọnà",
    welcomeTitle: "Mma-kọọ nno Kọmishọna",
    welcomeSubtitle: "Nchekwa Ihe Nketa Anyị.",
    downloadSpeech: "Dọundood Spech (PDF)",
    accessibilityMode: "Accessibility",
    languageSwitcher: "Usemo",
    applyGrant: "Tinye Ndọñe",
    artistReg: "Ibat Ndito Ọnà",
    museumPermit: "Ikikere Ufọk Nsemi",
    festivalPermit: "Ikikere Usọrọ",
    creativeFunding: "Okuk Ndito Ọnà",
    heritageReg: "Ibat Nketa",
    foiRequest: "FOI Request",
    complaints: "Feedback ye complaints",
    latestNews: "Mbufiọk Nkpo Usemo",
    featuredFestivals: "Mme Usọrọ Nketa Pàtàkì",
    interactiveMapTitle: "Interactive Cultural Map",
    interactiveMapSubtitle: "Select any local area to explore its unique heritage.",
    quickServicesTitle: "Citizen E-Government Services",
    quickServicesSubtitle: "Submit applications, track reviews, and download official digital certificates instantly."
  },
  an: {
    title: "Ministry of Arts, Culture & Creative Economy Akwa Ibom State",
    subtitle: "Akwa Ibom State, Nigeria",
    home: "Ufọk",
    about: "Abanga Nnyin",
    services: "Utom Ukara",
    map: "Maap Nketa",
    museum: "Ufọk Nsemi",
    procurement: "Procurement",
    media: "Cibiyar Labarai",
    admin: "Portal Nchịkwa",
    citizenPortal: "Itie Owo",
    exploreServices: "explore",
    learnMore: "learn",
    registeredArtists: "Ndito Ọnà Ibat",
    heritageSites: "Itie Nketa",
    culturalFestivals: "Usọrọ Nketa",
    tourismCenters: "Itie Ndito Isọñ",
    creativeGrants: "Ndọñe Ndito Ọnà",
    welcomeTitle: "Amesọkọ nno Kọmishọna",
    welcomeSubtitle: "Nchekwa Ihe Nketa Anyị.",
    downloadSpeech: "Download Speech (PDF)",
    accessibilityMode: "Accessibility",
    languageSwitcher: "Usemo",
    applyGrant: "Tinye Ndọñe",
    artistReg: "Ibat Ndito Ọnà",
    museumPermit: "Ikikere Ufọk Nsemi",
    festivalPermit: "Ikikere Usọrọ",
    creativeFunding: "Okuk Ndito Ọnà",
    heritageReg: "Ibat Nketa",
    foiRequest: "FOI Request",
    complaints: "Feedback ye complaints",
    latestNews: "Mbufiọk Nkpo Usemo",
    featuredFestivals: "Mme Usọrọ Nketa Pàtàkì",
    interactiveMapTitle: "Interactive Cultural Map",
    interactiveMapSubtitle: "Select any local area to explore its unique heritage.",
    quickServicesTitle: "Citizen E-Government Services",
    quickServicesSubtitle: "Submit applications, track reviews, and download official digital certificates instantly."
  },
  or: {
    title: "Ministry of Arts, Culture & Creative Economy Akwa Ibom State",
    subtitle: "Akwa Ibom State, Nigeria",
    home: "Ufọk",
    about: "Abanga Nnyin",
    services: "Utom Ukara",
    map: "Maap Nketa",
    museum: "Ufọk Nsemi",
    procurement: "Procurement",
    media: "Ebe Mgbasa Ozi",
    admin: "Portal Nchịkwa",
    citizenPortal: "Itie Owo",
    exploreServices: "explore",
    learnMore: "learn",
    registeredArtists: "Ndito Ọnà Ibat",
    heritageSites: "Itie Nketa",
    culturalFestivals: "Usọrọ Nketa",
    tourismCenters: "Itie Ndito Isọñ",
    creativeGrants: "Ndọñe Ndito Ọnà",
    welcomeTitle: "Mmedi ooo nno Kọmishọna",
    welcomeSubtitle: "Nchekwa Ihe Nketa Anyị.",
    downloadSpeech: "Download Speech (PDF)",
    accessibilityMode: "Accessibility",
    languageSwitcher: "Usemo",
    applyGrant: "Tinye Ndọñe",
    artistReg: "Ibat Ndito Ọnà",
    museumPermit: "Ikikere Ufọk Nsemi",
    festivalPermit: "Ikikere Usọrọ",
    creativeFunding: "Okuk Ndito Ọnà",
    heritageReg: "Ibat Nketa",
    foiRequest: "FOI Request",
    complaints: "Feedback ye complaints",
    latestNews: "Mbufiọk Nkpo Usemo",
    featuredFestivals: "Mme Usọrọ Nketa Pàtàkì",
    interactiveMapTitle: "Interactive Cultural Map",
    interactiveMapSubtitle: "Select any local area to explore its heritage.",
    quickServicesTitle: "Citizen E-Government Services",
    quickServicesSubtitle: "Submit applications, track reviews, and download official digital certificates instantly."
  }
};

type Language = 'en' | 'ib' | 'an' | 'or';
type FontSize = 'normal' | 'large' | 'xlarge';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof TRANSLATIONS['en']) => string;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  dyslexiaFont: boolean;
  setDyslexiaFont: (val: boolean) => void;
  ttsEnabled: boolean;
  setTtsEnabled: (val: boolean) => void;
  speak: (text: string) => void;
  currentRole: 'CITIZEN' | 'STAFF' | 'ADMIN';
  setCurrentRole: (role: 'CITIZEN' | 'STAFF' | 'ADMIN') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('user_language') as Language) || 'en';
    }
    return 'en';
  });
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('access_font_size') as FontSize) || 'normal';
    }
    return 'normal';
  });
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_high_contrast') === 'true';
    }
    return false;
  });
  const [dyslexiaFont, setDyslexiaFont] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_dyslexia') === 'true';
    }
    return false;
  });
  const [ttsEnabled, setTtsEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_tts') === 'true';
    }
    return false;
  });
  const [currentRole, setCurrentRole] = useState<'CITIZEN' | 'STAFF' | 'ADMIN'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('user_role') as 'CITIZEN' | 'STAFF' | 'ADMIN') || 'CITIZEN';
    }
    return 'CITIZEN';
  });

  // Sync settings with classes on body
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const body = document.body;
      
      // High contrast
      if (highContrast) {
        body.classList.add('high-contrast');
      } else {
        body.classList.remove('high-contrast');
      }
      localStorage.setItem('access_high_contrast', String(highContrast));
    }
  }, [highContrast]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_font_size', fontSize);
    }
  }, [fontSize]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_dyslexia', String(dyslexiaFont));
    }
  }, [dyslexiaFont]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_role', currentRole);
    }
  }, [currentRole]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_language', language);
    }
  }, [language]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_tts', String(ttsEnabled));
    }
  }, [ttsEnabled]);

  const t = (key: keyof typeof TRANSLATIONS['en']): string => {
    return TRANSLATIONS[language][key] || TRANSLATIONS['en'][key] || '';
  };

  const speak = (text: string) => {
    if (!ttsEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel(); // Stop current speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'en' ? 'en-US' : 'en-NG'; // Fallback approximation
    window.speechSynthesis.speak(utterance);
  };

  const value = {
    language,
    setLanguage,
    t,
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    dyslexiaFont,
    setDyslexiaFont,
    ttsEnabled,
    setTtsEnabled,
    speak,
    currentRole,
    setCurrentRole
  };

  // Build root container classes based on accessibility settings
  let fontSizeClass = '';
  if (fontSize === 'large') fontSizeClass = 'text-lg';
  if (fontSize === 'xlarge') fontSizeClass = 'text-xl';

  const dyslexiaClass = dyslexiaFont ? 'font-dyslexic' : 'font-outfit';

  return (
    <AppContext.Provider value={value}>
      <div className={`${fontSizeClass} ${dyslexiaClass} min-h-screen transition-all duration-300`}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
