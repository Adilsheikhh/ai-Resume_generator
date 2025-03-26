
import { ResumeData } from '@/lib/types';

export function ClassicTemplate({ content }: { content: ResumeData }) {
  return (
    <div className="max-w-[850px] mx-auto p-8 bg-white text-gray-800 font-serif">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-wide">{content.name}</h1>
        <h2 className="text-xl text-gray-600 mt-2">{content.title}</h2>
        <div className="flex justify-center gap-6 mt-3 text-sm">
          <span>{content.contact.email}</span>
          <span>{content.contact.phone}</span>
          <span>{content.contact.location}</span>
        </div>
      </header>

      <hr className="border-t-2 border-gray-300 mb-6" />

      <section className="mb-6">
        <h3 className="text-xl font-bold uppercase mb-3 border-b">Summary</h3>
        <p className="text-gray-700 leading-relaxed">{content.summary}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-bold uppercase mb-3 border-b">Professional Experience</h3>
        {content.experience?.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between">
              <h4 className="font-bold">{exp.company}</h4>
              <span className="text-gray-600">{exp.duration}</span>
            </div>
            <div className="font-italic text-gray-700 mb-2">{exp.position}</div>
            <ul className="list-disc ml-5 text-gray-600">
              {exp.description.map((desc, i) => (
                <li key={i} className="mb-1">{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-bold uppercase mb-3 border-b">Education</h3>
        {content.education?.map((edu, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between">
              <h4 className="font-bold">{edu.school}</h4>
              <span className="text-gray-600">{edu.duration}</span>
            </div>
            <div className="text-gray-700">{edu.degree}</div>
          </div>
        ))}
      </section>

      <section>
        <h3 className="text-xl font-bold uppercase mb-3 border-b">Skills</h3>
        <div className="flex flex-wrap gap-3">
          {content.skills?.map((skill, index) => (
            <span key={index} className="text-gray-700">
              {skill}{index < content.skills.length - 1 ? " •" : ""}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
