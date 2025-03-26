import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import Resume from '@/models/Resume';
import { enhanceResume } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { resumeId, content } = await req.json();

    if (!resumeId || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectDB();

    const resume = await Resume.findById(resumeId);
    
    if (!resume || resume.userId !== session.user.id) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    const enhancedContent = await enhanceResume(content);

    const updatedResume = await Resume.findByIdAndUpdate(
      resumeId,
      {
        content: enhancedContent,
        isEnhanced: true,
        version: resume.version + 1,
      },
      { new: true }
    );

    return NextResponse.json(updatedResume);
  } catch (error) {
    console.error('Error enhancing resume:', error);
    return NextResponse.json(
      { error: 'Failed to enhance resume' },
      { status: 500 }
    );
  }
}