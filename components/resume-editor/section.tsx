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
    onChangeAction(updatedData);
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
      { degree: "", school: "", location: "", startDate: "", endDate: "" },
    ]);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Personal Information</h2>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => handleChange("name", e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="title">Professional Title</Label>
            <Input
              id="title"
              value={data.title}
              onChange={(e) => handleChange("title", e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Contact Information</h2>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
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
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
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
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
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
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Professional Summary</h2>
        <Textarea
          value={data.summary}
          onChange={(e) => handleChange("summary", e.target.value)}
          disabled={isLoading}
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Experience</h2>
          <Button onClick={addExperience} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </Button>
        </div>
        {data.experience.map((exp: any, index: any) => (
          <div key={index} className="space-y-4 border rounded-lg p-4">
            <div className="flex justify-between">
              <h3 className="font-medium">Experience {index + 1}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const newExp = [...data.experience];
                  newExp.splice(index, 1);
                  handleChange("experience", newExp);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid gap-4">
              <Input
                placeholder="Job Position"
                value={exp.position || ""}
                onChange={(e) => {
                  const newExp = [...data.experience];
                  newExp[index] = { ...exp, position: e.target.value };
                  handleChange("experience", newExp);
                }}
                disabled={isLoading}
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
              />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Education</h2>
          <Button onClick={addEducation} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </Button>
        </div>
        {data.education.map((edu: any, index: any) => (
          <div key={index} className="space-y-4 border rounded-lg p-4">
            <div className="flex justify-between">
              <h3 className="font-medium">Education {index + 1}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const newEdu = [...data.education];
                  newEdu.splice(index, 1);
                  handleChange("education", newEdu);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid gap-4">
              <Input
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => {
                  const newEdu = [...data.education];
                  newEdu[index] = { ...edu, degree: e.target.value };
                  handleChange("education", newEdu);
                }}
                disabled={isLoading}
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
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Start Date"
                  value={edu.startDate}
                  onChange={(e) => {
                    const newEdu = [...data.education];
                    newEdu[index] = { ...edu, startDate: e.target.value };
                    handleChange("education", newEdu);
                  }}
                  disabled={isLoading}
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
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Skills</h2>
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
        />
      </div>
    </div>
  );
}
