'use client';

import React, { forwardRef } from 'react';
import { CVData } from '@/types/cv';
import { useLanguage } from '@/contexts/LanguageContext';

interface CVDisplayProps {
  data: CVData;
  isEditing?: boolean;
  onDataChange?: (data: CVData) => void;
}

const CVDisplay = forwardRef<HTMLDivElement, CVDisplayProps>(
  ({ data, isEditing = false, onDataChange }, ref) => {
    const { t } = useLanguage();

    const setField = (updater: (draft: CVData) => void) => {
      if (!onDataChange) return;
      const next = { ...data } as CVData;
      updater(next);
      onDataChange(next);
    };

    const Input = ({
      value,
      onChange,
      className = '',
      multiline = false,
    }: {
      value: string;
      onChange: (v: string) => void;
      className?: string;
      multiline?: boolean;
    }) => {
      if (!isEditing) return multiline ? (
        <div className={className} style={{ whiteSpace: 'pre-wrap' }}>{value}</div>
      ) : (
        <span className={className}>{value}</span>
      );
      return multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`border border-gray-300 rounded px-2 py-1 w-full ${className}`}
          rows={3}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`border border-gray-300 rounded px-2 py-1 ${className}`}
        />
      );
    };

    return (
      <div
        ref={ref}
        className="w-full max-w-[800px] mx-auto bg-white shadow print:shadow-none"
        style={{ fontFamily: 'Inter, Arial, sans-serif', fontSize: '13px', lineHeight: '1.5' }}
      >
        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-4">
            <Input
              value={data.personalInfo.name}
              onChange={(v) => setField((d) => { d.personalInfo.name = v; })}
              className="text-xl font-bold text-gray-800 mb-1 block"
            />
            <div className="text-sm text-gray-600 space-x-2">
              <Input
                value={data.personalInfo.phone}
                onChange={(v) => setField((d) => { d.personalInfo.phone = v; })}
              />
              <span className="mx-1">|</span>
              <Input
                value={data.personalInfo.email}
                onChange={(v) => setField((d) => { d.personalInfo.email = v; })}
              />
              <span className="mx-1">|</span>
              <Input
                value={data.personalInfo.website}
                onChange={(v) => setField((d) => { d.personalInfo.website = v; })}
              />
            </div>
          </div>

          {/* Summary */}
          <section className="mb-4">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide mb-1">{t('sections.summary')}</h2>
            <Input
              value={data.summary}
              onChange={(v) => setField((d) => { d.summary = v; })}
              className="text-gray-700"
              multiline
            />
          </section>

          {/* Education */}
          <section className="mb-4">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide mb-1">{t('sections.education')}</h2>
            <div className="space-y-1.5">
              <Input
                value={data.education.school}
                onChange={(v) => setField((d) => { d.education.school = v; })}
                className="font-semibold text-gray-800 block text-sm"
              />
              <Input
                value={data.education.degree}
                onChange={(v) => setField((d) => { d.education.degree = v; })}
                className="text-gray-700 block text-sm"
              />
              <Input
                value={data.education.period}
                onChange={(v) => setField((d) => { d.education.period = v; })}
                className="text-gray-600 text-xs block"
              />
              <Input
                value={data.education.gpa}
                onChange={(v) => setField((d) => { d.education.gpa = v; })}
                className="text-gray-700 block text-sm"
              />
              <div className="space-y-1 mt-1">
                {data.education.details.map((detail, i) => (
                  <div key={i} className="flex items-start">
                    <Input
                      value={detail}
                      onChange={(v) => setField((d) => { d.education.details[i] = v; })}
                      className="text-gray-600 text-sm block flex-1"
                    />
                    {isEditing && (
                      <button
                        onClick={() => setField((d) => { d.education.details = d.education.details.filter((_, j) => j !== i); })}
                        className="ml-2 text-xs text-red-600"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <button
                    onClick={() => setField((d) => { d.education.details = [...d.education.details, '']; })}
                    className="text-xs text-blue-600"
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* Honors */}
          <section className="mb-4">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide mb-1">{t('sections.honors')}</h2>
            {data.honors.map((h, i) => (
              <div key={i} className="flex items-start mb-1.5">
                <Input
                  value={h.title}
                  onChange={(v) => setField((d) => { d.honors[i].title = v; })}
                  className="text-gray-700 flex-1 mr-3 text-sm"
                />
                <Input
                  value={h.year}
                  onChange={(v) => setField((d) => { d.honors[i].year = v; })}
                  className="text-gray-600 text-xs w-20"
                />
                {isEditing && (
                  <button
                    onClick={() => setField((d) => { d.honors = d.honors.filter((_, j) => j !== i); })}
                    className="ml-2 text-xs text-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {isEditing && (
              <button
                onClick={() => setField((d) => { d.honors = [...d.honors, { title: '', year: '' }]; })}
                className="text-xs text-blue-600"
              >
                Add
              </button>
            )}
          </section>

          {/* Research */}
          <section className="mb-4">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide mb-1">{t('sections.research')}</h2>
            {data.research.map((r, i) => (
              <div key={i} className="mb-2">
                <Input
                  value={r.title}
                  onChange={(v) => setField((d) => { d.research[i].title = v; })}
                  className="font-semibold text-gray-800 block text-sm mb-1"
                />
                <Input
                  value={r.description}
                  onChange={(v) => setField((d) => { d.research[i].description = v; })}
                  className="text-gray-700 text-sm"
                  multiline
                />
                {isEditing && (
                  <button
                    onClick={() => setField((d) => { d.research = d.research.filter((_, j) => j !== i); })}
                    className="mt-1 text-xs text-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {isEditing && (
              <button
                onClick={() => setField((d) => { d.research = [...d.research, { title: '', description: '' }]; })}
                className="text-xs text-blue-600"
              >
                Add
              </button>
            )}
          </section>

          {/* Projects */}
          <section className="mb-4">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide mb-1">{t('sections.projects')}</h2>
            {data.projects.map((p, i) => (
              <div key={i} className="mb-2">
                <Input
                  value={p.title}
                  onChange={(v) => setField((d) => { d.projects[i].title = v; })}
                  className="font-semibold text-gray-800 block text-sm mb-1"
                />
                <Input
                  value={p.description}
                  onChange={(v) => setField((d) => { d.projects[i].description = v; })}
                  className="text-gray-700 text-sm"
                  multiline
                />
                {isEditing && (
                  <button
                    onClick={() => setField((d) => { d.projects = d.projects.filter((_, j) => j !== i); })}
                    className="mt-1 text-xs text-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {isEditing && (
              <button
                onClick={() => setField((d) => { d.projects = [...d.projects, { title: '', description: '' }]; })}
                className="text-xs text-blue-600"
              >
                Add
              </button>
            )}
          </section>

          {/* Skills */}
          <section className="mb-2">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide mb-1">{t('sections.skills')}</h2>
            {(['technical', 'languages', 'activities'] as const).map((cat) => (
              <div key={cat} className="mb-1.5">
                <div className="font-semibold text-gray-800 text-sm mb-0.5 capitalize">{cat}</div>
                <div className="flex flex-wrap gap-1">
                  {data.skills[cat].map((s, i) => (
                    <div key={i} className="flex items-center">
                      <Input
                        value={s}
                        onChange={(v) => setField((d) => { d.skills[cat][i] = v; })}
                        className="text-gray-700 text-sm"
                      />
                      {isEditing && (
                        <button
                          onClick={() => setField((d) => { d.skills[cat] = d.skills[cat].filter((_, j) => j !== i); })}
                          className="ml-1 text-xs text-red-600"
                        >
                          Remove
                        </button>
                      )}
                      {i < data.skills[cat].length - 1 && <span className="text-gray-500 ml-1">,</span>}
                    </div>
                  ))}
                </div>
                {isEditing && (
                  <button
                    onClick={() => setField((d) => { d.skills[cat] = [...d.skills[cat], '']; })}
                    className="mt-1 text-xs text-blue-600"
                  >
                    Add
                  </button>
                )}
              </div>
            ))}
          </section>
        </div>
      </div>
    );
  }
);

CVDisplay.displayName = 'CVDisplay';

export default CVDisplay;
