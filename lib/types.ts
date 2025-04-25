export interface ResumeData {
  name: string;
  title: string;
  contact: {
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  experience: Array<{
    position: string;
    company: string;
    duration: string;
    description: string[];
  }>;
  education: Array<{
    school: string;
    degree: string;
    location: string;
    startDate: string;
    endDate: string;
    duration: string;
  }>;
  skills: string[];
  projects?: Array<{
    name: string;
    description: string;
    link?: string;
    technologies: string[];
    duration?: string;
  }>;
  links?: Array<{
    title: string;
    url: string;
    description?: string;
  }>;
}