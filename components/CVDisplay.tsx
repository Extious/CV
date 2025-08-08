'use client';

import React, { forwardRef } from 'react';
import { CVData } from '@/types/cv';
import { useLanguage } from '@/contexts/LanguageContext';
import { Plus, Trash2 } from 'lucide-react';

interface CVDisplayProps {
  data: CVData;
  isEditing?: boolean;
  onDataChange?: (data: CVData) => void;
}

const CVDisplay = forwardRef<HTMLDivElement, CVDisplayProps>(
  ({ data, isEditing = false, onDataChange }, ref) => {
    const { t } = useLanguage();

    const getSectionTitle = (key: keyof NonNullable<CVData['sectionTitles']> | 'objective' | 'education' | 'honors' | 'research' | 'projects' | 'skills') => {
      const custom = data.sectionTitles?.[key as keyof NonNullable<CVData['sectionTitles']>];
      if (custom && custom.trim().length > 0) return custom;
      const map: Record<string, string> = {
        objective: t('sections.objective'),
        education: t('sections.education'),
        honors: t('sections.honors'),
        research: t('sections.research'),
        projects: t('sections.projects'),
        skills: t('sections.skills'),
      };
      return map[key as string] || '';
    };

    const handleInputChange = (
      section: keyof CVData,
      field: string,
      value: any,
      index?: number
    ) => {
      if (!onDataChange) return;

      const newData = { ...data };
      
      if (section === 'personalInfo') {
        (newData[section] as any)[field] = value;
      } else if (section === 'honors' || section === 'research' || section === 'projects') {
        if (index !== undefined) {
          (newData[section] as any)[index][field] = value;
        }
      } else if (section === 'education') {
        if (field === 'details' && index !== undefined) {
          (newData[section] as any)[field][index] = value;
        } else {
          (newData[section] as any)[field] = value;
        }
      } else if (section === 'skills') {
        if (index !== undefined) {
          (newData[section] as any)[field][index] = value;
        }
      } else {
        (newData as any)[section] = value;
      }
      
      onDataChange(newData);
    };

    const addItem = (section: 'honors' | 'research' | 'projects' | 'skills', skillType?: string) => {
      if (!onDataChange) return;

      const newData = { ...data };
      
      if (section === 'honors') {
        newData.honors.push({ title: '新荣誉奖项', year: '2024' });
      } else if (section === 'research') {
        newData.research.push({ title: '新科研项目', description: '项目描述' });
      } else if (section === 'projects') {
        newData.projects.push({ title: '新项目', description: '项目描述' });
      } else if (section === 'skills' && skillType) {
        (newData.skills as any)[skillType].push('新技能');
      }
      
      onDataChange(newData);
    };

    const removeItem = (section: 'honors' | 'research' | 'projects' | 'skills', index: number, skillType?: string) => {
      if (!onDataChange) return;

      const newData = { ...data };
      
      if (section === 'skills' && skillType) {
        (newData.skills as any)[skillType].splice(index, 1);
      } else {
        (newData[section] as any).splice(index, 1);
      }
      
      onDataChange(newData);
    };

    const addEducationDetail = () => {
      if (!onDataChange) return;

      const newData = { ...data };
      newData.education.details.push('新的教育详情');
      onDataChange(newData);
    };

  const removeEducationDetail = (educationIndex: number, detailIndex: number) => {
    const newData = { ...data }
    if (newData.education.details) {
      newData.education.details = newData.education.details.filter((_, j) => j !== detailIndex)
      onDataChange?.(newData)
    }
  }

  // 为技能部分添加专门的函数
  const addSkillItem = (category: 'technical' | 'languages' | 'activities') => {
    const newData = { ...data }
    newData.skills[category] = [...newData.skills[category], '']
    onDataChange?.(newData)
  }

  const removeSkillItem = (category: 'technical' | 'languages' | 'activities', index: number) => {
    const newData = { ...data }
    newData.skills[category] = newData.skills[category].filter((_, i) => i !== index)
    onDataChange?.(newData)
  }

  const EditableText = ({
      value, 
      onChange, 
      className = '', 
      multiline = false 
    }: {
      value: string;
      onChange: (value: string) => void;
      className?: string;
      multiline?: boolean;
    }) => {
      if (!isEditing) {
        return multiline ? (
          <div className={className} style={{ whiteSpace: 'pre-wrap' }}>{value}</div>
        ) : (
          <span className={className}>{value}</span>
        );
      }

      return multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${className} border border-gray-300 rounded px-2 py-1 w-full`}
          rows={3}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${className} border border-gray-300 rounded px-2 py-1`}
        />
      );
    };

    const handleSectionTitleChange = (
      key: keyof NonNullable<CVData['sectionTitles']>,
      value: string
    ) => {
      if (!onDataChange) return;
      const newData = { ...data };
      newData.sectionTitles = { ...(newData.sectionTitles || {}), [key]: value };
      onDataChange(newData);
    };

    const SectionHeader = ({ 
      sectionKey,
      onAddItem, 
      className = '' 
    }: {
      sectionKey: 'objective' | 'education' | 'honors' | 'research' | 'projects' | 'skills';
      onAddItem?: () => void;
      className?: string;
    }) => {
      return (
        <div className="flex items-center justify-between mb-3">
          {isEditing ? (
            <EditableText
              value={getSectionTitle(sectionKey)}
              onChange={(value) => handleSectionTitleChange(sectionKey, value)}
              className={`text-xl font-bold text-blue-600 uppercase tracking-wide ${className}`}
            />
          ) : (
            <h2 className={`text-xl font-bold text-blue-600 uppercase tracking-wide ${className}`}>
              {getSectionTitle(sectionKey)}
            </h2>
          )}
          {isEditing && onAddItem && (
            <button
              onClick={onAddItem}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800 rounded px-2 py-1 transition-colors"
            >
              <Plus className="w-3 h-3 mr-1" />
              添加
            </button>
          )}
        </div>
      );
    };

    const DeleteButton = ({ onClick }: { onClick: () => void }) => {
      if (!isEditing) return null;
      
      return (
        <button
          onClick={onClick}
          className="text-red-500 hover:text-red-700 ml-2 p-1 transition-colors"
          title="删除"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      );
    };

    return (
      <div 
        ref={ref} 
        className="w-full max-w-[800px] mx-auto bg-white shadow-lg print:shadow-none" 
        style={{ 
          fontFamily: 'Arial, sans-serif', 
          fontSize: '14px',
          lineHeight: '1.5'
        }}
      >
        {/* Header with blue gradient background */}
        <div 
          className="relative" 
          style={{ 
            minHeight: '160px', 
            background: 'linear-gradient(135deg, #4F9CF9 0%, #3B82F6 100%)' 
          }}
        >
          {/* Title and avatar area */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-4 pb-10">
            {isEditing ? (
              <EditableText
                value={data.resumeTitle || ''}
                onChange={(value) => handleInputChange('resumeTitle' as any, '', value)}
                className="text-white text-2xl font-bold mb-1"
              />
            ) : (
              <h1 className="text-white text-2xl font-bold mb-1">{data.resumeTitle}</h1>
            )}
            {isEditing ? (
              <EditableText
                value={data.resumeSubtitle || ''}
                onChange={(value) => handleInputChange('resumeSubtitle' as any, '', value)}
                className="text-blue-50 text-sm"
              />
            ) : (
              !!data.resumeSubtitle && (
                <div className="text-blue-50 text-sm">{data.resumeSubtitle}</div>
              )
            )}
          </div>

          {/* Avatar positioned in the center bottom of header */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{ bottom: '-40px' }}
          >
            <div 
              className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center overflow-hidden" 
              style={{ backgroundColor: '#40E0D0' }}
            >
              {data.personalInfo.avatar ? (
                <img 
                  src={data.personalInfo.avatar} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-600 rounded-full"></div>
              )}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="pt-12 px-6 pb-5">
          {/* Name and Contact */}
          <div className="text-center mb-6">
            <EditableText
              value={data.personalInfo.name}
              onChange={(value) => handleInputChange('personalInfo', 'name', value)}
              className="text-2xl font-bold text-gray-800 mb-4 block"
            />
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex justify-center items-center space-x-1">
                <span>📞</span>
                <EditableText
                  value={data.personalInfo.phone}
                  onChange={(value) => handleInputChange('personalInfo', 'phone', value)}
                  className=""
                />
                <span className="mx-2">|</span>
                <span>✉️</span>
                <EditableText
                  value={data.personalInfo.email}
                  onChange={(value) => handleInputChange('personalInfo', 'email', value)}
                />
              </div>
              <div className="flex justify-center items-center space-x-1">
                <span>🌐</span>
                <EditableText
                  value={data.personalInfo.website}
                  onChange={(value) => handleInputChange('personalInfo', 'website', value)}
                  className=""
                />
              </div>
            </div>
          </div>

          {/* Objective */}
          <div className="mb-6">
            <div className="flex items-start mb-3">
              <div className="w-1 bg-blue-500 mr-4 flex-shrink-0" style={{ minHeight: '24px' }}></div>
              <div className="flex-1">
                <SectionHeader sectionKey="objective" />
                <EditableText
                  value={data.objective}
                  onChange={(value) => handleInputChange('objective', '', value)}
                  className="text-gray-700 text-sm leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mb-6">
            <div className="flex items-start mb-3">
              <div className="w-1 bg-blue-500 mr-4 flex-shrink-0" style={{ minHeight: '24px' }}></div>
              <div className="flex-1">
                <SectionHeader 
                  sectionKey="education"
                  onAddItem={addEducationDetail}
                />
                <div className="space-y-2">
                  <EditableText
                    value={data.education.school}
                    onChange={(value) => handleInputChange('education', 'school', value)}
                    className="font-bold text-gray-800 block text-base"
                  />
                  <EditableText
                    value={data.education.degree}
                    onChange={(value) => handleInputChange('education', 'degree', value)}
                    className="text-gray-700 block text-sm leading-relaxed"
                  />
                  <EditableText
                    value={data.education.period}
                    onChange={(value) => handleInputChange('education', 'period', value)}
                    className="text-gray-600 text-sm block leading-relaxed"
                  />
                  <EditableText
                    value={data.education.gpa}
                    onChange={(value) => handleInputChange('education', 'gpa', value)}
                    className="text-gray-700 block text-sm font-medium"
                  />
                  <div className="space-y-1 mt-2">
                    {data.education.details.map((detail, index) => (
                      <div key={index} className="flex items-start">
                        <EditableText
                          value={detail}
                          onChange={(value) => handleInputChange('education', 'details', value, index)}
                          className="text-gray-600 text-sm block leading-relaxed pl-2 flex-1"
                        />
                        <DeleteButton onClick={() => removeEducationDetail(0, index)} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Honors */}
          <div className="mb-6">
            <div className="flex items-start mb-3">
              <div className="w-1 bg-blue-500 mr-4 flex-shrink-0" style={{ minHeight: '24px' }}></div>
              <div className="flex-1">
                <SectionHeader 
                  sectionKey="honors"
                  onAddItem={() => addItem('honors')}
                />
                {data.honors.map((honor, index) => (
                  <div key={index} className="flex justify-between items-start mb-2">
                    <EditableText
                      value={honor.title}
                      onChange={(value) => handleInputChange('honors', 'title', value, index)}
                      className="text-gray-700 flex-1 mr-4 text-sm leading-relaxed"
                    />
                    <EditableText
                      value={honor.year}
                      onChange={(value) => handleInputChange('honors', 'year', value, index)}
                      className="text-gray-600 text-sm font-medium mr-2"
                    />
                    <DeleteButton onClick={() => removeItem('honors', index)} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Research */}
          <div className="mb-6">
            <div className="flex items-start mb-3">
              <div className="w-1 bg-blue-500 mr-4 flex-shrink-0" style={{ minHeight: '24px' }}></div>
              <div className="flex-1">
                <SectionHeader 
                  sectionKey="research"
                  onAddItem={() => addItem('research')}
                />
                {data.research.map((item, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex items-start">
                      <div className="flex-1">
                        <EditableText
                          value={item.title}
                          onChange={(value) => handleInputChange('research', 'title', value, index)}
                          className="font-bold text-gray-800 block mb-2 text-sm leading-relaxed"
                        />
                        {item.description && (
                          <EditableText
                            value={item.description}
                            onChange={(value) => handleInputChange('research', 'description', value, index)}
                            className="text-gray-700 text-sm leading-relaxed"
                          />
                        )}
                      </div>
                      <DeleteButton onClick={() => removeItem('research', index)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="mb-6">
            <div className="flex items-start mb-3">
              <div className="w-1 bg-blue-500 mr-4 flex-shrink-0" style={{ minHeight: '24px' }}></div>
              <div className="flex-1">
                <SectionHeader 
                  sectionKey="projects"
                  onAddItem={() => addItem('projects')}
                />
                {data.projects.map((project, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex items-start">
                      <div className="flex-1">
                        <EditableText
                          value={project.title}
                          onChange={(value) => handleInputChange('projects', 'title', value, index)}
                          className="font-bold text-gray-800 block text-sm leading-relaxed mb-2"
                        />
                        <EditableText
                          value={project.description}
                          onChange={(value) => handleInputChange('projects', 'description', value, index)}
                          className="text-gray-700 text-sm leading-relaxed"
                        />
                      </div>
                      <DeleteButton onClick={() => removeItem('projects', index)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <div className="flex items-start mb-3">
              <div className="w-1 bg-blue-500 mr-4 flex-shrink-0" style={{ minHeight: '24px' }}></div>
              <div className="flex-1">
                <SectionHeader sectionKey="skills" />
                <div className="space-y-2">
                  <div className="flex items-start">
                    <span className="font-bold text-gray-800 text-sm mr-1">•</span>
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <span className="font-bold text-gray-800 text-sm mr-2">{t('skills.technical')}：</span>
                        {isEditing && (
                          <button
                            onClick={() => addSkillItem('technical')}
                            className="text-blue-500 hover:text-blue-700 ml-2"
                          >
                            <Plus size={14} />
                          </button>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {data.skills.technical.map((skill, index) => (
                          <div key={index} className="flex items-center">
                            <EditableText
                              value={skill}
                              onChange={(value) => handleInputChange('skills', 'technical', value, index)}
                              className="text-gray-700 text-sm"
                            />
                            {isEditing && (
                              <DeleteButton onClick={() => removeSkillItem('technical', index)} />
                            )}
                            {index < data.skills.technical.length - 1 && <span className="text-gray-500 ml-1">, </span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="font-bold text-gray-800 text-sm mr-1">•</span>
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <span className="font-bold text-gray-800 text-sm mr-2">{t('skills.languages')}：</span>
                        {isEditing && (
                          <button
                            onClick={() => addSkillItem('languages')}
                            className="text-blue-500 hover:text-blue-700 ml-2"
                          >
                            <Plus size={14} />
                          </button>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {data.skills.languages.map((lang, index) => (
                          <div key={index} className="flex items-center">
                            <EditableText
                              value={lang}
                              onChange={(value) => handleInputChange('skills', 'languages', value, index)}
                              className="text-gray-700 text-sm"
                            />
                            {isEditing && (
                              <DeleteButton onClick={() => removeSkillItem('languages', index)} />
                            )}
                            {index < data.skills.languages.length - 1 && <span className="text-gray-500 ml-1">, </span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="font-bold text-gray-800 text-sm mr-1">•</span>
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <span className="font-bold text-gray-800 text-sm mr-2">{t('skills.activities')}：</span>
                        {isEditing && (
                          <button
                            onClick={() => addSkillItem('activities')}
                            className="text-blue-500 hover:text-blue-700 ml-2"
                          >
                            <Plus size={14} />
                          </button>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {data.skills.activities.map((activity, index) => (
                          <div key={index} className="flex items-center">
                            <EditableText
                              value={activity}
                              onChange={(value) => handleInputChange('skills', 'activities', value, index)}
                              className="text-gray-700 text-sm"
                            />
                            {isEditing && (
                              <DeleteButton onClick={() => removeSkillItem('activities', index)} />
                            )}
                            {index < data.skills.activities.length - 1 && <span className="text-gray-500 ml-1">, </span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CVDisplay.displayName = 'CVDisplay';

export default CVDisplay;
