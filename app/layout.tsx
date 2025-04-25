import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

// Primary font with fallback options
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif'
  ],
  preload: true,
  variable: '--font-inter',
});

// Define system font fallbacks
const systemFontClass = 'font-system';

// Metadata must be in a Server Component, so we keep it here
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
      <body className={`${inter.variable}`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}