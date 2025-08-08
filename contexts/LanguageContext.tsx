'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  zh: {
    'actions.exportPDF': '导出PDF',
    'actions.exportPNG': '导出PNG',
    'sections.summary': '简介',
    'sections.education': '教育经历',
    'sections.honors': '荣誉奖项',
    'sections.research': '科研经历',
    'sections.projects': '项目经历',
    'sections.skills': '技能与其他',
  },
  en: {
    'actions.exportPDF': 'Export PDF',
    'actions.exportPNG': 'Export PNG',
    'sections.summary': 'Summary',
    'sections.education': 'Education',
    'sections.honors': 'Honors',
    'sections.research': 'Research',
    'sections.projects': 'Projects',
    'sections.skills': 'Skills',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}