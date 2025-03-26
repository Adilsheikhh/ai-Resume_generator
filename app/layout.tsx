import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { SessionProvider } from 'next-auth/react';  // ✅ IMPORT this
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AI Resume Builder - Create Professional Resumes with AI',
  description:
    'Build ATS-friendly resumes in minutes with our AI-powered resume builder. Get professional templates and expert guidance.',
  keywords:
    'resume builder, AI resume, professional resume, ATS-friendly resume, CV builder',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* ✅ SessionProvider wraps the entire app */}
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
