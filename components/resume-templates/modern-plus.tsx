
import { ResumeData } from '@/lib/types';
import { TemplateWrapper } from "./TemplateWrapper";
export function ModernPlusTemplate({ content }: { content: ResumeData }) {
  return (
    <TemplateWrapper>
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
          </div>
        ))}
      </section>

      <section>
        <h3 className="text-lg font-semibold text-primary mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {content.skills?.map((skill, index) => (
            <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
    </TemplateWrapper>
  );
}
