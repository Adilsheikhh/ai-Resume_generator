
import { ResumeData } from '@/lib/types';
import { TemplateWrapper } from "./TemplateWrapper";

export function GradientTemplate({ content }: { content: ResumeData }) {
  return (
    <TemplateWrapper>
    <div className="max-w-[850px] mx-auto bg-white">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 text-white">
        <h1 className="text-4xl font-bold">{content.name}</h1>
        <h2 className="text-xl mt-2 opacity-90">{content.title}</h2>
        <div className="flex gap-4 mt-4 text-sm">
          <span>{content.contact.email}</span>
          <span>•</span>
          <span>{content.contact.phone}</span>
          <span>•</span>
          <span>{content.contact.location}</span>
        </div>
      </div>

      <div className="p-8">
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-blue-600 mb-3">About Me</h3>
          <p className="text-gray-700 leading-relaxed">{content.summary}</p>
        </section>

        <section className="mb-8">
          <h3 className="text-lg font-semibold text-blue-600 mb-4">Experience</h3>
          {content.experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-baseline">
                <h4 className="font-bold text-gray-800">{exp.position}</h4>
                <span className="text-sm text-gray-600">{exp.duration}</span>
              </div>
              <div className="text-blue-600 mb-2">{exp.company}</div>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {exp.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mb-8">
          <h3 className="text-lg font-semibold text-blue-600 mb-4">Education</h3>
          {content.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h4 className="font-bold text-gray-800">{edu.school}</h4>
                <span className="text-sm text-gray-600">{edu.duration}</span>
              </div>
              <div className="text-blue-600">{edu.degree}</div>
            </div>
          ))}
        </section>

        <section>
          <h3 className="text-lg font-semibold text-blue-600 mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {content.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
    </TemplateWrapper>
  );
}
