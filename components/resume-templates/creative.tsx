
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
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 clip-diagonal">
          <h1 className="text-3xl font-bold text-white">{content.name}</h1>
          <h2 className="text-xl text-white/90 mt-2">{content.title}</h2>
        </div>
        
        {/* Contact info */}
        <div className="bg-white p-6 shadow-md mx-8 -mt-8 rounded-lg">
          <div className="flex justify-between text-sm">
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
            <h3 className="text-xl font-semibold text-orange-600 mb-4">Experience</h3>
            {content.experience.map((exp, i) => (
              <div key={i} className="mb-6">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-lg font-medium">{exp.position}</h4>
                  <span className="text-sm text-gray-600">{exp.duration}</span>
                </div>
                <h5 className="text-gray-700 mb-2">{exp.company}</h5>
                <ul className="list-disc list-inside text-gray-600">
                  {exp.description.map((desc, j) => (
                    <li key={j}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </div>

        <div className="col-span-4">
          {/* Education */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-orange-600 mb-4">Education</h3>
            {content.education.map((edu, i) => (
              <div key={i} className="mb-4">
                <h4 className="font-medium">{edu.degree}</h4>
                <div className="text-sm text-gray-600">{edu.school}</div>
                <div className="text-sm text-gray-500">{edu.duration}</div>
              </div>
            ))}
          </section>

          {/* Skills */}
          <section>
            <h3 className="text-xl font-semibold text-orange-600 mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {content.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
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
