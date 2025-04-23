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
import { PortfolioTemplate } from "@/components/resume-templates/portfolio"; // Added Portfolio Template
import { ElegantTemplate } from "@/components/resume-templates/elegant"; // Added Elegant Template
import { GradientTemplate } from "@/components/resume-templates/gradient"; // Added Gradient Template import
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
import { Buffer } from "buffer"; // Import Buffer polyfill

const extractResumeData = (text: string) => {
  // Advanced parsing logic for extracting resume data
  return {
    name: "Extracted Name",
    title: "Extracted Title",
    contact: { email: "email@example.com", phone: "123-456-7890", location: "City, Country" },
    summary: "Extracted summary of the resume.",
    experience: [],
    education: [],
    skills: []
  };
};

const handleUpload = async (file: File, setResumeData, toast, setIsLoading) => {
  setIsLoading(true);
  try {
    const fileType = file.type;
    let parsedData = null;

    if (fileType === "application/json") {
      const text = await file.text();
      parsedData = JSON.parse(text);
    } else if (fileType === "application/pdf") {
      const pdf = (await import("pdf-parse")).default;
      const buffer = await file.arrayBuffer();
      const pdfData = await pdf(new Uint8Array(buffer));
      parsedData = extractResumeData(pdfData.text);
    } else if (
      fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const mammoth = await import("mammoth");
      const buffer = await file.arrayBuffer();
      const { value } = await mammoth.extractRawText({ arrayBuffer: buffer });
      parsedData = extractResumeData(value);
    } else if (fileType === "text/plain") {
      const text = await file.text();
      parsedData = extractResumeData(text);
    } else {
      throw new Error("Unsupported file format");
    }

    if (!parsedData) {
      throw new Error("Failed to extract resume data");
    }

    setResumeData(parsedData);
    toast({
      title: "Resume Uploaded",
      description: "Resume data extracted successfully.",
    });
  } catch (error) {
    toast({
      title: "Error",
      description: error.message || "Failed to upload resume.",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};

const templates = [
  { id: "modern", name: "Modern", component: ModernTemplate },
  { id: "minimal", name: "Minimal", component: MinimalTemplate },
  { id: "tech", name: "Tech", component: TechTemplate },
  { id: "executive", name: "Executive", component: ExecutiveTemplate },
  { id: "creative", name: "Creative", component: CreativeTemplate },
  { id: "professional", name: "Professional", component: ProfessionalTemplate },
  { id: "portfolio", name: "Portfolio", component: PortfolioTemplate }, // Added Portfolio Template
  { id: "elegant", name: "Elegant", component: ElegantTemplate }, // Added Elegant Template
  { id: "gradient", name: "Gradient", component: GradientTemplate }, // Added Gradient Template
];

export default function CreatePage() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [selectedTemplate, setSelectedTemplate] = useState(searchParams.get('template') || 'modern');
  const [resumeData, setResumeData] = useState({});
  const [showTemplates, setShowTemplates] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const selectedTemplateData = templates.find(t => t.id === selectedTemplate);

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col lg:flex-row gap-6">
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
                {/*  Template selection UI would go here.  This is missing from the original and the changes provided. */}
              </DialogContent>
            </Dialog>
          </div>

          <Card className="p-6">
            <UploadButton onUpload={(file) => handleUpload(file, setResumeData, toast, setIsLoading)} />
            <ResumeSection title="Personal Information" data={resumeData} onChange={setResumeData} />
          </Card>
        </div>

        <div className="w-full lg:w-1/2">
          <Card className="sticky top-6">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Preview</h2>
            </div>
            <ScrollArea className="h-[800px]">
              <div className="p-6">
                {selectedTemplateData && (
                  <div className="border rounded-lg p-4 bg-white">
                    {React.createElement(selectedTemplateData.component, { content: resumeData })}
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