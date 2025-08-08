'use client';

import React, { useRef } from 'react';
import { cvDataZh, cvDataEn } from '@/types/cv';
import { useLanguage } from '@/contexts/LanguageContext';
import CVDisplay from '@/components/CVDisplay';
import Navbar from '@/components/Navbar';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function HomePage() {
  const { language } = useLanguage();
  const cvRef = useRef<HTMLDivElement>(null);
  
  const currentData = language === 'zh' ? cvDataZh : cvDataEn;

  const exportToPDF = async () => {
    if (!cvRef.current) return;

    try {
      const canvas = await html2canvas(cvRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('extious-cv.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const exportToPNG = async () => {
    if (!cvRef.current) return;

    try {
      const canvas = await html2canvas(cvRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const link = document.createElement('a');
      link.download = 'extious-cv.png';
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error generating PNG:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onExportPDF={exportToPDF} onExportPNG={exportToPNG} title={currentData.resumeTitle} />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CVDisplay ref={cvRef} data={currentData} isEditing={false} />
        </div>
      </main>
    </div>
  );
}
