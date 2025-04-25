import { cn } from "@/lib/utils";
import { ResumeData } from "@/lib/types";

interface TechTemplateProps {
  content: ResumeData;
  className?: string;
}

export function TechTemplate({ content, className }: TechTemplateProps) {
  return (
    <div className={cn("max-w-[850px] mx-auto p-8 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800", className)}>
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-slate-900">{content.name}</h1>
        <h2 className="text-xl text-slate-700 mb-4">{content.title}</h2>
        <div className="flex gap-4 text-sm text-slate-600">
          <span>{content.contact.email}</span>
          <span>•</span>
          <span>{content.contact.phone}</span>
          <span>•</span>
          <span>{content.contact.location}</span>
        </div>
      </header>

      <section className="mb-6">
        <h3 className="text-lg font-semibold border-b border-slate-300 mb-3 pb-1">Summary</h3>
        <p className="text-slate-700">{content.summary}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold border-b border-slate-300 mb-3 pb-1">Experience</h3>
        {content.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h4 className="font-medium text-slate-900">{exp.position}</h4>
              <span className="text-sm text-slate-600">{exp.duration}</span>
            </div>
            <div className="text-slate-700 mb-2">{exp.company}</div>
            <ul className="list-disc list-inside text-slate-600">
              {exp.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold border-b border-slate-300 mb-3 pb-1">Education</h3>
        {content.education.map((edu, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between items-baseline">
              <h4 className="font-medium text-slate-900">{edu.degree}</h4>
              <span className="text-sm text-slate-600">{edu.duration}</span>
            </div>
            <div className="text-slate-700">{edu.school}</div>
            {edu.location && <div className="text-slate-600 text-sm">{edu.location}</div>}
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold border-b border-slate-300 mb-3 pb-1">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {content.skills.map((skill, index) => (
            <span key={index} className="px-3 py-1 bg-slate-200 rounded-full text-sm text-slate-700">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {content.projects && content.projects.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold border-b border-slate-300 mb-3 pb-1">Projects</h3>
          {content.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h4 className="font-medium text-slate-900">{project.name}</h4>
                {project.duration && <span className="text-sm text-slate-600">{project.duration}</span>}
              </div>
              <p className="text-slate-700 mb-2">{project.description}</p>
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-300 rounded text-xs text-slate-700">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline mt-2 inline-block">
                  {project.link}
                </a>
              )}
            </div>
          ))}
        </section>
      )}

      {content.links && content.links.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold border-b border-slate-300 mb-3 pb-1">Links</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {content.links.map((link, index) => (
              <a 
                key={index}
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col p-3 bg-slate-300 bg-opacity-50 rounded-lg hover:bg-opacity-70 transition-all"
              >
                <span className="font-medium text-slate-900">{link.title}</span>
                {link.description && <span className="text-sm text-slate-600">{link.description}</span>}
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
