"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModernTemplate } from "@/components/resume-templates/modern";
import { MinimalTemplate } from "@/components/resume-templates/minimal";
import { TechTemplate } from "@/components/resume-templates/tech";
import { ExecutiveTemplate } from "@/components/resume-templates/executive";
import { CreativeTemplate } from "@/components/resume-templates/creative";
import { ProfessionalTemplate } from "@/components/resume-templates/professional";
import { GradientTemplate } from "@/components/resume-templates/gradient";
import { CorporateTemplate } from "@/components/resume-templates/corporate";
import { MinimalistTemplate } from "@/components/resume-templates/minimalist";
import { ClassicTemplate } from "@/components/resume-templates/classic";
import { ModernPlusTemplate } from "@/components/resume-templates/modern-plus";

// Updated the `sampleData` object to include `startDate` and `endDate` fields in the `education` property
const sampleData = {
  name: "John Doe",
  title: "Software Engineer",
  contact: {
    email: "johndoe@example.com",
    phone: "123-456-7890",
    location: "San Francisco, CA",
  },
  summary: "Experienced software engineer with a passion for developing innovative programs that expedite the efficiency and effectiveness of organizational success.",
  experience: [
    {
      position: "Frontend Developer",
      company: "Tech Solutions Inc.",
      duration: "Jan 2020 - Present",
      description: [
        "Developed and maintained code for client websites primarily using HTML, CSS, Sass, JavaScript, and jQuery.",
        "Manually tested sites in various browsers and mobile devices to ensure cross-browser compatibility and responsiveness.",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of California, Berkeley",
      location: "Berkeley, CA",
      startDate: "Aug 2015",
      endDate: "May 2019",
      duration: "4 years",
    },
  ],
  skills: ["JavaScript", "React", "Node.js", "CSS", "HTML"],
};

const categories = [
  {
    id: "professional",
    name: "Professional",
    description: "Clean and traditional templates suitable for most industries",
    templates: [
      { id: "modern", name: "Modern Classic", component: ModernTemplate },
      { id: "minimal", name: "Minimal", component: MinimalTemplate },
      { id: "executive", name: "Executive", component: ExecutiveTemplate },
      { id: "professional", name: "Professional", component: ProfessionalTemplate },
      { id: "gradient", name: "Gradient", component: GradientTemplate },
      { id: "classic", name: "Classic", component: ClassicTemplate },
      { id: "modern-plus", name: "Modern Plus", component: ModernPlusTemplate },
    ],
  },
  {
    id: "creative",
    name: "Creative",
    description: "Eye-catching templates for creative professionals",
    templates: [
      { id: "creative", name: "Creative", component: CreativeTemplate },
      { id: "tech", name: "Tech Stack", component: TechTemplate },
      { id: "corporate", name: "Corporate", component: CorporateTemplate },
      { id: "minimalist", name: "Minimalist", component: MinimalistTemplate },
    ],
  }
];

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  return (
    <div className="container mx-auto py-4 sm:py-6 md:py-8 px-3 sm:px-4">
      <div className="text-center mb-6 sm:mb-8 md:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">Resume Templates</h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-4 sm:mb-6 md:mb-8 px-2">
          Choose from our collection of professionally designed templates
        </p>
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
            className="rounded-full text-xs sm:text-sm h-8 sm:h-10"
          >
            All Templates
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="rounded-full text-xs sm:text-sm h-8 sm:h-10"
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-8 sm:space-y-12 md:space-y-16">
        {categories
          .filter((category) => selectedCategory === "all" || category.id === selectedCategory)
          .map((category) => (
            <section key={category.name} className="space-y-3 sm:space-y-4 md:space-y-6">
              <div className="space-y-1 sm:space-y-2">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">{category.name}</h2>
                <p className="text-sm sm:text-base text-muted-foreground">{category.description}</p>
              </div>
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {category.templates.map((template) => (
                  <Dialog key={template.id}>
                    <Card
                      className="cursor-pointer group hover:border-primary transition-colors"
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <CardContent className="p-2 sm:p-3 md:p-4">
                        <div className="aspect-[1/1.4] rounded-lg border bg-white flex items-center justify-center overflow-hidden group-hover:border-primary transition-colors">
                          <div className="w-full transform scale-[0.65] sm:scale-[0.7] origin-top">
                            <template.component content={sampleData} />
                          </div>
                        </div>
                        <div className="mt-2 sm:mt-3 md:mt-4 flex flex-col xs:flex-row items-center justify-between gap-2">
                          <h3 className="text-base sm:text-lg font-medium sm:font-semibold">{template.name}</h3>
                          <Link
                            href={`/create?template=${template.id}`}
                            className="w-full xs:w-auto opacity-100 xs:opacity-0 xs:group-hover:opacity-100 transition-opacity"
                          >
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="w-full xs:w-auto text-xs sm:text-sm h-7 sm:h-8"
                            >
                              Use Template
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </Dialog>
                ))}
              </div>
            </section>
          ))}
      </div>
    </div>
  );
}
