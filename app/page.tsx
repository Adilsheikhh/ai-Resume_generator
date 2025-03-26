import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Sparkles, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Logo */}
      <div className="absolute top-4 left-4">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          A-I
        </h1>
      </div>
      {/* Hero Section */}
      <main className="flex-grow">
        <div className="px-6 lg:px-8 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl text-center">
            <div className="mx-auto max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                Create Professional Resumes with AI
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Build ATS-friendly resumes in minutes. Let AI enhance your career story and help you land your dream job.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link href="/create">
                  <Button size="lg" className="gap-2">
                    Create Resume <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/templates">
                  <Button variant="outline" size="lg">
                    View Templates
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24 sm:py-32 bg-muted/50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-primary">
                Smart Resume Building
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to create a standout resume
              </p>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Our AI-powered platform helps you create professional resumes that get noticed by both humans and ATS systems.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                    <Sparkles className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                    AI Enhancement
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                    <p className="flex-auto">
                      Let our AI enhance your resume content, making it more impactful and professional.
                    </p>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                    <FileText className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                    ATS-Friendly Templates
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                    <p className="flex-auto">
                      Choose from our collection of ATS-optimized templates designed to get past applicant tracking systems.
                    </p>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                    <Users className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                    Expert Guidance
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                    <p className="flex-auto">
                      Get real-time feedback and suggestions to improve your resume's impact and effectiveness.
                    </p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <Link href="/privacy" className="text-sm leading-6 text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm leading-6 text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-sm leading-6 text-muted-foreground">
              &copy; {new Date().getFullYear()} AI Resume Builder. All rights reserved. | Developed by AdilSheikh
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}