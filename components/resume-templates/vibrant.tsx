import { ResumeData } from '../../lib/types';
import { TemplateWrapper } from './TemplateWrapper';

export function VibrantTemplate({ content }: { content: ResumeData }) {
  return (
    <TemplateWrapper>
      <div className="max-w-[850px] mx-auto p-8 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">{content.name}</h1>
          <h2 className="text-2xl mb-4">{content.title}</h2>
          <div className="flex justify-center gap-4 text-sm">
            <span>{content.contact.email}</span>
            <span>•</span>
            <span>{content.contact.phone}</span>
            <span>•</span>
            <span>{content.contact.location}</span>
          </div>
        </header>

        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Professional Summary</h3>
          <p>{content.summary}</p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Experience</h3>
          {content.experience.map((exp: { description: string[]; position: string; duration: string; company: string }, index: number) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h4 className="font-medium">{exp.position}</h4>
                <span className="text-sm">{exp.duration}</span>
              </div>
              <div>{exp.company}</div>
              <ul className="list-disc list-inside">
                {exp.description.map((desc: string, i: number) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Education</h3>
          {content.education.map((edu: { school: string; duration: string; degree: string }, index: number) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h4 className="font-medium">{edu.school}</h4>
                <span className="text-sm">{edu.duration}</span>
              </div>
              <div>{edu.degree}</div>
            </div>
          ))}
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {content.skills.map((skill: string, index: number) => (
              <span key={index} className="bg-white text-black px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </TemplateWrapper>
  );
}