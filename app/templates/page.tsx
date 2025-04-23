"use client";

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MinimalTemplate } from "@/components/resume-templates/minimal";
import { ModernTemplate } from "@/components/resume-templates/modern";
import { TechTemplate } from "@/components/resume-templates/tech";
import { ExecutiveTemplate } from "@/components/resume-templates/executive";
import { ProfessionalTemplate } from "@/components/resume-templates/professional";
import { CreativeTemplate } from "@/components/resume-templates/creative";

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
      startDate: "2012",
      endDate: "2016"
    }
  ],
  skills: ["JavaScript", "React", "Node.js", "Python", "AWS"]
};

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

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
        { id: "corporate", name: "Corporate", component: ModernTemplate },
        { id: "business", name: "Business", component: ExecutiveTemplate },
      ],
    },
    {
      id: "technical",
      name: "Technical",
      description: "Specialized templates for tech and engineering roles",
      templates: [
        { id: "tech", name: "Tech Stack", component: TechTemplate },
        { id: "developer", name: "Developer", component: TechTemplate },
        { id: "engineer", name: "Engineer", component: TechTemplate },
        { id: "creative", name: "Creative", component: CreativeTemplate },
      ],
    },
    {
      id: "creative",
      name: "Creative",
      description: "Eye-catching templates for creative professionals",
      templates: [
        { id: "designer", name: "Designer", component: CreativeTemplate },
        { id: "artist", name: "Artist", component: CreativeTemplate },
        { id: "portfolio", name: "Portfolio", component: CreativeTemplate },
      ],
    }
  ];

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
                    <DialogTrigger asChild>
                      <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                        <CardContent className="p-4">
                          <div className="aspect-[1/1.4] rounded-lg border bg-white flex items-center justify-center overflow-hidden">
                            <div className="w-full transform scale-[0.6] origin-top">
                              <template.component content={sampleData} />
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold mt-4">{template.name}</h3>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{template.name}</DialogTitle>
                        <DialogDescription>Preview of the template</DialogDescription>
                      </DialogHeader>
                      <div className="p-4">
                        <div className="border rounded-lg bg-white overflow-auto max-h-[80vh]">
                          <div className="transform scale-[0.9] origin-top p-8">
                            <template.component content={sampleData} />
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Link href={`/create?template=${template.id}`} prefetch={false}> {/*Simplified Link*/}
                            <Button>Use Template</Button>
                          </Link>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </section>
          ))}
      </div>
    </div>
  );
}