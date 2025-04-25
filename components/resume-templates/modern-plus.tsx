import { ResumeData } from '@/lib/types';

export function ModernPlusTemplate({ content }: { content: ResumeData }) {
  return (
    <div className="max-w-[850px] mx-auto p-8 bg-white text-gray-800">
      <header className="border-b-2 border-primary pb-4 mb-6">
        <h1 className="text-4xl font-bold text-primary">{content.name}</h1>
        <h2 className="text-xl text-gray-600 mt-1">{content.title}</h2>
        <div className="flex gap-4 mt-2 text-sm">
          <span>{content.contact.email}</span>
          <span>{content.contact.phone}</span>
          <span>{content.contact.location}</span>
        </div>
      </header>

      <section className="mb-6">
        <h3 className="text-lg font-semibold text-primary mb-3">Professional Summary</h3>
        <p className="text-gray-700">{content.summary}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold text-primary mb-3">Experience</h3>
        {content.experience?.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h4 className="font-medium">{exp.position}</h4>
              <span className="text-gray-600 text-sm">{exp.duration}</span>
            </div>
            <div className="text-gray-700">{exp.company}</div>
            <ul className="list-disc list-inside mt-2 text-gray-600">
              {exp.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold text-primary mb-3">Education</h3>
        {content.education?.map((edu, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between items-baseline">
              <h4 className="font-medium">{edu.degree}</h4>
              <span className="text-gray-600 text-sm">{edu.duration}</span>
            </div>
            <div className="text-gray-700">{edu.school}</div>
            {edu.location && <div className="text-gray-600 text-sm">{edu.location}</div>}
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold text-primary mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {content.skills?.map((skill, index) => (
            <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {content.projects && content.projects.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-primary mb-3">Projects</h3>
          {content.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h4 className="font-medium">{project.name}</h4>
                {project.duration && <span className="text-gray-600 text-sm">{project.duration}</span>}
              </div>
              <p className="text-gray-700 my-1">{project.description}</p>
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="bg-gray-100 px-2 py-0.5 rounded text-xs text-gray-600">
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
                  className="text-primary text-sm mt-1 inline-block hover:underline"
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </section>
      )}

      {content.links && content.links.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-primary mb-3">Links</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {content.links.map((link, index) => (
              <a 
                key={index} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium">{link.title}</span>
                {link.description && <span className="text-sm text-gray-600">{link.description}</span>}
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
