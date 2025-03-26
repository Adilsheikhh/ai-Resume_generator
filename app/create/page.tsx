
"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { UploadButton } from '@/components/file-upload/upload-button';
import { ResumeSection } from '@/components/resume-editor/section';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MinimalTemplate } from '@/components/resume-templates/minimal';
import { ModernTemplate } from '@/components/resume-templates/modern';
import { ProfessionalTemplate } from '@/components/resume-templates/professional';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function CreateResume() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [resumeData, setResumeData] = useState({
    name: '',
    title: '',
    contact: {
      email: '',
      phone: '',
      location: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
  });
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  const handleUpload = async (content: string) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/resume/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'My Resume',
          content,
          template: selectedTemplate,
        }),
      });

      if (!response.ok) throw new Error('Failed to upload resume');
      
      toast({
        title: "Success",
        description: "Resume uploaded successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnhance = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/resume/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resumeData),
      });

      if (!response.ok) throw new Error('Failed to enhance resume');
      
      const enhanced = await response.json();
      setResumeData(enhanced);
      
      toast({
        title: "Success",
        description: "Resume enhanced with AI!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Create Your Resume</h2>
            <div className="space-y-4">
              <UploadButton
                onUpload={handleUpload}
                onError={(error) => toast({
                  title: 'Error',
                  description: error,
                  variant: 'destructive',
                })}
              />
              <Button 
                onClick={handleEnhance} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enhancing...
                  </>
                ) : (
                  'Enhance with AI'
                )}
              </Button>
            </div>
          </Card>

          <ResumeSection
            title="Personal Information"
            content=""
            fields={[
              {
                label: 'Full Name',
                value: resumeData.name,
                onChange: (value) => setResumeData({ ...resumeData, name: value }),
              },
              {
                label: 'Professional Title',
                value: resumeData.title,
                onChange: (value) => setResumeData({ ...resumeData, title: value }),
              },
              {
                label: 'Email',
                value: resumeData.contact.email,
                onChange: (value) => setResumeData({ 
                  ...resumeData, 
                  contact: { ...resumeData.contact, email: value }
                }),
              },
              {
                label: 'Phone',
                value: resumeData.contact.phone,
                onChange: (value) => setResumeData({ 
                  ...resumeData, 
                  contact: { ...resumeData.contact, phone: value }
                }),
              },
              {
                label: 'Location',
                value: resumeData.contact.location,
                onChange: (value) => setResumeData({ 
                  ...resumeData, 
                  contact: { ...resumeData.contact, location: value }
                }),
              },
            ]}
            onContentChange={() => {}}
          />

          <ResumeSection
            title="Professional Summary"
            content={resumeData.summary}
            onContentChange={(content) => setResumeData({ ...resumeData, summary: content })}
          />
        </div>

        <div className="sticky top-8">
          <Card className="shadow-lg">
            <Tabs value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="modern">Modern</TabsTrigger>
                <TabsTrigger value="minimal">Minimal</TabsTrigger>
                <TabsTrigger value="professional">Professional</TabsTrigger>
              </TabsList>
              <TabsContent value="modern">
                <ModernTemplate content={resumeData} />
              </TabsContent>
              <TabsContent value="minimal">
                <MinimalTemplate content={resumeData} />
              </TabsContent>
              <TabsContent value="professional">
                <ProfessionalTemplate content={resumeData} />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}
