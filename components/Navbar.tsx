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
 
export default function Navbar({ onExportPDF, onExportPNG }: NavbarProps) {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  return (
    <>
      <nav className="bg-white border-b border-gray-200 print:hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-11">
            {/* Left placeholder to keep layout */}
            <div className="flex-shrink-0 w-6" />

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {/* Export Buttons */}
              {pathname === '/' && (
                <>
                  {onExportPDF && (
                    <button
                      onClick={onExportPDF}
                      className="flex items-center px-2.5 py-1.5 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 mr-1.5" />
                      {t('actions.exportPDF')}
                    </button>
                  )}
                  
                  {onExportPNG && (
                    <button
                      onClick={onExportPNG}
                      className="flex items-center px-2.5 py-1.5 text-xs font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 mr-1.5" />
                      {t('actions.exportPNG')}
                    </button>
                  )}
                </>
              )}

              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
                  className="flex items-center px-2.5 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 mr-1.5" />
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
