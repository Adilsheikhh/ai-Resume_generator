import { ResumeData } from '@/lib/types';

export function CorporateTemplate({ content }: { content: ResumeData }) {
  return (
    <div className="max-w-[850px] mx-auto bg-white p-8">
      <header className="text-center border-b-4 border-gray-800 pb-6 mb-6">
        <h1 className="text-4xl font-bold tracking-wide uppercase">{content.name}</h1>
        <h2 className="text-xl text-gray-600 mt-2">{content.title}</h2>
        <div className="flex justify-center gap-4 mt-3 text-sm">
          <span>{content.contact.email}</span>
          <span>•</span>
          <span>{content.contact.phone}</span>
          <span>•</span>
          <span>{content.contact.location}</span>
        </div>
      </header>

      <section className="mb-8">
        <h3 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4">Professional Summary</h3>
        <p className="text-gray-700 leading-relaxed">{content.summary}</p>
      </section>

      <section className="mb-8">
        <h3 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4">Experience</h3>
        {content.experience.map((exp, index) => (
          <div key={index} className="mb-6">
            <div className="flex justify-between">
              <h4 className="text-xl font-semibold">{exp.position}</h4>
              <span className="text-gray-600">{exp.duration}</span>
            </div>
            <div className="text-gray-800 font-medium mb-2">{exp.company}</div>
            <ul className="list-disc ml-5 text-gray-600">
              {exp.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-2 gap-8">
        <section>
          <h3 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4">Education</h3>
          {content.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h4 className="text-lg font-semibold">{edu.school}</h4>
              <div className="text-gray-700">{edu.degree}</div>
              <div className="text-gray-600">{edu.duration}</div>
              {edu.location && <div className="text-gray-600">{edu.location}</div>}
            </div>
          ))}
        </section>

        <section>
          <h3 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4">Skills</h3>
          <div className="grid grid-cols-2 gap-2">
            {content.skills.map((skill, index) => (
              <div key={index} className="bg-gray-100 px-3 py-2 rounded text-gray-700">
                {skill}
              </div>
            ))}
          </div>
        </section>
      </div>

      {content.projects && content.projects.length > 0 && (
        <section className="mt-8">
          <h3 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4">Key Projects</h3>
          {content.projects.map((project, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between">
                <h4 className="text-xl font-semibold">{project.name}</h4>
                {project.duration && <span className="text-gray-600">{project.duration}</span>}
              </div>
              <p className="text-gray-700 mb-2">{project.description}</p>
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="font-medium">Technologies:</span>
                  <span className="text-gray-600">{project.technologies.join(', ')}</span>
                </div>
              )}
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-700 font-medium">
                  View Project
                </a>
              )}
            </div>
          ))}
        </section>
      )}

      {content.links && content.links.length > 0 && (
        <section className="mt-8">
          <h3 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4">Professional Links</h3>
          <div className="grid grid-cols-2 gap-4">
            {content.links.map((link, index) => (
              <div key={index} className="bg-gray-100 p-3 rounded">
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-700 font-medium"
                >
                  {link.title}
                </a>
                {link.description && <p className="text-gray-600 text-sm mt-1">{link.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
