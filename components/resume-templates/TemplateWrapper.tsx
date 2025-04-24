// components/resume-templates/TemplateWrapper.tsx

export const TemplateWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="bg-white text-black w-full h-full font-sans p-6 print:bg-white print:text-black">
        {children}
      </div>
    );
  };
  