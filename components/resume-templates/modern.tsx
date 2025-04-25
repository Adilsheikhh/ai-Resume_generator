import React from 'react';
import { cn } from '@/lib/utils';
import { ResumeData } from "@/lib/types";

interface ModernTemplateProps {
  content: ResumeData;
  className?: string;
}

export function ModernTemplate({ content, className }: ModernTemplateProps) {
  return (
    <div className={cn("max-w-[850px] mx-auto p-4 sm:p-6 md:p-8 bg-white text-gray-800", className)}>
      <header className="text-center mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">{content.name}</h1>
        <h2 className="text-xl sm:text-2xl text-gray-600 mb-3 sm:mb-4">{content.title}</h2>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-sm sm:text-base text-gray-600">
          <span>{content.contact.email}</span>
          <span className="hidden sm:inline">•</span>
          <span>{content.contact.phone}</span>
          <span className="hidden sm:inline">•</span>
          <span>{content.contact.location}</span>
        </div>
      </header>

      <section className="mb-5 sm:mb-6">
        <h3 className="text-lg font-semibold border-b border-gray-300 mb-3">Professional Summary</h3>
        <p className="text-gray-700">{content.summary}</p>
      </section>

      <section className="mb-5 sm:mb-6">
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

      <section className="mb-5 sm:mb-6">
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

      {content.projects && content.projects.length > 0 && (
        <section className="mt-5 sm:mt-6">
          <h3 className="text-lg font-semibold border-b border-gray-300 mb-3">Projects</h3>
          {content.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h4 className="font-medium">{project.name}</h4>
                {project.duration && <span className="text-sm text-gray-600">{project.duration}</span>}
              </div>
              <p className="text-gray-700 mb-2">{project.description}</p>
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline mt-1 inline-block">
                  View Project
                </a>
              )}
            </div>
          ))}
        </section>
      )}

      {content.links && content.links.length > 0 && (
        <section className="mt-5 sm:mt-6">
          <h3 className="text-lg font-semibold border-b border-gray-300 mb-3">Links</h3>
          <div className="flex flex-wrap gap-4">
            {content.links.map((link, index) => (
              <div key={index}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                  {link.title}
                </a>
                {link.description && <p className="text-sm text-gray-600">{link.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}