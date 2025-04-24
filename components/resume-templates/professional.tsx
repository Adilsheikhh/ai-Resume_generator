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
  return (
    <TemplateWrapper>
    <div className={cn("max-w-[850px] mx-auto p-8 bg-white", className)}>
      <header className="border-b-2 border-primary pb-4 mb-6">
        <h1 className="text-4xl font-bold mb-2">{content.name}</h1>
        <h2 className="text-xl text-primary mb-4">{content.title}</h2>
        <div className="flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-primary">Email:</span>
            {content.contact.email}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary">Phone:</span>
            {content.contact.phone}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary">Location:</span>
            {content.contact.location}
          </div>
        </div>
      </header>

      <section className="mb-6">
        <h3 className="text-lg font-semibold text-primary mb-3">Professional Summary</h3>
        <p className="text-gray-700 leading-relaxed">{content.summary}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold text-primary mb-4">Professional Experience</h3>
        {content.experience.map((exp, index) => (
          <div key={index} className="mb-5">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h4 className="font-bold text-gray-800">{exp.position}</h4>
                <div className="text-primary">{exp.company}</div>
              </div>
              <span className="text-sm text-gray-600">{exp.duration}</span>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {exp.description.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold text-primary mb-4">Education</h3>
        {content.education.map((edu, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <div>
                <h4 className="font-bold text-gray-800">{edu.school}</h4>
                <div className="text-primary">{edu.degree}</div>
              </div>
              <span className="text-sm text-gray-600">{edu.duration}</span>
            </div>
          </div>
        ))}
      </section>

      <section>
        <h3 className="text-lg font-semibold text-primary mb-3">Skills & Expertise</h3>
        <div className="flex flex-wrap gap-3">
          {content.skills.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-1.5 bg-primary/10 text-primary rounded-md text-sm font-medium"
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