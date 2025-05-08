
import React from 'react';
import { Eye, Flag, Book, ListOrdered, Award, Edit } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SectionData {
  title: string;
  content: string | string[];
  icon: React.ElementType;
  color: string;
}

const MissionVision: React.FC = () => {
  const [editingSection, setEditingSection] = React.useState<string | null>(null);
  const [editingContent, setEditingContent] = React.useState<string | string[]>("");

  const sectionData: Record<string, SectionData> = {
    vision: {
      title: "Vision",
      content: "To be a center of excellence in technical education and research, nurturing professionals who contribute to the development of society.",
      icon: Eye,
      color: "border-blue-400"
    },
    mission: {
      title: "Mission",
      content: "To impart quality education and foster innovation through dedicated teaching and collaborative learning.",
      icon: Flag,
      color: "border-green-400"
    },
    peo: {
      title: "Program Educational Objectives (PEO)",
      content: [
        "PEO1: Build a strong foundation in core subjects",
        "PEO2: Adapt effectively to emerging technologies",
        "PEO3: Uphold ethics and professionalism in careers"
      ],
      icon: Book,
      color: "border-yellow-400"
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
      icon: ListOrdered,
      color: "border-purple-400"
    },
    pso: {
      title: "Program Specific Outcomes (PSO)",
      content: [
        "PSO1: Apply computer science knowledge to real-world problems.",
        "PSO2: Demonstrate proficiency with modern tools and technologies."
      ],
      icon: Award,
      color: "border-red-400"
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

  const renderSectionContent = (section: SectionData) => {
    if (Array.isArray(section.content)) {
      return (
        <ul className="list-disc pl-5 space-y-2">
          {section.content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    }
    return <p className="text-base">{section.content}</p>;
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
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-academic-primary">
        Institution Mission & Vision
      </h1>

      <div className="space-y-12">
        {Object.entries(sectionData).map(([key, section]) => (
          <div key={key} id={key} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <section.icon size={28} className="text-academic-primary" />
              <h2 className="text-2xl font-semibold text-academic-primary">{section.title}</h2>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 ml-2">
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
            <div className={cn("pl-6 border-l-2 py-4", section.color)}>
              {renderSectionContent(section)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissionVision;
