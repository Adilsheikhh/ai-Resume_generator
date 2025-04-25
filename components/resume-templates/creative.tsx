import { FC } from 'react';
import { ResumeData } from "@/lib/types";
interface CreativeTemplateProps {
  content: ResumeData;
}

export const CreativeTemplate: FC<CreativeTemplateProps> = ({ content }) => {
  return (
    <div className="min-h-[297mm] w-full bg-white shadow-lg">
      <div className="relative">
        {/* Header with diagonal design */}
        <div 
          className="p-4 sm:p-8"
          style={{
            background: 'linear-gradient(to right, #f97316, #ef4444)',
            clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
            WebkitPrintColorAdjust: 'exact',
            printColorAdjust: 'exact'
          }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: '#ffffff' }}>{content.name}</h1>
          <h2 className="text-lg sm:text-xl mt-2" style={{ color: 'rgba(255,255,255,0.9)' }}>{content.title}</h2>
        </div>
        
        {/* Contact info */}
        <div 
          className="p-3 sm:p-6 mx-4 sm:mx-8 -mt-6 sm:-mt-8 rounded-lg" 
          style={{ 
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm gap-1 sm:gap-0" style={{ color: '#4b5563' }}>
            <span>{content.contact.email}</span>
            <span>{content.contact.phone}</span>
            <span>{content.contact.location}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 p-4 sm:p-8">
        <div className="col-span-1 sm:col-span-8">
          {/* Experience */}
          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#ea580c' }}>Experience</h3>
            {content.experience.map((exp, i) => (
              <div key={i} className="mb-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-0">
                  <h4 className="text-lg font-medium" style={{ color: '#111827' }}>{exp.position}</h4>
                  <span className="text-sm" style={{ color: '#6b7280' }}>{exp.duration}</span>
                </div>
                <h5 className="mb-2" style={{ color: '#4b5563' }}>{exp.company}</h5>
                <ul className="list-disc list-inside">
                  {exp.description.map((desc, j) => (
                    <li key={j} style={{ color: '#6b7280' }}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Projects */}
          {content.projects && content.projects.length > 0 && (
            <section className="mt-8">
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#ea580c' }}>Projects</h3>
              {content.projects.map((project, i) => (
                <div key={i} className="mb-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-0">
                    <h4 className="text-lg font-medium" style={{ color: '#111827' }}>{project.name}</h4>
                    {project.duration && <span className="text-sm" style={{ color: '#6b7280' }}>{project.duration}</span>}
                  </div>
                  <p className="mb-2" style={{ color: '#4b5563' }}>{project.description}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.technologies.map((tech, j) => (
                        <span
                          key={j}
                          className="px-2 py-0.5 rounded-md text-xs"
                          style={{ 
                            backgroundColor: '#ffedd5', 
                            color: '#c2410c'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" 
                      style={{ color: '#ea580c' }} className="text-sm hover:underline">
                      View Project
                    </a>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        <div className="col-span-1 sm:col-span-4">
          {/* Education */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#ea580c' }}>Education</h3>
            {content.education.map((edu, i) => (
              <div key={i} className="mb-4">
                <h4 className="font-medium" style={{ color: '#111827' }}>{edu.degree}</h4>
                <div className="text-sm" style={{ color: '#6b7280' }}>{edu.school}</div>
                <div className="text-sm" style={{ color: '#9ca3af' }}>{edu.duration}</div>
                {edu.location && <div className="text-sm" style={{ color: '#9ca3af' }}>{edu.location}</div>}
              </div>
            ))}
          </section>

          {/* Skills */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#ea580c' }}>Skills</h3>
            <div className="flex flex-wrap gap-2">
              {content.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ 
                    backgroundColor: '#ffedd5', 
                    color: '#c2410c',
                    WebkitPrintColorAdjust: 'exact',
                    printColorAdjust: 'exact'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Links */}
          {content.links && content.links.length > 0 && (
            <section>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#ea580c' }}>Links</h3>
              <div className="space-y-3">
                {content.links.map((link, i) => (
                  <div key={i} className="rounded-lg p-3"
                    style={{ backgroundColor: '#ffedd5' }}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" 
                      style={{ color: '#c2410c' }} className="font-medium hover:underline">
                      {link.title}
                    </a>
                    {link.description && (
                      <p className="mt-1 text-xs" style={{ color: '#9ca3af' }}>{link.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
