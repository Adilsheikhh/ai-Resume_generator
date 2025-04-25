import { FC } from 'react';
import { ResumeData } from "@/lib/types";
import { TemplateWrapper } from "./TemplateWrapper";
interface CreativeTemplateProps {
  content: ResumeData;
}

export const CreativeTemplate: FC<CreativeTemplateProps> = ({ content }) => {
  return (
    <TemplateWrapper>
      {/* Main container for the resume */}
    <div className="min-h-[297mm] w-full bg-white shadow-lg">
      <div className="relative">
        {/* Header with diagonal design */}
        <div 
          className="p-8"
          style={{
            background: 'linear-gradient(to right, #f97316, #ef4444)',
            clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
            WebkitPrintColorAdjust: 'exact',
            printColorAdjust: 'exact'
          }}
        >
          <h1 className="text-3xl font-bold" style={{ color: '#ffffff' }}>{content.name}</h1>
          <h2 className="text-xl mt-2" style={{ color: 'rgba(255,255,255,0.9)' }}>{content.title}</h2>
        </div>
        
        {/* Contact info */}
        <div 
          className="p-6 mx-8 -mt-8 rounded-lg" 
          style={{ 
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="flex justify-between text-sm" style={{ color: '#4b5563' }}>
            <span>{content.contact.email}</span>
            <span>{content.contact.phone}</span>
            <span>{content.contact.location}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 p-8">
        <div className="col-span-8">
          {/* Experience */}
          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#ea580c' }}>Experience</h3>
            {content.experience.map((exp, i) => (
              <div key={i} className="mb-6">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-lg font-medium" style={{ color: '#111827' }}>{exp.position}</h4>
                  <span className="text-sm" style={{ color: '#6b7280' }}>{exp.duration}</span>
                </div>
                <h5 className="mb-2" style={{ color: '#4b5563' }}>{exp.company}</h5>
                <ul className="list-disc list-inside">
                  {exp.description.map((desc, j) => (
                    <li key={j} style={{ color: '#6b7280' }}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </div>

        <div className="col-span-4">
          {/* Education */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#ea580c' }}>Education</h3>
            {content.education.map((edu, i) => (
              <div key={i} className="mb-4">
                <h4 className="font-medium" style={{ color: '#111827' }}>{edu.degree}</h4>
                <div className="text-sm" style={{ color: '#6b7280' }}>{edu.school}</div>
                <div className="text-sm" style={{ color: '#9ca3af' }}>{edu.duration}</div>
              </div>
            ))}
          </section>

          {/* Skills */}
          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#ea580c' }}>Skills</h3>
            <div className="flex flex-wrap gap-2">
              {content.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ 
                    backgroundColor: '#ffedd5', 
                    color: '#c2410c',
                    WebkitPrintColorAdjust: 'exact',
                    printColorAdjust: 'exact'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
    </TemplateWrapper>
  );
};
