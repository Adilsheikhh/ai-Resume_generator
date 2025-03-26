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
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {fields && (
          <div className="space-y-4 mb-4">
            {fields.map((field, index) => (
              <div key={index}>
                <Label>{field.label}</Label>
                <Input
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="mt-1"
                />
              </div>
            ))}
          </div>
        )}
        <ResumeEditor content={content} onChange={onContentChange} />
      </CardContent>
    </Card>
  );
}