"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
import { parseResumeFile } from "./pdf-parser";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface UploadButtonProps {
  onUpload: (content: string) => void;
  onError: (error: string) => void;
}

export function UploadButton({ onUpload, onError }: UploadButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [previewContent, setPreviewContent] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) {
      toast({
        title: "Error",
        description: "No file selected. Please choose a valid resume file.",
        variant: "destructive",
      });
      return;
    }

    if (!file.type.includes("pdf")) {
      toast({
        title: "Invalid File Type",
        description: "Only PDF resumes are supported.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const content = await parseResumeFile(file);
      setPreviewContent(content);
      setShowPreview(true);
      toast({
        title: "Upload Successful",
        description: "Your resume was uploaded successfully.",
      });
    } catch (error) {
       const message = error instanceof Error ? error.message : "Failed to upload file.";
       console.log (onError(message));
      toast({
        title: "Upload Failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      event.target.value = "";
    }
  };

  const handleConfirmUpload = () => {
    if (previewContent) {
      onUpload(previewContent);
      setShowPreview(false);
      setPreviewContent(null);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className="w-full"
        disabled={isLoading}
        onClick={() => document.getElementById("resume-upload")?.click()}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Upload Resume
          </>
        )}
      </Button>
      <input
        id="resume-upload"
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Resume Preview</DialogTitle>
            <DialogDescription>
              Review your uploaded resume content before confirming.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 p-4 bg-gray-100 rounded-md">
            <pre className="whitespace-pre-wrap font-mono text-sm max-h-60 overflow-auto">
              {previewContent}
            </pre>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                Cancel
              </Button>
              <Button onClick={handleConfirmUpload} disabled={!previewContent}>
                Confirm Upload
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
