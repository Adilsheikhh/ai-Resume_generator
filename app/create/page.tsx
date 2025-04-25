"use client";

import { useState, useRef, Suspense } from "react";
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
import { GradientTemplate } from "@/components/resume-templates/gradient";
import { CorporateTemplate } from "@/components/resume-templates/corporate";
import { MinimalistTemplate } from "@/components/resume-templates/minimalist";
import { ClassicTemplate } from "@/components/resume-templates/classic";
import { ModernPlusTemplate } from "@/components/resume-templates/modern-plus";
import { VibrantTemplate } from "@/components/resume-templates/vibrant";
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
import { Download, Sparkles } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from 'axios';

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
      endDate: "2016",
      duration: "2012 - 2016"
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
  { id: "gradient", name: "Gradient", component: GradientTemplate },
  { id: "corporate", name: "Corporate", component: CorporateTemplate },
  { id: "minimalist", name: "Minimalist", component: MinimalistTemplate },
  { id: "classic", name: "Classic", component: ClassicTemplate },
  { id: "modern-plus", name: "Modern Plus", component: ModernPlusTemplate },
  { id: "vibrant", name: "Vibrant", component: VibrantTemplate },
];

const CreatePageContent = () => {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [selectedTemplate, setSelectedTemplate] = useState(searchParams.get('template') || 'modern');
  const [resumeData, setResumeData] = useState(sampleData);
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const selectedTemplateData = templates.find(t => t.id === selectedTemplate);

  const handleDownload = async () => {
    if (!resumeRef.current) return;
    
    try {
      setIsDownloading(true);
      toast({
        title: "Preparing download...",
        description: "Please wait while we generate your resume PDF.",
      });
      
      // Apply print-specific styles to ensure colors and content render correctly
      const style = document.createElement('style');
      style.innerHTML = `
        @media print {
          body, html {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          * {
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `;
      document.head.appendChild(style);
      
      // Create a clone of the resume element for manipulation
      const resumeElement = resumeRef.current;
      const clone = resumeElement.cloneNode(true) as HTMLElement;
      
      // Create a wrapper with A4 dimensions (210mm x 297mm at 96 DPI)
      const wrapper = document.createElement('div');
      wrapper.style.width = '794px'; // A4 width at 96 DPI
      wrapper.style.position = 'absolute';
      wrapper.style.top = '0';
      wrapper.style.left = '0';
      wrapper.style.padding = '40px';
      wrapper.style.backgroundColor = 'white';
      wrapper.style.boxSizing = 'border-box';
      wrapper.style.colorAdjust = 'exact';
      wrapper.style.WebkitPrintColorAdjust = 'exact';
      
      // Adjust the clone to fit A4 proportions
      clone.style.transform = 'none';
      clone.style.width = '100%';
      clone.style.height = 'auto';
      clone.style.margin = '0';
      clone.style.boxShadow = 'none';
      clone.style.border = 'none';
      
      // Ensure font colors are preserved
      const allTextElements = clone.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, li, a, div');
      allTextElements.forEach(el => {
        const element = el as HTMLElement;
        if (element.style.color) {
          element.style.colorAdjust = 'exact';
          element.style.WebkitPrintColorAdjust = 'exact';
        }
      });
      
      // Append the clone to the wrapper and the wrapper to the body
      wrapper.appendChild(clone);
      document.body.appendChild(wrapper);
      
      // Capture the canvas with appropriate settings
      const canvas = await html2canvas(wrapper, {
        scale: 3, // Higher scale for better quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        windowWidth: wrapper.offsetWidth,
        windowHeight: wrapper.offsetHeight,
        onclone: (clonedDoc) => {
          // Additional styles for the cloned document
          const clonedElement = clonedDoc.body.querySelector('[ref="resumeRef"]') as HTMLElement;
          if (clonedElement) {
            clonedElement.style.colorAdjust = 'exact';
            clonedElement.style.WebkitPrintColorAdjust = 'exact';
          }
        }
      });
      
      // Remove the wrapper after capturing
      document.body.removeChild(wrapper);
      document.head.removeChild(style);
      
      // Create PDF with proper A4 dimensions
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate the aspect ratio
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgWidth / imgHeight;
      
      // Use full width of the PDF and calculate height based on aspect ratio
      const scaledWidth = pdfWidth;
      const scaledHeight = pdfWidth / ratio;
      
      // Add image to PDF with proper positioning
      pdf.addImage(imgData, 'JPEG', 0, 0, scaledWidth, scaledHeight);
      
      // Save the PDF with the user's name
      pdf.save(`${resumeData.name.replace(/\s+/g, '_')}_resume.pdf`);
      
      toast({
        title: "Download complete!",
        description: "Your resume has been downloaded successfully.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Download failed",
        description: "There was an error generating your resume PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleEnhanceWithAI = async () => {
    try {
      setIsEnhancing(true);
      toast({
        title: "Enhancing your resume...",
        description: "Please wait while we enhance your resume content using AI.",
      });

      const response = await axios.post('/api/enhance-resume', { resume: resumeData });

      if (response.data && response.data.enhancedResume) {
        setResumeData(response.data.enhancedResume);
        toast({
          title: "Enhancement complete!",
          description: "Your resume content has been successfully enhanced.",
        });
      } else {
        throw new Error("Invalid response from AI service");
      }
    } catch (error) {
      console.error("Error enhancing resume:", error);
      toast({
        title: "Enhancement failed",
        description: "There was an error enhancing your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Panel - Editor */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Create Resume</h1>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Change Template</Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[80vh]">
                  <DialogHeader>
                    <DialogTitle>Choose Template</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="h-[60vh]">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
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
                          <div className="transform scale-[0.6]">
                            <template.component content={sampleData} />
                          </div>
                        </div>
                        <h3 className="text-sm font-medium mt-2 text-center">{template.name}</h3>
                      </Card>
                    ))}
                  </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
              <Button variant="outline" onClick={handleEnhanceWithAI} disabled={isEnhancing}>
                {isEnhancing ? "Enhancing..." : "Enhance with AI"}
              </Button>
            </div>
          </div>

          {/* Form fields */}
          <Card className="p-6">
            <ResumeSection
              data={resumeData}
              onChangeAction={setResumeData}
            />
          </Card>
        </div>

        {/* Right Panel - Preview */}
        <div className="w-full lg:w-1/2">
          <Card className="sticky top-6">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">Preview</h2>
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={handleDownload}
                disabled={isDownloading}
              >
                <Download className="h-4 w-4" />
                {isDownloading ? "Generating..." : "Download PDF"}
              </Button>
            </div>
            <ScrollArea className="h-[800px]">
              <div className="p-6 relative">
                {selectedTemplateData && (
                  <div 
                    className="border rounded-lg p-4 bg-white print:border-none print:shadow-none relative"
                    ref={resumeRef}
                    style={{
                      aspectRatio: "210/297", // A4 aspect ratio
                      maxWidth: "100%",
                    }}
                  >
                    {isEnhancing && (
                      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                        <div className="animate-pulse flex flex-col items-center gap-2">
                          <div className="relative">
                            <Sparkles className="h-12 w-12 text-primary animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="h-4 w-4 rounded-full bg-primary animate-ping" />
                            </div>
                          </div>
                          <p className="text-xl font-medium text-primary animate-pulse">Enhancing Resume...</p>
                          <p className="text-sm text-muted-foreground text-center max-w-xs">
                            Our AI is working to improve your resume's language and formatting for better results
                          </p>
                        </div>
                      </div>
                    )}
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
};

export default function CreatePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreatePageContent />
    </Suspense>
  );
}