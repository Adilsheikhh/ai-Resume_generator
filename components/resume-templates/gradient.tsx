import { ResumeData } from '@/lib/types';
import { TemplateWrapper } from "./TemplateWrapper";

export function GradientTemplate({ content }: { content: ResumeData }) {
  return (
    <TemplateWrapper>
    <div className="max-w-[850px] mx-auto bg-white">
      <div 
        className="p-8 text-white"
        style={{
          background: 'linear-gradient(to right, #4a6cf7, #9c3ef8)',
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact'
        }}
      >
        <h1 className="text-4xl font-bold" style={{ color: '#ffffff' }}>{content.name}</h1>
        <h2 className="text-xl mt-2" style={{ color: 'rgba(255,255,255,0.9)' }}>{content.title}</h2>
        <div className="flex gap-4 mt-4 text-sm" style={{ color: '#ffffff' }}>
          <span>{content.contact.email}</span>
          <span>•</span>
          <span>{content.contact.phone}</span>
          <span>•</span>
          <span>{content.contact.location}</span>
        </div>
      </div>

      <div className="p-8">
        <section className="mb-8">
          <h3 style={{ color: '#4a6cf7' }} className="text-lg font-semibold mb-3">About Me</h3>
          <p style={{ color: '#374151' }} className="leading-relaxed">{content.summary}</p>
        </section>

        <section className="mb-8">
          <h3 style={{ color: '#4a6cf7' }} className="text-lg font-semibold mb-4">Experience</h3>
          {content.experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-baseline">
                <h4 style={{ color: '#1f2937' }} className="font-bold">{exp.position}</h4>
                <span style={{ color: '#6b7280' }} className="text-sm">{exp.duration}</span>
              </div>
              <div style={{ color: '#4a6cf7' }} className="mb-2">{exp.company}</div>
              <ul className="list-disc list-inside space-y-1">
                {exp.description.map((item, i) => (
                  <li key={i} style={{ color: '#4b5563' }}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mb-8">
          <h3 style={{ color: '#4a6cf7' }} className="text-lg font-semibold mb-4">Education</h3>
          {content.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h4 style={{ color: '#1f2937' }} className="font-bold">{edu.school}</h4>
                <span style={{ color: '#6b7280' }} className="text-sm">{edu.duration}</span>
              </div>
              <div style={{ color: '#4a6cf7' }}>{edu.degree}</div>
            </div>
          ))}
        </section>

        <section>
          <h3 style={{ color: '#4a6cf7' }} className="text-lg font-semibold mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {content.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm"
                style={{ 
                  backgroundColor: '#eff6ff', 
                  color: '#4a6cf7'
                }}
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
