import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Sparkles, Users } from "lucide-react";
import Link from "next/link";
import { CopyrightYear } from "@/components/ui/copyright-year";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Logo */}
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10">
        <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          A-I
        </h1>
      </div>
      {/* Hero Section */}
      <main className="flex-grow">
        <div className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl text-center">
            <div className="mx-auto max-w-2xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                Create Professional Resumes with A-I
              </h1>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground px-2">
                Build ATS-friendly resumes in minutes. Let A-I enhance your career story and help you land your dream job.
              </p>
              <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
                <Link href="/create" className="w-full sm:w-auto">
                  <Button size="lg" className="gap-2 w-full sm:w-auto text-sm sm:text-base">
                    Create Resume <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </Link>
                <Link href="/templates" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-sm sm:text-base">
                    View Templates
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 sm:py-24 lg:py-32 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-sm sm:text-base font-semibold leading-7 text-primary">
                Smart Resume Building
              </h2>
              <p className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Everything you need to create a standout resume
              </p>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground">
                Our AI-powered platform helps you create professional resumes that get noticed by both humans and ATS systems.
              </p>
            </div>
            <div className="mx-auto mt-10 max-w-2xl lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-6 gap-y-10 sm:gap-y-16 lg:max-w-none lg:grid-cols-3">
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-sm sm:text-base font-semibold leading-7">
                    <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 flex-none text-primary" aria-hidden="true" />
                    AI Enhancement
                  </dt>
                  <dd className="mt-3 sm:mt-4 flex flex-auto flex-col text-sm sm:text-base leading-6 sm:leading-7 text-muted-foreground">
                    <p className="flex-auto">
                      Let our AI enhance your resume content, making it more impactful and professional.
                    </p>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-sm sm:text-base font-semibold leading-7">
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 flex-none text-primary" aria-hidden="true" />
                    ATS-Friendly Templates
                  </dt>
                  <dd className="mt-3 sm:mt-4 flex flex-auto flex-col text-sm sm:text-base leading-6 sm:leading-7 text-muted-foreground">
                    <p className="flex-auto">
                      Choose from our collection of ATS-optimized templates designed to get past applicant tracking systems.
                    </p>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-sm sm:text-base font-semibold leading-7">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 flex-none text-primary" aria-hidden="true" />
                    Expert Guidance
                  </dt>
                  <dd className="mt-3 sm:mt-4 flex flex-auto flex-col text-sm sm:text-base leading-6 sm:leading-7 text-muted-foreground">
                    <p className="flex-auto">
                      Get real-time feedback and suggestions to improve your resume&apos;s impact and effectiveness.
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12 flex flex-col md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-4 sm:space-x-6 mb-4 md:mb-0 md:order-2">
            <Link href="/privacy" className="text-xs sm:text-sm leading-6 text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs sm:text-sm leading-6 text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
          </div>
          <div className="md:order-1">
            <p className="text-center md:text-left text-xs sm:text-sm leading-6 text-muted-foreground">
              &copy; <CopyrightYear /> AI Resume Builder. All rights reserved. | Developed by AdilSheikh
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}