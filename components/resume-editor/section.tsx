
"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResumeEditor } from './editor';

interface SectionProps {
  title: string;
  content: string;
  onContentChange: (content: string) => void;
  fields?: Array<{
    label: string;
    value: string;
    onChange: (value: string) => void;
  }>;
}

export function ResumeSection({ title, content, onContentChange, fields }: SectionProps) {
  return (
    <Card className="shadow-lg transition-all hover:shadow-xl">
      <CardHeader className="bg-muted/50">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {fields && (
          <div className="space-y-4 mb-6">
            {fields.map((field, index) => (
              <div key={index} className="space-y-2">
                <Label className="text-sm font-medium">{field.label}</Label>
                <Input
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="transition-all focus:ring-2 focus:ring-primary"
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                />
              </div>
            ))}
          </div>
        )}
        <ResumeEditor 
          content={content} 
          onChange={onContentChange} 
        />
      </CardContent>
    </Card>
  );
}
