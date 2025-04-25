import { ResumeData } from '../../lib/types';

export function VibrantTemplate({ content }: { content: ResumeData }) {
  return (
    <div 
      className="max-w-[850px] mx-auto p-8 text-white"
      style={{
        background: 'linear-gradient(to right, #f6d365, #ff5e62, #ff6b6b)',
        WebkitPrintColorAdjust: 'exact',
        printColorAdjust: 'exact'
      }}
    >
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#ffffff' }}>{content.name}</h1>
        <h2 className="text-2xl mb-4" style={{ color: '#ffffff' }}>{content.title}</h2>
        <div className="flex justify-center gap-4 text-sm" style={{ color: '#ffffff' }}>
          <span>{content.contact.email}</span>
          <span>•</span>
          <span>{content.contact.phone}</span>
          <span>•</span>
          <span>{content.contact.location}</span>
        </div>
      </header>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-3" style={{ color: '#ffffff' }}>Professional Summary</h3>
        <p style={{ color: '#ffffff' }}>{content.summary}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-3" style={{ color: '#ffffff' }}>Experience</h3>
        {content.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h4 className="font-medium" style={{ color: '#ffffff' }}>{exp.position}</h4>
              <span className="text-sm" style={{ color: '#ffffff' }}>{exp.duration}</span>
            </div>
            <div style={{ color: '#ffffff' }}>{exp.company}</div>
            <ul className="list-disc list-inside" style={{ color: '#ffffff' }}>
              {exp.description.map((desc, i) => (
                <li key={i} style={{ color: '#ffffff' }}>{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-3" style={{ color: '#ffffff' }}>Education</h3>
        {content.education.map((edu, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between items-baseline">
              <h4 className="font-medium" style={{ color: '#ffffff' }}>{edu.school}</h4>
              <span className="text-sm" style={{ color: '#ffffff' }}>{edu.duration}</span>
            </div>
            <div style={{ color: '#ffffff' }}>{edu.degree}</div>
            {edu.location && <div style={{ color: '#ffffff' }} className="text-sm">{edu.location}</div>}
          </div>
        ))}
      </section>

      {content.projects && content.projects.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-3" style={{ color: '#ffffff' }}>Projects</h3>
          {content.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h4 className="font-medium" style={{ color: '#ffffff' }}>{project.name}</h4>
                {project.duration && <span className="text-sm" style={{ color: '#ffffff' }}>{project.duration}</span>}
              </div>
              <p style={{ color: '#ffffff' }} className="mb-2">{project.description}</p>
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.technologies.map((tech, i) => (
                    <span 
                      key={i} 
                      className="px-2 py-0.5 rounded text-xs"
                      style={{ 
                        backgroundColor: '#ffffff',
                        color: '#ff5e62',
                        WebkitPrintColorAdjust: 'exact',
                        printColorAdjust: 'exact'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              {project.link && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline" 
                  style={{ color: '#ffffff' }}
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </section>
      )}

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-3" style={{ color: '#ffffff' }}>Skills</h3>
        <div className="flex flex-wrap gap-2">
          {content.skills.map((skill, index) => (
            <span 
              key={index} 
              className="px-3 py-1 rounded-full text-sm"
              style={{ 
                backgroundColor: '#ffffff',
                color: '#000000',
                WebkitPrintColorAdjust: 'exact',
                printColorAdjust: 'exact'
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {content.links && content.links.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold mb-3" style={{ color: '#ffffff' }}>Links</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {content.links.map((link, index) => (
              <a 
                key={index}
                href={link.url}
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  WebkitPrintColorAdjust: 'exact',
                  printColorAdjust: 'exact'
                }}
              >
                <div className="font-medium" style={{ color: '#ffffff' }}>{link.title}</div>
                {link.description && (
                  <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{link.description}</div>
                )}
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}