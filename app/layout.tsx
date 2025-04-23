import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AI Resume Builder - Create Professional Resumes in Minutes',
  description: 'Create ATS-friendly resumes with our AI-powered resume builder. Choose from multiple professional templates and get expert suggestions to land your dream job.',
  keywords: 'resume builder, AI resume, professional resume, CV maker, job application, career tools, ATS-friendly resume',
  openGraph: {
    title: 'AI Resume Builder - Create Professional Resumes in Minutes',
    description: 'Create ATS-friendly resumes with our AI-powered resume builder. Choose from multiple professional templates.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}