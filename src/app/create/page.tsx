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
import { toast } from '@/components/ui/use-toast';

export default function CreateResume() {
  const { data: session } = useSession();
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
      const response = await fetch('/api/resume/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'My Resume',
          content,
          template: selectedTemplate,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to upload resume');
      }

      const data = await response.json();
      setResumeData(data);
      toast({
        title: 'Resume uploaded successfully',
        description: 'Your resume has been saved and is ready for editing.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload resume. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleEnhance = async () => {
    try {
      const response = await fetch('/api/resume/enhance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: JSON.stringify(resumeData),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to enhance resume');
      }

      const enhancedData = await response.json();
      setResumeData(enhancedData);
      toast({
        title: 'Resume enhanced',
        description: 'Your resume has been improved with AI suggestions.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to enhance resume. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="p-6">
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
              <Button onClick={handleEnhance}>Enhance with AI</Button>
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
            ]}
            onContentChange={() => {}}
          />

          <ResumeSection
            title="Professional Summary"
            content={resumeData.summary}
            onContentChange={(content) => setResumeData({ ...resumeData, summary: content })}
          />
        </div>

        <div>
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
        </div>
      </div>
    </div>
  );
}