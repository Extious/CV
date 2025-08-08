'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CVData, cvDataZh, cvDataEn } from '@/types/cv';
import { useLanguage } from '@/contexts/LanguageContext';
import CVDisplay from '@/components/CVDisplay';
import Navbar from '@/components/Navbar';
import PasswordProtection from '@/components/PasswordProtection';
import { Save, RotateCcw } from 'lucide-react';

export default function EditPage() {
  const { language, t } = useLanguage();
  const [data, setData] = useState<CVData>(language === 'zh' ? cvDataZh : cvDataEn);
  const [originalData] = useState<CVData>(language === 'zh' ? cvDataZh : cvDataEn);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const cvRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 每次访问编辑页面都需要重新认证（不使用 sessionStorage 持久化）
    setIsAuthenticated(false);
  }, []);

  const handleSave = () => {
    // In a real application, you would save to a database or local storage
    localStorage.setItem(`cv-data-${language}`, JSON.stringify(data));
    alert(t('actions.save') + ' ' + 'Success!');
  };

  const handleReset = () => {
    setData(originalData);
  };

  const handleDataChange = (newData: CVData) => {
    setData(newData);
  };

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  // 如果未认证，显示密码保护页面
  if (!isAuthenticated) {
    return <PasswordProtection onAuthenticated={handleAuthenticated} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="py-4">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mb-4">
            <button
              onClick={handleReset}
              className="flex items-center px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
              {t('actions.cancel')}
            </button>
            
            <button
              onClick={handleSave}
              className="flex items-center px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              <Save className="w-3.5 h-3.5 mr-1.5" />
              {t('actions.save')}
            </button>
          </div>

          {/* CV Editor */}
          <CVDisplay 
            ref={cvRef} 
            data={data} 
            isEditing={true} 
            onDataChange={handleDataChange}
          />
        </div>
      </main>
    </div>
  );
}
