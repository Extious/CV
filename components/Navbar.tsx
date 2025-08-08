'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Download, Globe } from 'lucide-react';

import appConfig from '@/config/app.config.json';

interface NavbarProps {
  onExportPDF?: () => void;
  onExportPNG?: () => void;
  title?: string;
}
 
export default function Navbar({ onExportPDF, onExportPNG, title }: NavbarProps) {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  return (
    <>
      <nav className="bg-white shadow-md border-b border-gray-200 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-800">{title || appConfig.defaults.resumeTitle}</h1>
            </div>

            {/* Navigation Links - Only show on edit page */}
            <div className="flex space-x-4">
              {/* Empty - no navigation links shown */}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              {/* Export Buttons */}
              {pathname === '/' && (
                <>
                  {onExportPDF && (
                    <button
                      onClick={onExportPDF}
                      className="flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {t('actions.exportPDF')}
                    </button>
                  )}
                  
                  {onExportPNG && (
                    <button
                      onClick={onExportPNG}
                      className="flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {t('actions.exportPNG')}
                    </button>
                  )}
                </>
              )}

              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  {language === 'zh' ? 'English' : '中文'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
