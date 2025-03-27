import { ResumeData } from '@/lib/types';

export function ExecutiveTemplate({ content }: { content: ResumeData }) {
  return (
    <div className="max-w-[850px] mx-auto p-8 bg-white text-gray-800 font-serif">
      <header className="mb-8 border-b-2 border-gray-800 pb-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 text-center uppercase">{content.name}</h1>
        <div className="mt-3 text-center">
          <h2 className="text-xl font-medium text-gray-700">{content.title}</h2>
          <div className="mt-2 flex justify-center gap-x-8 text-sm text-gray-600">
            <span>{content.contact.email}</span>
            <span>{content.contact.phone}</span>
            <span>{content.contact.location}</span>
          </div>
        </div>
      </header>

      <section className="mb-8">
        <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900 mb-3">Executive Summary</h3>
        <p className="text-gray-700 leading-relaxed">{content.summary}</p>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900 mb-4">Professional Experience</h3>
        {content.experience?.map((exp, index) => (
          <div key={index} className="mb-6">
            <div className="flex justify-between items-baseline mb-2">
              <h4 className="text-gray-900 font-semibold">{exp.company}</h4>
              <span className="text-gray-600 text-sm">{exp.duration}</span>
            </div>
            <div className="text-gray-800 font-medium mb-2">{exp.position}</div>
            <ul className="list-disc ml-5 text-gray-700 space-y-1">
              {Array.isArray(exp.description) ? (
                exp.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))
              ) : (
                <li>{exp.description}</li>
              )}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900 mb-4">Education</h3>
        {content.education?.map((edu, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h4 className="text-gray-900 font-semibold">{edu.school}</h4>
              <span className="text-gray-600 text-sm">{edu.duration}</span>
            </div>
            <div className="text-gray-700">{edu.degree}</div>
          </div>
        ))}
      </section>

      <section>
        <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900 mb-4">Core Competencies</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {content.skills?.map((skill, index) => (
            <div key={index} className="bg-gray-50 px-4 py-2 rounded-lg text-center text-gray-700">
              {skill}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}