import React from 'react';
import { cn } from '@/lib/utils';
import { TemplateWrapper } from './TemplateWrapper';

interface MinimalTemplateProps {
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

export function MinimalTemplate({ content, className }: MinimalTemplateProps) {
  return (
    <TemplateWrapper>
    <div className={cn("max-w-[850px] mx-auto p-8 bg-white font-serif", className)}>
      <header className="mb-8">
        <h1 className="text-3xl mb-2">{content.name}</h1>
        <h2 className="text-xl text-gray-600 mb-4">{content.title}</h2>
        <div className="text-sm text-gray-600 space-y-1">
          <div>{content.contact.email}</div>
          <div>{content.contact.phone}</div>
          <div>{content.contact.location}</div>
        </div>
      </header>

      <section className="mb-6">
        <p className="text-gray-700 leading-relaxed">{content.summary}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl mb-4">Experience</h3>
        {content.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-baseline mb-1">
              <h4 className="font-medium">{exp.position}</h4>
              <span className="text-sm text-gray-600">{exp.duration}</span>
            </div>
            <div className="text-gray-700 mb-2 italic">{exp.company}</div>
            <ul className="space-y-1 text-gray-700">
              {exp.description.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h3 className="text-xl mb-4">Education</h3>
        {content.education.map((edu, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between items-baseline mb-1">
              <h4 className="font-medium">{edu.school}</h4>
              <span className="text-sm text-gray-600">{edu.duration}</span>
            </div>
            <div className="text-gray-700 italic">{edu.degree}</div>
          </div>
        ))}
      </section>

      <section>
        <h3 className="text-xl mb-4">Skills</h3>
        <div className="text-gray-700">
          {content.skills.join(' • ')}
        </div>
      </section>
    </div>
    </TemplateWrapper>
  );
}