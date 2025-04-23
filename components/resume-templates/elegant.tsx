
import { cn } from "@/lib/utils";

interface ElegantTemplateProps {
  content: {
    name: string;
    title: string;
    contact: {
      email: string;
      phone: string;
      location: string;
    };
    summary: string;
    experience: Array<{
      company: string;
      position: string;
      duration: string;
      description: string[];
    }>;
    education: Array<{
      school: string;
      degree: string;
      duration: string;
    }>;
    skills: string[];
  };
  className?: string;
}

export function ElegantTemplate({ content, className }: ElegantTemplateProps) {
  return (
    <div className={cn("max-w-[850px] mx-auto p-8 bg-stone-50", className)}>
      <header className="border-b-2 border-stone-300 pb-6 mb-8">
        <h1 className="text-4xl font-serif text-stone-900 mb-2">{content.name}</h1>
        <h2 className="text-xl text-stone-600 font-serif italic mb-4">{content.title}</h2>
        <div className="flex gap-6 text-stone-600">
          <span>{content.contact.email}</span>
          <span className="text-stone-300">•</span>
          <span>{content.contact.phone}</span>
          <span className="text-stone-300">•</span>
          <span>{content.contact.location}</span>
        </div>
      </header>

      <section className="mb-8">
        <p className="text-stone-700 leading-relaxed font-serif">{content.summary}</p>
      </section>

      <section className="mb-8">
        <h3 className="text-2xl font-serif text-stone-900 mb-6 border-b border-stone-200 pb-2">Professional Experience</h3>
        {content.experience.map((exp, index) => (
          <div key={index} className="mb-6">
            <div className="flex justify-between items-baseline mb-2">
              <h4 className="text-xl font-medium text-stone-900">{exp.position}</h4>
              <span className="text-stone-600 italic">{exp.duration}</span>
            </div>
            <div className="text-stone-700 font-serif mb-3">{exp.company}</div>
            <ul className="list-disc list-inside text-stone-600 space-y-2">
              {exp.description.map((desc, i) => (
                <li key={i} className="font-serif">{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-2 gap-8">
        <section>
          <h3 className="text-2xl font-serif text-stone-900 mb-6 border-b border-stone-200 pb-2">Education</h3>
          {content.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h4 className="text-lg font-medium text-stone-900">{edu.degree}</h4>
              <div className="text-stone-700 font-serif">{edu.school}</div>
              <div className="text-stone-600 italic">{edu.duration}</div>
            </div>
          ))}
        </section>

        <section>
          <h3 className="text-2xl font-serif text-stone-900 mb-6 border-b border-stone-200 pb-2">Skills</h3>
          <div className="flex flex-wrap gap-3">
            {content.skills.map((skill, index) => (
              <span key={index} className="px-4 py-2 bg-stone-100 text-stone-700 rounded-md font-serif">
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
