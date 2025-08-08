'use client';

import React, { useState, useRef } from 'react';
import { CVData, cvData as initialData } from '@/types/cv';
import CVDisplay from '@/components/CVDisplay';
import Navbar from '@/components/Navbar';

export default function EditPage() {
  const [data, setData] = useState<CVData>(initialData);
  const cvRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    localStorage.setItem('cv-data', JSON.stringify(data));
    alert('Saved');
  };

  const handleReset = () => {
    setData(initialData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="py-4">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-end space-x-3 mb-4">
            <button onClick={handleReset} className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md">Reset</button>
            <button onClick={handleSave} className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-md">Save</button>
          </div>
          <CVDisplay ref={cvRef} data={data} isEditing={true} onDataChange={setData} />
        </div>
      </main>
    </div>
  );
}
