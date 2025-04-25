"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { ResumeData } from "@/lib/types";
import { updateResumeData } from "@/app/actions";

interface ResumeSectionProps {
  data: ResumeData;
  onChangeAction: (data: ResumeData) => void; // Renamed to onChangeAction
  isLoading?: boolean;
}

export function ResumeSection({
  data,
  onChangeAction,
  isLoading,
}: ResumeSectionProps) {
  const handleChange = async (section: string, value: any) => {
    const updatedData = {
      ...data,
      [section]: value,
    };
    
    // Call the server action
    await updateResumeData(updatedData);
    
    // Then update the local state via the callback
    handleDataChange(updatedData);
  };

  const handleDataChange = (updatedData: ResumeData) => {
    onChangeAction({
      ...updatedData,
      // Ensure optional fields are handled properly
      projects: updatedData.projects || [],
      links: updatedData.links || []
    });
  };

  const addExperience = () => {
    handleChange("experience", [
      ...data.experience,
      {
        position: "",
        company: "",
        location: "",
        duration: "",
        description: [],
      },
    ]);
  };

  const addEducation = () => {
    handleChange("education", [
      ...data.education,
      { degree: "", school: "", location: "", startDate: "", endDate: "", duration: "" },
    ]);
  };

  const addProject = () => {
    const projects = data.projects || [];
    handleChange("projects", [
      ...projects,
      {
        name: "",
        description: "",
        link: "",
        technologies: [],
        duration: "",
      },
    ]);
  };

  const addLink = () => {
    const links = data.links || [];
    handleChange("links", [
      ...links,
      { title: "", url: "", description: "" },
    ]);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="space-y-3 sm:space-y-4">
        <h2 className="text-base sm:text-lg font-semibold">Personal Information</h2>
        <div className="grid gap-3 sm:gap-4">
          <div>
            <Label htmlFor="name" className="text-sm sm:text-base">Name</Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => handleChange("name", e.target.value)}
              disabled={isLoading}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="title" className="text-sm sm:text-base">Professional Title</Label>
            <Input
              id="title"
              value={data.title}
              onChange={(e) => handleChange("title", e.target.value)}
              disabled={isLoading}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <h2 className="text-base sm:text-lg font-semibold">Contact Information</h2>
        <div className="grid gap-3 sm:gap-4">
          <div>
            <Label htmlFor="email" className="text-sm sm:text-base">Email</Label>
            <Input
              id="email"
              value={data.contact.email}
              onChange={(e) =>
                handleChange("contact", {
                  ...data.contact,
                  email: e.target.value,
                })
              }
              disabled={isLoading}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-sm sm:text-base">Phone</Label>
            <Input
              id="phone"
              value={data.contact.phone}
              onChange={(e) =>
                handleChange("contact", {
                  ...data.contact,
                  phone: e.target.value,
                })
              }
              disabled={isLoading}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="location" className="text-sm sm:text-base">Location</Label>
            <Input
              id="location"
              value={data.contact.location}
              onChange={(e) =>
                handleChange("contact", {
                  ...data.contact,
                  location: e.target.value,
                })
              }
              disabled={isLoading}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <h2 className="text-base sm:text-lg font-semibold">Professional Summary</h2>
        <Textarea
          value={data.summary}
          onChange={(e) => handleChange("summary", e.target.value)}
          disabled={isLoading}
          className="min-h-[80px] sm:min-h-[100px] mt-1"
        />
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
          <h2 className="text-base sm:text-lg font-semibold">Experience</h2>
          <Button 
            onClick={addExperience} 
            variant="outline" 
            size="sm" 
            className="text-xs sm:text-sm w-full sm:w-auto"
          >
            <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Add Experience
          </Button>
        </div>
        {data.experience.map((exp: any, index: any) => (
          <div key={index} className="space-y-3 sm:space-y-4 border rounded-lg p-3 sm:p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-sm sm:text-base">Experience {index + 1}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const newExp = [...data.experience];
                  newExp.splice(index, 1);
                  handleChange("experience", newExp);
                }}
                className="h-8 w-8 p-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid gap-3 sm:gap-4">
              <Input
                placeholder="Job Position"
                value={exp.position || ""}
                onChange={(e) => {
                  const newExp = [...data.experience];
                  newExp[index] = { ...exp, position: e.target.value };
                  handleChange("experience", newExp);
                }}
                disabled={isLoading}
                className="text-sm sm:text-base"
              />
              <Input
                placeholder="Company"
                value={exp.company || ""}
                onChange={(e) => {
                  const newExp = [...data.experience];
                  newExp[index] = { ...exp, company: e.target.value };
                  handleChange("experience", newExp);
                }}
                disabled={isLoading}
                className="text-sm sm:text-base"
              />
              <Input
                placeholder="Location"
                value={exp.location || ""}
                onChange={(e) => {
                  const newExp = [...data.experience];
                  newExp[index] = { ...exp, location: e.target.value };
                  handleChange("experience", newExp);
                }}
                disabled={isLoading}
                className="text-sm sm:text-base"
              />
              <Input
                placeholder="Duration (e.g., 2020 - Present)"
                value={exp.duration || ""}
                onChange={(e) => {
                  const newExp = [...data.experience];
                  newExp[index] = { ...exp, duration: e.target.value };
                  handleChange("experience", newExp);
                }}
                disabled={isLoading}
                className="text-sm sm:text-base"
              />
              <Textarea
                placeholder="Description (each line will be a bullet point)"
                value={Array.isArray(exp.description) ? exp.description.join("\n") : ""}
                onChange={(e) => {
                  const newExp = [...data.experience];
                  newExp[index] = {
                    ...exp,
                    description: e.target.value.split("\n"),
                  };
                  handleChange("experience", newExp);
                }}
                disabled={isLoading}
                className="text-sm sm:text-base min-h-[60px] sm:min-h-[80px]"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
          <h2 className="text-base sm:text-lg font-semibold">Education</h2>
          <Button 
            onClick={addEducation} 
            variant="outline" 
            size="sm" 
            className="text-xs sm:text-sm w-full sm:w-auto"
          >
            <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Add Education
          </Button>
        </div>
        {data.education.map((edu: any, index: any) => (
          <div key={index} className="space-y-3 sm:space-y-4 border rounded-lg p-3 sm:p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-sm sm:text-base">Education {index + 1}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const newEdu = [...data.education];
                  newEdu.splice(index, 1);
                  handleChange("education", newEdu);
                }}
                className="h-8 w-8 p-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid gap-3 sm:gap-4">
              <Input
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => {
                  const newEdu = [...data.education];
                  newEdu[index] = { ...edu, degree: e.target.value };
                  handleChange("education", newEdu);
                }}
                disabled={isLoading}
                className="text-sm sm:text-base"
              />
              <Input
                placeholder="School"
                value={edu.school}
                onChange={(e) => {
                  const newEdu = [...data.education];
                  newEdu[index] = { ...edu, school: e.target.value };
                  handleChange("education", newEdu);
                }}
                disabled={isLoading}
                className="text-sm sm:text-base"
              />
              <Input
                placeholder="Location"
                value={edu.location}
                onChange={(e) => {
                  const newEdu = [...data.education];
                  newEdu[index] = { ...edu, location: e.target.value };
                  handleChange("education", newEdu);
                }}
                disabled={isLoading}
                className="text-sm sm:text-base"
              />
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                <Input
                  placeholder="Start Date"
                  value={edu.startDate}
                  onChange={(e) => {
                    const newEdu = [...data.education];
                    newEdu[index] = { ...edu, startDate: e.target.value };
                    handleChange("education", newEdu);
                  }}
                  disabled={isLoading}
                  className="text-sm sm:text-base"
                />
                <Input
                  placeholder="End Date"
                  value={edu.endDate}
                  onChange={(e) => {
                    const newEdu = [...data.education];
                    newEdu[index] = { ...edu, endDate: e.target.value };
                    handleChange("education", newEdu);
                  }}
                  disabled={isLoading}
                  className="text-sm sm:text-base"
                />
              </div>
              <Input
                placeholder="Duration"
                value={edu.duration}
                onChange={(e) => {
                  const newEdu = [...data.education];
                  newEdu[index] = { ...edu, duration: e.target.value };
                  handleChange("education", newEdu);
                }}
                disabled={isLoading}
                className="text-sm sm:text-base"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Projects Section */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
          <h2 className="text-base sm:text-lg font-semibold">Projects</h2>
          <Button 
            onClick={addProject} 
            variant="outline" 
            size="sm" 
            className="text-xs sm:text-sm w-full sm:w-auto"
          >
            <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Add Project
          </Button>
        </div>
        {(data.projects || []).map((project: any, index: any) => (
          <div key={index} className="space-y-3 sm:space-y-4 border rounded-lg p-3 sm:p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-sm sm:text-base">Project {index + 1}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const newProjects = [...(data.projects || [])];
                  newProjects.splice(index, 1);
                  handleChange("projects", newProjects);
                }}
                className="h-8 w-8 p-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid gap-3 sm:gap-4">
              <Input
                placeholder="Project Name"
                value={project.name || ""}
                onChange={(e) => {
                  const newProjects = [...(data.projects || [])];
                  newProjects[index] = { ...project, name: e.target.value };
                  handleChange("projects", newProjects);
                }}
                disabled={isLoading}
                className="text-sm sm:text-base"
              />
              <Textarea
                placeholder="Project Description"
                value={project.description || ""}
                onChange={(e) => {
                  const newProjects = [...(data.projects || [])];
                  newProjects[index] = { ...project, description: e.target.value };
                  handleChange("projects", newProjects);
                }}
                disabled={isLoading}
                className="text-sm sm:text-base min-h-[60px] sm:min-h-[80px]"
              />
              <Input
                placeholder="Project Link (optional)"
                value={project.link || ""}
                onChange={(e) => {
                  const newProjects = [...(data.projects || [])];
                  newProjects[index] = { ...project, link: e.target.value };
                  handleChange("projects", newProjects);
                }}
                disabled={isLoading}
                className="text-sm sm:text-base"
              />
              <Input
                placeholder="Duration (e.g., 2019-2020)"
                value={project.duration || ""}
                onChange={(e) => {
                  const newProjects = [...(data.projects || [])];
                  newProjects[index] = { ...project, duration: e.target.value };
                  handleChange("projects", newProjects);
                }}
                disabled={isLoading}
                className="text-sm sm:text-base"
              />
              <div>
                <Label className="text-sm sm:text-base">Technologies Used</Label>
                <Textarea
                  placeholder="Enter technologies separated by commas (e.g., React, TypeScript, Node.js)"
                  value={(project.technologies || []).join(", ")}
                  onChange={(e) => {
                    const newProjects = [...(data.projects || [])];
                    newProjects[index] = {
                      ...project,
                      technologies: e.target.value.split(",").map((s) => s.trim()),
                    };
                    handleChange("projects", newProjects);
                  }}
                  disabled={isLoading}
                  className="text-sm sm:text-base mt-1 min-h-[60px]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Links Section */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
          <h2 className="text-base sm:text-lg font-semibold">Links</h2>
          <Button 
            onClick={addLink} 
            variant="outline" 
            size="sm" 
            className="text-xs sm:text-sm w-full sm:w-auto"
          >
            <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Add Link
          </Button>
        </div>
        {(data.links || []).map((link: any, index: any) => (
          <div key={index} className="space-y-3 sm:space-y-4 border rounded-lg p-3 sm:p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-sm sm:text-base">Link {index + 1}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const newLinks = [...(data.links || [])];
                  newLinks.splice(index, 1);
                  handleChange("links", newLinks);
                }}
                className="h-8 w-8 p-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid gap-3 sm:gap-4">
              <Input
                placeholder="Title (e.g., LinkedIn, GitHub, Portfolio)"
                value={link.title || ""}
                onChange={(e) => {
                  const newLinks = [...(data.links || [])];
                  newLinks[index] = { ...link, title: e.target.value };
                  handleChange("links", newLinks);
                }}
                disabled={isLoading}
                className="text-sm sm:text-base"
              />
              <Input
                placeholder="URL"
                value={link.url || ""}
                onChange={(e) => {
                  const newLinks = [...(data.links || [])];
                  newLinks[index] = { ...link, url: e.target.value };
                  handleChange("links", newLinks);
                }}
                disabled={isLoading}
                className="text-sm sm:text-base"
              />
              <Input
                placeholder="Description (optional)"
                value={link.description || ""}
                onChange={(e) => {
                  const newLinks = [...(data.links || [])];
                  newLinks[index] = { ...link, description: e.target.value };
                  handleChange("links", newLinks);
                }}
                disabled={isLoading}
                className="text-sm sm:text-base"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 sm:space-y-4">
        <h2 className="text-base sm:text-lg font-semibold">Skills</h2>
        <Textarea
          value={data.skills.join(", ")}
          onChange={(e) =>
            handleChange(
              "skills",
              e.target.value.split(",").map((s) => s.trim())
            )
          }
          disabled={isLoading}
          placeholder="Enter skills separated by commas"
          className="min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
        />
      </div>
    </div>
  );
}