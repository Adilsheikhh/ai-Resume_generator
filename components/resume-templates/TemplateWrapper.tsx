import { ResumeData } from "@/lib/types";
import React from "react";

interface TemplateProps {
  content: ResumeData;
}

export const TemplateWrapper: React.FC<{ 
  Template: React.ComponentType<TemplateProps>;
  content: ResumeData;
  isPreview?: boolean;
}> = ({ Template, content, isPreview }) => {
  // For previews, render with minimal content to improve performance
  if (isPreview) {
    return (
      <div className="template-preview transform scale-[0.2] origin-top-left w-[500%] h-[500%] absolute top-0 left-0">
        <Template content={content} />
      </div>
    );
  }
  
  return <Template content={content} />;
};
