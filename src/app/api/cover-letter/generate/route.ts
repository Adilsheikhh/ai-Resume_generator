import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { generateCoverLetter } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { resumeContent, jobDescription } = await req.json();

    if (!resumeContent || !jobDescription) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const coverLetter = await generateCoverLetter(resumeContent, jobDescription);

    return NextResponse.json({ coverLetter });
  } catch (error) {
    console.error('Error generating cover letter:', error);
    return NextResponse.json(
      { error: 'Failed to generate cover letter' },
      { status: 500 }
    );
  }
}