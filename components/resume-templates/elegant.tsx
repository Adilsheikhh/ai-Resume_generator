import { cn } from "@/lib/utils";
import { ResumeData } from "@/lib/types";

interface ElegantTemplateProps {
  content: ResumeData;
  className?: string;
}

export function ElegantTemplate({ content, className }: ElegantTemplateProps) {
  return (
    <div className={cn("max-w-[850px] mx-auto p-8 bg-stone-50", className)}>
      <header className="border-b-2 border-stone-300 pb-6 mb-8">
        <h1 className="text-4xl font-serif text-stone-900 mb-2">{content.name}</h1>
        <h2 className="text-xl text-stone-600 font-serif italic mb-4">{content.title}</h2>
        <div className="flex gap-6 text-stone-600">
          <span>{content.contact.email}</span>
          <span className="text-stone-300">•</span>
          <span>{content.contact.phone}</span>
          <span className="text-stone-300">•</span>
          <span>{content.contact.location}</span>
        </div>
      </header>

      <section className="mb-8">
        <p className="text-stone-700 leading-relaxed font-serif">{content.summary}</p>
      </section>

      <section className="mb-8">
        <h3 className="text-2xl font-serif text-stone-900 mb-6 border-b border-stone-200 pb-2">Professional Experience</h3>
        {content.experience.map((exp, index) => (
          <div key={index} className="mb-6">
            <div className="flex justify-between items-baseline mb-2">
              <h4 className="text-xl font-medium text-stone-900">{exp.position}</h4>
              <span className="text-stone-600 italic">{exp.duration}</span>
            </div>
            <div className="text-stone-700 font-serif mb-3">{exp.company}</div>
            <ul className="list-disc list-inside text-stone-600 space-y-2">
              {exp.description.map((desc, i) => (
                <li key={i} className="font-serif">{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-2 gap-8">
        <section>
          <h3 className="text-2xl font-serif text-stone-900 mb-6 border-b border-stone-200 pb-2">Education</h3>
          {content.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h4 className="text-lg font-medium text-stone-900">{edu.degree}</h4>
              <div className="text-stone-700 font-serif">{edu.school}</div>
              <div className="text-stone-600 italic">{edu.duration}</div>
              {edu.location && <div className="text-stone-600 italic">{edu.location}</div>}
            </div>
          ))}
        </section>

        <section>
          <h3 className="text-2xl font-serif text-stone-900 mb-6 border-b border-stone-200 pb-2">Skills</h3>
          <div className="flex flex-wrap gap-3">
            {content.skills.map((skill, index) => (
              <span key={index} className="px-4 py-2 bg-stone-100 text-stone-700 rounded-md font-serif">
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>

      {content.projects && content.projects.length > 0 && (
        <section className="mt-8">
          <h3 className="text-2xl font-serif text-stone-900 mb-6 border-b border-stone-200 pb-2">Notable Projects</h3>
          {content.projects.map((project, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-baseline mb-2">
                <h4 className="text-xl font-medium text-stone-900">{project.name}</h4>
                {project.duration && <span className="text-stone-600 italic">{project.duration}</span>}
              </div>
              <p className="text-stone-700 font-serif mb-3">{project.description}</p>
              {project.technologies && project.technologies.length > 0 && (
                <div className="text-stone-600 font-serif mb-2">
                  <span className="italic">Technologies: </span>
                  {project.technologies.join(', ')}
                </div>
              )}
              {project.link && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-stone-700 underline font-serif"
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </section>
      )}

      {content.links && content.links.length > 0 && (
        <section className="mt-8">
          <h3 className="text-2xl font-serif text-stone-900 mb-6 border-b border-stone-200 pb-2">Professional Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.links.map((link, index) => (
              <div key={index} className="bg-stone-100 p-4 rounded-md">
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-stone-900 font-medium hover:underline"
                >
                  {link.title}
                </a>
                {link.description && (
                  <p className="text-stone-600 font-serif mt-1">{link.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
