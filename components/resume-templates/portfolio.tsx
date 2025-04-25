import { cn } from "@/lib/utils";
import { ResumeData } from "@/lib/types";

interface PortfolioTemplateProps {
  content: ResumeData;
  className?: string;
}

export function PortfolioTemplate({ content, className }: PortfolioTemplateProps) {
  return (
    <div className={cn("max-w-[850px] mx-auto p-8 bg-gradient-to-br from-purple-50 to-indigo-50", className)}>
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-indigo-900 mb-3">{content.name}</h1>
        <h2 className="text-xl text-indigo-600 mb-4">{content.title}</h2>
        <div className="flex justify-center gap-6 text-indigo-600">
          <span>{content.contact.email}</span>
          <span>|</span>
          <span>{content.contact.phone}</span>
          <span>|</span>
          <span>{content.contact.location}</span>
        </div>
      </header>

      <section className="mb-10 bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-2xl font-semibold text-indigo-900 mb-4">About Me</h3>
        <p className="text-indigo-800 leading-relaxed">{content.summary}</p>
      </section>

      <section className="mb-10">
        <h3 className="text-2xl font-semibold text-indigo-900 mb-6">Experience</h3>
        <div className="space-y-8">
          {content.experience.map((exp, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-baseline mb-2">
                <h4 className="text-xl font-medium text-indigo-900">{exp.position}</h4>
                <span className="text-indigo-600">{exp.duration}</span>
              </div>
              <div className="text-indigo-700 mb-3">{exp.company}</div>
              <ul className="list-disc list-inside text-indigo-800 space-y-2">
                {exp.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h3 className="text-2xl font-semibold text-indigo-900 mb-6">Education</h3>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            {content.education.map((edu, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <h4 className="text-lg font-medium text-indigo-900">{edu.degree}</h4>
                <div className="text-indigo-700">{edu.school}</div>
                <div className="text-indigo-600">{edu.duration}</div>
                {edu.location && <div className="text-indigo-600">{edu.location}</div>}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-indigo-900 mb-6">Skills</h3>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex flex-wrap gap-3">
              {content.skills.map((skill, index) => (
                <span key={index} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>

      {content.projects && content.projects.length > 0 && (
        <section className="mt-10">
          <h3 className="text-2xl font-semibold text-indigo-900 mb-6">Projects</h3>
          <div className="space-y-8">
            {content.projects.map((project, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="text-xl font-medium text-indigo-900">{project.name}</h4>
                  {project.duration && <span className="text-indigo-600">{project.duration}</span>}
                </div>
                <p className="text-indigo-800 mb-3">{project.description}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-indigo-700 font-medium hover:underline">
                    View Project
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {content.links && content.links.length > 0 && (
        <section className="mt-10">
          <h3 className="text-2xl font-semibold text-indigo-900 mb-6">Connect With Me</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.links.map((link, index) => (
              <a 
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <span className="text-lg font-medium text-indigo-900">{link.title}</span>
                {link.description && <span className="text-indigo-600 text-sm mt-1">{link.description}</span>}
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
