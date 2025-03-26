import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function enhanceResume(content: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a professional resume writer with expertise in creating ATS-friendly resumes. Enhance the given resume content to be more impactful, professional, and optimized for ATS systems while maintaining truthfulness."
      },
      {
        role: "user",
        content: content
      }
    ],
    temperature: 0.7,
    max_tokens: 2000,
  });

  return response.choices[0].message.content || content;
}

export async function generateCoverLetter(resumeContent: string, jobDescription: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a professional cover letter writer. Create a compelling cover letter based on the provided resume content and job description."
      },
      {
        role: "user",
        content: `Resume Content: ${resumeContent}\n\nJob Description: ${jobDescription}\n\nPlease write a professional cover letter.`
      }
    ],
    temperature: 0.7,
    max_tokens: 1000,
  });

  return response.choices[0].message.content || '';
}