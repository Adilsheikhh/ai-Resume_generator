import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { MinimalTemplate } from "@/components/resume-templates/minimal";
import { ModernTemplate } from "@/components/resume-templates/modern";
import { ModernPlusTemplate } from "@/components/resume-templates/modern-plus";
import { ClassicTemplate } from "@/components/resume-templates/classic";
import { ProfessionalTemplate } from "@/components/resume-templates/professional";

const sampleData = {
  name: "John Doe",
  title: "Software Engineer",
  contact: {
    email: "john@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
  },
  summary: "Experienced software engineer with a passion for building scalable applications.",
  experience: [
    {
      company: "Tech Corp",
      position: "Senior Software Engineer",
      duration: "2020 - Present",
      description: ["Led development of cloud infrastructure", "Mentored junior developers"],
    },
  ],
  education: [
    {
      school: "University of Technology",
      degree: "BS in Computer Science",
      duration: "2016 - 2020",
    },
  ],
  skills: ["JavaScript", "React", "Node.js", "Python", "AWS"],
};

export default function Templates() {
  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Professional Resume Templates</h1>
        <p className="text-lg text-muted-foreground">
          Choose from our collection of ATS-friendly templates
        </p>
      </div>

      <div className="space-y-16">
        {/* Modern Template */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Modern Template</span>
              <Link href="/create?template=modern">
                <Button>
                  Use Template <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-4">
              <ModernTemplate content={sampleData} />
            </div>
          </CardContent>
        </Card>

        {/* Minimal Template */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Minimal Template</span>
              <Link href="/create?template=minimal">
                <Button>
                  Use Template <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-4">
              <MinimalTemplate content={sampleData} />
            </div>
          </CardContent>
        </Card>

        {/* Professional Template */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Professional Template</span>
              <Link href="/create?template=professional">
                <Button>
                  Use Template <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-4">
              <ProfessionalTemplate content={sampleData} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}