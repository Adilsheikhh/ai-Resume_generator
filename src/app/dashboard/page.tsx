"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Edit, Trash } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import Link from 'next/link';

interface Resume {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  template: string;
  isEnhanced: boolean;
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [resumes, setResumes] = useState<Resume[]>([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await fetch('/api/resume/history');
        if (!response.ok) throw new Error('Failed to fetch resumes');
        const data = await response.json();
        setResumes(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load your resumes',
          variant: 'destructive',
        });
      }
    };

    if (session) {
      fetchResumes();
    }
  }, [session]);

  const handleDownload = async (id: string) => {
    try {
      const response = await fetch(`/api/resume/download/${id}`);
      if (!response.ok) throw new Error('Failed to download resume');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resume.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to download resume',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/resume/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete resume');
      setResumes(resumes.filter(resume => resume._id !== id));
      toast({
        title: 'Success',
        description: 'Resume deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete resume',
        variant: 'destructive',
      });
    }
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card>
          <CardContent className="p-6">
            <p>Please sign in to view your dashboard</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Resumes</h1>
        <Link href="/create">
          <Button>Create New Resume</Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resumes.map((resume) => (
          <Card key={resume._id}>
            <CardHeader>
              <CardTitle>{resume.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  Template: {resume.template}
                </p>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(resume._id)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Link href={`/edit/${resume._id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(resume._id)}
                  >
                    <Trash className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}