"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "next/navigation";
import { ModernTemplate } from "@/components/resume-templates/modern";
import { MinimalTemplate } from "@/components/resume-templates/minimal";
import { TechTemplate } from "@/components/resume-templates/tech";
import { ExecutiveTemplate } from "@/components/resume-templates/executive";
import { CreativeTemplate } from "@/components/resume-templates/creative";
import { ProfessionalTemplate } from "@/components/resume-templates/professional";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ResumeSection } from "@/components/resume-editor/section";
import { useToast } from "@/components/ui/use-toast";
import { UploadButton } from "@/components/file-upload/upload-button";

const sampleData = {
  name: "John Doe",
  title: "Software Engineer",
  contact: {
    email: "john@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA"
  },
  summary: "Experienced software engineer with a passion for building scalable applications",
  experience: [
    {
      position: "Senior Software Engineer",
      company: "Tech Corp",
      duration: "2020 - Present",
      description: ["Led development of cloud-based solutions", "Managed team of 5 engineers"]
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

const templates = [
  { id: "modern", name: "Modern", component: ModernTemplate },
  { id: "minimal", name: "Minimal", component: MinimalTemplate },
  { id: "tech", name: "Tech", component: TechTemplate },
  { id: "executive", name: "Executive", component: ExecutiveTemplate },
  { id: "creative", name: "Creative", component: CreativeTemplate },
  { id: "professional", name: "Professional", component: ProfessionalTemplate },
];

export default function CreatePage() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [selectedTemplate, setSelectedTemplate] = useState(searchParams.get('template') || 'modern');
  const [resumeData, setResumeData] = useState(sampleData);
  const [showTemplates, setShowTemplates] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const selectedTemplateData = templates.find(t => t.id === selectedTemplate);

  const handleUpload = async (content: string) => {
    setIsLoading(true);
    try {
      const parsedData = JSON.parse(content);
      if (!parsedData || typeof parsedData !== 'object') {
        throw new Error("Invalid resume format");
      }
      setResumeData(parsedData);
      toast({
        title: "Resume uploaded",
        description: "Your resume has been successfully parsed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to parse resume. Ensure it's a valid JSON format.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadError = (error: string) => {
    toast({
      title: "Upload Error",
      description: error,
      variant: "destructive",
    });
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Panel - Editor */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Create Resume</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Change Template</Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Choose Template</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 p-4">
                  {templates.map((template) => (
                    <Card 
                      key={template.id}
                      className={cn(
                        "cursor-pointer hover:bg-muted/50 transition-colors p-4",
                        selectedTemplate === template.id && "border-primary"
                      )}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div className="aspect-[1/1.4] rounded-lg border bg-white flex items-center justify-center overflow-hidden">
                        <div className="transform scale-[0.4]">
                          <template.component content={sampleData} />
                        </div>
                      </div>
                      <h3 className="text-sm font-medium mt-2 text-center">{template.name}</h3>
                    </Card>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Form fields will go here */}
          <Card className="p-6">
            <UploadButton onUpload={handleUpload} onError={handleUploadError} />
            <ResumeSection
              title="Personal Information"
              data={resumeData}
              onChange={setResumeData}
            />
          </Card>
        </div>

        {/* Right Panel - Preview */}
        <div className="w-full lg:w-1/2">
          <Card className="sticky top-6">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Preview</h2>
            </div>
            <ScrollArea className="h-[800px]">
              <div className="p-6">
                {selectedTemplateData && (
                  <div className="border rounded-lg p-4 bg-white">
                    <selectedTemplateData.component content={resumeData} />
                  </div>
                )}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
}
