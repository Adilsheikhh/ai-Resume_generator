import * as pdfjsLib from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.entry";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

export async function parsePDF(file: File): Promise<any> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });

    const pdf = await loadingTask.promise;
    if (!pdf.numPages) throw new Error("The PDF file is empty.");

    let extractedText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(" ");
      extractedText += pageText + "\n";
    }

    if (!extractedText.trim()) throw new Error("No extractable text found in the PDF.");

    // Normalize text (removing excessive spaces and ensuring a cleaner format)
    extractedText = extractedText.replace(/\s{2,}/g, " ").trim();

    // Convert extracted text into structured JSON
    return extractResumeData(extractedText);
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw new Error(error.message || "Failed to parse the PDF file.");
  }
}

// Example function to extract structured resume data from text
function extractResumeData(text: string) {
  return {
    name: extractField(text, /(Name|Full Name):?\s*(.+)/),
    title: extractField(text, /(Title|Designation):?\s*(.+)/),
    contact: {
      email: extractField(text, /(Email|E-mail):?\s*([\w.-]+@[\w.-]+\.\w+)/),
      phone: extractField(text, /(Phone|Contact):?\s*([\d\-\(\) ]{8,})/),
      location: extractField(text, /(Location|Address):?\s*(.+)/),
    },
    summary: extractField(text, /(Summary|Profile):?\s*(.+)/),
    skills: extractList(text, /(Skills|Technical Skills):?\s*([\s\S]+?)(?:\n\n|$)/),
    experience: extractExperience(text),
    education: extractEducation(text),
  };
}

function extractField(text: string, regex: RegExp) {
  const match = text.match(regex);
  return match ? match[2]?.trim() : "";
}

function extractList(text: string, regex: RegExp) {
  const match = text.match(regex);
  return match ? match[2].split(/,\s*|\n/).map((s) => s.trim()) : [];
}

function extractExperience(text: string) {
  const regex = /Experience:\s*([\s\S]+?)(?:\n\n|$)/;
  const match = text.match(regex);
  if (!match) return [];

  const experiences = match[1]
    .split(/\n/)
    .map((line) => line.trim())
    .filter((line) => line);

  return experiences.map((exp) => {
    const parts = exp.split(" - ");
    return {
      position: parts[0]?.trim() || "",
      company: parts[1]?.trim() || "",
      duration: parts[2]?.trim() || "",
    };
  });
}

function extractEducation(text: string) {
  const regex = /Education:\s*([\s\S]+?)(?:\n\n|$)/;
  const match = text.match(regex);
  if (!match) return [];

  const educationEntries = match[1]
    .split(/\n/)
    .map((line) => line.trim())
    .filter((line) => line);

  return educationEntries.map((edu) => {
    const parts = edu.split(" - ");
    return {
      degree: parts[0]?.trim() || "",
      school: parts[1]?.trim() || "",
      location: parts[2]?.trim() || "",
      startDate: parts[3]?.trim() || "",
      endDate: parts[4]?.trim() || "",
    };
  });
}
