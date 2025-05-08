
import React, { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Eye, Target, Book, List, Award, Edit } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionData {
  title: string;
  content: string | string[];
  icon: React.ElementType;
}

const MissionSidebar = () => {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState<string | string[]>("");

  const sectionData: Record<string, SectionData> = {
    vision: {
      title: "Vision",
      content: "To be a center of excellence in technical education and research, nurturing professionals who contribute to the development of society.",
      icon: Eye
    },
    mission: {
      title: "Mission",
      content: "To impart quality education and foster innovation through dedicated teaching and collaborative learning.",
      icon: Target
    },
    peo: {
      title: "Program Educational Objectives (PEO)",
      content: [
        "PEO1: Build a strong foundation in core subjects",
        "PEO2: Adapt effectively to emerging technologies",
        "PEO3: Uphold ethics and professionalism in careers"
      ],
      icon: Book
    },
    po: {
      title: "Program Outcomes (PO)",
      content: [
        "PO1: Engineering knowledge",
        "PO2: Problem analysis",
        "PO3: Design/development of solutions",
        "PO4: Conduct investigations of complex problems",
        "PO5: Modern tool usage",
        "PO6: The engineer and society",
        "PO7: Environment and sustainability",
        "PO8: Ethics",
        "PO9: Individual and team work",
        "PO10: Communication",
        "PO11: Project management and finance",
        "PO12: Life-long learning"
      ],
      icon: List
    },
    pso: {
      title: "Program Specific Outcomes (PSO)",
      content: [
        "PSO1: Apply computer science knowledge to real-world problems.",
        "PSO2: Demonstrate proficiency with modern tools and technologies."
      ],
      icon: Award
    }
  };

  const handleEdit = (sectionKey: string) => {
    setEditingSection(sectionKey);
    setEditingContent(sectionData[sectionKey].content);
  };

  const handleSave = () => {
    if (!editingSection) return;
    
    // In a real application, you would save this to a database or state management
    console.log(`Saving ${editingSection} content:`, editingContent);
    
    // Reset editing state
    setEditingSection(null);
    setEditingContent("");
  };

  const handleCancel = () => {
    setEditingSection(null);
    setEditingContent("");
  };

  const renderSectionContent = (section: SectionData, sectionKey: string) => {
    if (Array.isArray(section.content)) {
      return (
        <ul className="list-disc pl-4 text-sm space-y-1">
          {section.content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    }
    return <p className="text-sm">{section.content}</p>;
  };

  const renderEditForm = (section: SectionData, sectionKey: string) => {
    if (Array.isArray(section.content)) {
      return (
        <div className="space-y-2">
          {section.content.map((item, index) => (
            <input
              key={index}
              type="text"
              className="w-full p-1 border rounded"
              value={Array.isArray(editingContent) ? editingContent[index] : ""}
              onChange={(e) => {
                if (Array.isArray(editingContent)) {
                  const newContent = [...editingContent];
                  newContent[index] = e.target.value;
                  setEditingContent(newContent);
                }
              }}
            />
          ))}
        </div>
      );
    }
    
    return (
      <textarea
        className="w-full p-2 border rounded h-24"
        value={typeof editingContent === 'string' ? editingContent : ""}
        onChange={(e) => setEditingContent(e.target.value)}
      />
    );
  };

  return (
    <aside className="bg-academic-light border-r border-gray-200 h-screen w-64 overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-academic-primary">Institutional Overview</h2>
      </div>

      <div className="p-4 space-y-6">
        {Object.entries(sectionData).map(([key, section]) => (
          <div key={key} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <section.icon size={18} className="text-academic-primary" />
                <h3 className="font-medium text-academic-primary">{section.title}</h3>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-7 w-7 p-0"
                  >
                    <Edit size={16} />
                    <span className="sr-only">Edit {section.title}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-medium">Edit {section.title}</h4>
                    {renderEditForm(section, key)}
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={handleCancel}>
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handleSave}>
                        Save
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className={cn(
              "pl-6 border-l-2 border-gray-200",
              key === "vision" ? "border-blue-400" : "",
              key === "mission" ? "border-green-400" : "",
              key === "peo" ? "border-yellow-400" : "",
              key === "po" ? "border-purple-400" : "",
              key === "pso" ? "border-red-400" : ""
            )}>
              {renderSectionContent(section, key)}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default MissionSidebar;
