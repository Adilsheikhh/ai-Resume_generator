
import { ResumeData } from '@/lib/types';
import { TemplateWrapper } from "./TemplateWrapper";
export function CorporateTemplate({ content }: { content: ResumeData }) {
  return (
    <TemplateWrapper>
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
    </div>
    </TemplateWrapper>
  );
}
