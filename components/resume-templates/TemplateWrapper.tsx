// components/resume-templates/TemplateWrapper.tsx

export const TemplateWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <div 
        className="bg-white text-black w-full h-full font-sans print:bg-white print:text-black print:p-0"
        style={{
          colorAdjust: "exact",
          WebkitPrintColorAdjust: "exact",
          transform: "scale(1)",
          transformOrigin: "top center",
          maxWidth: "100%",
          overflow: "hidden"
        }}
      >
        <div className="max-w-full mx-auto">
          {children}
        </div>
      </div>
    );
  };
