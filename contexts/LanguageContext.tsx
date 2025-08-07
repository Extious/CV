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
    'nav.view': '查看简历',
    'nav.edit': '编辑简历',
    'nav.language': '语言',
    'actions.exportPDF': '导出PDF',
    'actions.exportPNG': '导出PNG',
    'actions.save': '保存',
    'actions.cancel': '取消',
    'sections.objective': '意向',
    'sections.education': '教育经历',
    'sections.honors': '荣誉奖项',
    'sections.research': '科研经历',
    'sections.projects': '其他项目经历',
    'sections.skills': '其他',
    'skills.technical': '技能',
    'skills.languages': '语言',
    'skills.activities': '活动',
    'auth.title': '访问保护',
    'auth.description': '请输入密码以访问编辑功能',
    'auth.passwordLabel': '密码',
    'auth.passwordPlaceholder': '请输入编辑密码',
    'auth.submit': '验证',
    'auth.verifying': '验证中...',
    'auth.wrongPassword': '密码错误，请重试',
    'auth.backToView': '返回查看页面',
  },
  en: {
    'nav.view': 'View Resume',
    'nav.edit': 'Edit Resume',
    'nav.language': 'Language',
    'actions.exportPDF': 'Export PDF',
    'actions.exportPNG': 'Export PNG',
    'actions.save': 'Save',
    'actions.cancel': 'Cancel',
    'sections.objective': 'Objective',
    'sections.education': 'Education',
    'sections.honors': 'Honors & Awards',
    'sections.research': 'Research Experience',
    'sections.projects': 'Other Projects',
    'sections.skills': 'Others',
    'skills.technical': 'Technical Skills',
    'skills.languages': 'Languages',
    'skills.activities': 'Activities',
    'auth.title': 'Access Protection',
    'auth.description': 'Please enter password to access editing features',
    'auth.passwordLabel': 'Password',
    'auth.passwordPlaceholder': 'Enter edit password',
    'auth.submit': 'Verify',
    'auth.verifying': 'Verifying...',
    'auth.wrongPassword': 'Wrong password, please try again',
    'auth.backToView': 'Back to View Page',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('zh');

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
