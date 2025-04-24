import React from 'react';
import { cn } from '@/lib/utils';
import { TemplateWrapper } from "./TemplateWrapper";

interface ModernTemplateProps {
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

export function ModernTemplate({ content, className }: ModernTemplateProps) {
  return (
    <TemplateWrapper >
    <div className={cn("max-w-[850px] mx-auto p-8 bg-white text-gray-800 scale-100", className)}>
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">{content.name}</h1>
        <h2 className="text-2xl text-gray-600 mb-4">{content.title}</h2>
        <div className="flex justify-center gap-4 text-base text-gray-600">
          <span>{content.contact.email}</span>
          <span>•</span>
          <span>{content.contact.phone}</span>
          <span>•</span>
          <span>{content.contact.location}</span>
        </div>
      </header>

      <section className="mb-6">
        <h3 className="text-lg font-semibold border-b border-gray-300 mb-3">Professional Summary</h3>
        <p className="text-gray-700">{content.summary}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold border-b border-gray-300 mb-3">Experience</h3>
        {content.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h4 className="font-medium">{exp.position}</h4>
              <span className="text-sm text-gray-600">{exp.duration}</span>
            </div>
            <div className="text-gray-700 mb-2">{exp.company}</div>
            <ul className="list-disc list-inside text-gray-700">
              {exp.description.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold border-b border-gray-300 mb-3">Education</h3>
        {content.education.map((edu, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between items-baseline">
              <h4 className="font-medium">{edu.school}</h4>
              <span className="text-sm text-gray-600">{edu.duration}</span>
            </div>
            <div className="text-gray-700">{edu.degree}</div>
          </div>
        ))}
      </section>

      <section>
        <h3 className="text-lg font-semibold border-b border-gray-300 mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {content.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
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