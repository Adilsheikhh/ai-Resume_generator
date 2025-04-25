import React from 'react';
import { cn } from '@/lib/utils';
import { TemplateWrapper } from "./TemplateWrapper";
interface ProfessionalTemplateProps {
  content: {
    name: string;
    title: string;
    contact: {
      email: string;
      phone: string;
      location: string;
    };
    summary: string;
    experience: Array<{
      company: string;
      position: string;
      duration: string;
      description: string[];
    }>;
    education: Array<{
      school: string;
      degree: string;
      duration: string;
    }>;
    skills: string[];
  };
  className?: string;
}

export function ProfessionalTemplate({ content, className }: ProfessionalTemplateProps) {
  // Define primary color for consistent usage
  const primaryColor = '#000000';
  
  return (
    <TemplateWrapper>
    <div className={cn("max-w-[850px] mx-auto p-4 sm:p-6 md:p-8 bg-white", className)}>
      <header className="border-b-2 pb-3 sm:pb-4 mb-4 sm:mb-6" style={{ borderColor: primaryColor }}>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: '#111827' }}>{content.name}</h1>
        <h2 className="text-lg sm:text-xl mb-3 sm:mb-4" style={{ color: primaryColor }}>{content.title}</h2>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-xs sm:text-sm">
          <div className="flex items-center gap-1 sm:gap-2">
            <span style={{ color: primaryColor }}>Email:</span>
            <span style={{ color: '#374151' }}>{content.contact.email}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <span style={{ color: primaryColor }}>Phone:</span>
            <span style={{ color: '#374151' }}>{content.contact.phone}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <span style={{ color: primaryColor }}>Location:</span>
            <span style={{ color: '#374151' }}>{content.contact.location}</span>
          </div>
        </div>
      </header>

      <section className="mb-4 sm:mb-6">
        <h3 className="text-lg font-semibold mb-3" style={{ color: primaryColor }}>Professional Summary</h3>
        <p className="leading-relaxed" style={{ color: '#4b5563' }}>{content.summary}</p>
      </section>

      <section className="mb-4 sm:mb-6">
        <h3 className="text-lg font-semibold mb-4" style={{ color: primaryColor }}>Professional Experience</h3>
        {content.experience.map((exp, index) => (
          <div key={index} className="mb-5">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h4 className="font-bold" style={{ color: '#1f2937' }}>{exp.position}</h4>
                <div style={{ color: primaryColor }}>{exp.company}</div>
              </div>
              <span className="text-sm" style={{ color: '#6b7280' }}>{exp.duration}</span>
            </div>
            <ul className="list-disc list-inside space-y-1">
              {exp.description.map((item, i) => (
                <li key={i} style={{ color: '#4b5563' }}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-4 sm:mb-6">
        <h3 className="text-lg font-semibold mb-4" style={{ color: primaryColor }}>Education</h3>
        {content.education.map((edu, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <div>
                <h4 className="font-bold" style={{ color: '#1f2937' }}>{edu.school}</h4>
                <div style={{ color: primaryColor }}>{edu.degree}</div>
              </div>
              <span className="text-sm" style={{ color: '#6b7280' }}>{edu.duration}</span>
            </div>
          </div>
        ))}
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3" style={{ color: primaryColor }}>Skills & Expertise</h3>
        <div className="flex flex-wrap gap-3">
          {content.skills.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-1.5 rounded-md text-sm font-medium"
              style={{ 
                backgroundColor: 'rgba(0,0,0,0.1)', 
                color: primaryColor,
                WebkitPrintColorAdjust: 'exact',
                printColorAdjust: 'exact'
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
    </TemplateWrapper>
  );
}