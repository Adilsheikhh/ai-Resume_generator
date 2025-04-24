import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { resume } = await request.json();

  if (!resume) {
    return NextResponse.json({ error: 'Resume content is required' }, { status: 400 });
  }

  try {
    const API_KEY = process.env.GEMINI_API_KEY;
    const endpoint = `https://generativelanguage.googleapis.com/v1/models/text-bison-001:generateText?key=${API_KEY}`;

    const prompt = `Improve the professionalism and clarity of the following resume:\n\n${JSON.stringify(resume, null, 2)}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: {
          text: prompt
        }
      })
    });

    let responseBody;
    try {
      responseBody = await response.json();
    } catch (error) {
      console.error('Error parsing JSON response:', error);
      return NextResponse.json({ error: 'Invalid response from external API' }, { status: 500 });
    }

    if (!response.ok) {
      console.error('Error from Gemini API:', responseBody);
      return NextResponse.json({ error: responseBody.message || 'Failed to enhance resume' }, { status: response.status });
    }

    console.log('Enhanced resume:', responseBody);
    return NextResponse.json({ enhancedResume: responseBody });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'An error occurred while enhancing the resume' }, { status: 500 });
  }
}
