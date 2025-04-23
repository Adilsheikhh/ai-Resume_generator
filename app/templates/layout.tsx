
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Professional Resume Templates | AI Resume Builder',
  description: 'Choose from our collection of ATS-friendly resume templates. Modern, creative, and professional designs to help you stand out.',
  keywords: 'resume templates, CV templates, professional resume designs, ATS-friendly templates',
};

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
