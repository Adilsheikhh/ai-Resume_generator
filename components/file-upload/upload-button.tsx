"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { parseResumeFile } from './pdf-parser';
import { toast } from '@/components/ui/toast';

interface UploadButtonProps {
  onUpload: (content: string) => void;
  onError: (error: string) => void;
}

export function UploadButton({ onUpload, onError }: UploadButtonProps) {
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const content = await parseResumeFile(file);
      onUpload(content);
      toast({
        title: "Resume uploaded successfully",
        description: "Your resume has been parsed and is ready for editing.",
      });
    } catch (error) {
      onError('Failed to parse resume file. Please try again.');
      toast({
        title: "Upload failed",
        description: "There was an error parsing your resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".pdf,.docx"
        onChange={handleFileChange}
        className="hidden"
        id="resume-upload"
      />
      <label htmlFor="resume-upload">
        <Button
          variant="outline"
          className="cursor-pointer"
          asChild
        >
          <span>
            <Upload className="w-4 h-4 mr-2" />
            Upload Resume
          </span>
        </Button>
      </label>
    </div>
  );
}