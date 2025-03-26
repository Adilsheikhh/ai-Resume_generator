import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import Resume from '@/models/Resume';

export async function GET(req: Request) {
  try {
    const session = await getServerSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const resumes = await Resume.find({ userId: session.user.id })
      .sort({ updatedAt: -1 })
      .select('-content')
      .limit(10);

    return NextResponse.json(resumes);
  } catch (error) {
    console.error('Error fetching resume history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resume history' },
      { status: 500 }
    );
  }
}