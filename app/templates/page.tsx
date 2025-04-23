
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

const sampleData = {
  name: "Charles Bloomberg",
  title: "Senior Software Engineer",
  contact: {
    email: "charles.bloomberg@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA"
  },
  summary: "Experienced software engineer with expertise in full-stack development",
  experience: [
    {
      position: "Senior Software Engineer",
      company: "Tech Corp",
      duration: "2020 - Present",
      description: [
        "Led development of cloud-based solutions",
        "Managed team of 5 engineers",
        "Implemented CI/CD pipelines"
      ]
    }
  ],
  education: [
    {
      degree: "B.S. Computer Science",
      school: "Stanford University",
      location: "Stanford, CA",
      duration: "2012 - 2016"
    }
  ],
  skills: ["JavaScript", "React", "Node.js", "Python", "AWS"]
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
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Resume Templates</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Choose from our collection of professionally designed templates
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
            className="rounded-full"
          >
            All Templates
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="rounded-full"
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-16">
        {categories
          .filter((category) => selectedCategory === "all" || category.id === selectedCategory)
          .map((category) => (
            <section key={category.name} className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">{category.name}</h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.templates.map((template) => (
                  <Dialog key={template.id}>
                    <Card
                      className="cursor-pointer group hover:border-primary transition-colors"
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <CardContent className="p-4">
                        <div className="aspect-[1/1.4] rounded-lg border bg-white flex items-center justify-center overflow-hidden group-hover:border-primary transition-colors">
                          <div className="w-full transform scale-[0.7] origin-top">
                            <template.component content={sampleData} />
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <h3 className="text-lg font-semibold">{template.name}</h3>
                          <Link
                            href={`/create?template=${template.id}`}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Button variant="outline" size="sm">
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
