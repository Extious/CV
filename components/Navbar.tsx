'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

interface NavbarProps {
  onExportPDF?: () => void;
  onExportPNG?: () => void;
}
 
export default function Navbar({ onExportPDF, onExportPNG }: NavbarProps) {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="bg-white border-b border-gray-200 print:hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-11">
          <div className="flex items-center space-x-3 text-sm">
            <Link href="/" className={`px-2 py-1 rounded ${pathname === '/' ? 'text-blue-600' : 'text-gray-700'}`}>View</Link>
            <Link href="/edit" className={`px-2 py-1 rounded ${pathname === '/edit' ? 'text-blue-600' : 'text-gray-700'}`}>Edit</Link>
          </div>
          <div className="flex items-center space-x-2">
            {pathname === '/' && (
              <>
                {onExportPDF && (
                  <button onClick={onExportPDF} className="px-2.5 py-1.5 text-xs font-medium text-white bg-red-600 rounded-md">{t('actions.exportPDF')}</button>
                )}
                {onExportPNG && (
                  <button onClick={onExportPNG} className="px-2.5 py-1.5 text-xs font-medium text-white bg-green-600 rounded-md">{t('actions.exportPNG')}</button>
                )}
              </>
            )}
            <button
              onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
              className="px-2.5 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-md"
            >
              {language === 'zh' ? 'English' : '中文'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
