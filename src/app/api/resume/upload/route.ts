import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import Resume from '@/models/Resume';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, content, template } = await req.json();

    if (!title || !content || !template) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check resume limit for free users
    if (!user.isPremium && user.resumeCount >= 3) {
      return NextResponse.json(
        { error: 'Free users can only create up to 3 resumes' },
        { status: 403 }
      );
    }

    const resume = await Resume.create({
      userId: user._id,
      title,
      content,
      template,
    });

    // Update user's resume count
    await User.findByIdAndUpdate(user._id, {
      $inc: { resumeCount: 1 }
    });

    return NextResponse.json(resume);
  } catch (error) {
    console.error('Error uploading resume:', error);
    return NextResponse.json(
      { error: 'Failed to upload resume' },
      { status: 500 }
    );
  }
}