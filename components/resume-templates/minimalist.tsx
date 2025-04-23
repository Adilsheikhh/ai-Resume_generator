
import { ResumeData } from '@/lib/types';

export function MinimalistTemplate({ content }: { content: ResumeData }) {
  return (
    <div className="max-w-[850px] mx-auto bg-white p-8 font-light">
      <header className="mb-8">
        <h1 className="text-5xl font-light tracking-wide mb-2">{content.name}</h1>
        <h2 className="text-xl text-gray-500">{content.title}</h2>
        <div className="flex gap-6 mt-4 text-sm text-gray-500">
          <span>{content.contact.email}</span>
          <span>{content.contact.phone}</span>
          <span>{content.contact.location}</span>
        </div>
      </header>

      <section className="mb-8">
        <p className="text-gray-600 leading-relaxed">{content.summary}</p>
      </section>

      <section className="mb-8">
        <h3 className="text-lg uppercase tracking-wide mb-6 text-gray-400">Experience</h3>
        {content.experience.map((exp, index) => (
          <div key={index} className="mb-6">
            <div className="grid grid-cols-[1fr_auto] gap-4 mb-2">
              <h4 className="font-medium">{exp.position}</h4>
              <span className="text-gray-500">{exp.duration}</span>
            </div>
            <div className="text-gray-500 mb-2">{exp.company}</div>
            <ul className="space-y-1 text-gray-600">
              {exp.description.map((desc, i) => (
                <li key={i} className="list-inside list-disc">{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-2 gap-8">
        <section>
          <h3 className="text-lg uppercase tracking-wide mb-6 text-gray-400">Education</h3>
          {content.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h4 className="font-medium">{edu.school}</h4>
              <div className="text-gray-500">{edu.degree}</div>
              <div className="text-gray-500">{edu.duration}</div>
            </div>
          ))}
        </section>

        <section>
          <h3 className="text-lg uppercase tracking-wide mb-6 text-gray-400">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {content.skills.map((skill, index) => (
              <span key={index} className="text-gray-600">
                {skill}{index < content.skills.length - 1 ? " •" : ""}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
