'use client';

import React, { useRef } from 'react';
import { cvDataEn, cvDataZh } from '@/types/cv';
import { useLanguage } from '@/contexts/LanguageContext';
import CVDisplay from '@/components/CVDisplay';
import Navbar from '@/components/Navbar';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function HomePage() {
  const { language } = useLanguage();
  const cvRef = useRef<HTMLDivElement>(null);

  const data = language === 'zh' ? cvDataZh : cvDataEn;

  const exportToPDF = async () => {
    if (!cvRef.current) return;
    const canvas = await html2canvas(cvRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const ratio = Math.min(pdfWidth / canvas.width, pdfHeight / canvas.height);
    const x = (pdfWidth - canvas.width * ratio) / 2;
    const y = 0;
    pdf.addImage(imgData, 'PNG', x, y, canvas.width * ratio, canvas.height * ratio);
    pdf.save('resume.pdf');
  };

  const exportToPNG = async () => {
    if (!cvRef.current) return;
    const canvas = await html2canvas(cvRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
    const link = document.createElement('a');
    link.download = 'resume.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onExportPDF={exportToPDF} onExportPNG={exportToPNG} />
      <main className="py-4">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <CVDisplay ref={cvRef} data={data} isEditing={false} />
        </div>
      </main>
    </div>
  );
}
